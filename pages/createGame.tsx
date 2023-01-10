import { useEffect, useState } from 'react'
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import io from 'socket.io-client'
import { Button, TextField } from '@mui/material'
import { Loader, GoBackLink, Title, Container, Text } from '../components'
import authOptions from './api/auth/[...nextauth]'

let socket: any

export default function CreateGame() {
  const [error, setError] = useState(undefined)
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/login')
    }
  })

  useEffect(() => {
    socketInitializer()
    return () => {
      //@ts-ignore
      socket?.off('games')
    }
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/games')
    socket = io()
  }

  if (status === 'loading') return <Loader />

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { user } = data
    const name = e.target.gameName.value
    if (name.trim()) {
      const response = await fetch('/api/createGame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //@ts-ignore
        body: JSON.stringify({ name, id: user.id })
      })
      const result = await response.json()
      if (result.status === 200) {
        socket.emit('games', {})
        setError(undefined)
      } else {
        setError(result.error)
      }
    }
  }

  return (
    <>
      <GoBackLink to='/multiplayer' />
      <Title title='CREATE NEW GAME' />
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField name='gameName' id='outlined-basic' label='Game Name' variant='outlined' error={Boolean(error)} helperText={error} />
          <Button type='submit' variant='outlined'>
            <Text text='CREATE' />
          </Button>
        </Container>
      </form>
    </>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await unstable_getServerSession(context.req, context.res, authOptions)
    }
  }
}
