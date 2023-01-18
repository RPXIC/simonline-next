import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

let socket: any

export default function Id({ query }) {
  const [game, setGame] = useState([])

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()
    socket.on('game', (retrievedGame: any) => {
      setGame(retrievedGame)
    })
    socket.emit('game', query)
  }

  return (
    <>
      <h1>Id: {query.id}</h1>
      <h2>name: {game?.name}</h2>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query = { id: '' } } = context

  return {
    props: {
      query
    }
  }
}
