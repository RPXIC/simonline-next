import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { Button, TextField } from '@mui/material'
import { Loader, GoBackLink, Title, Container, Text } from '../components'
import authOptions from './api/auth/[...nextauth]'

export default function CreateGame() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/login')
    }
  })

  if (status === 'loading') return <Loader />

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const name = e.target.gameName.value
    if (name.trim()) {
      console.log('send')
    }
  }

  return (
    <>
      <GoBackLink to='/multiplayer' />
      <Title title='CREATE NEW GAME' />
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField name='gameName' id='outlined-basic' label='Game Name' variant='outlined' />
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
