//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'
import clientPromise from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (res.socket.server.io) {
    res.end()
    return
  }

  const io = new Server(res.socket.server)
  res.socket.server.io = io

  const onConnection = (socket) => {
    const retrieveGames = async () => {
      const client = await clientPromise
      const db = client.db('simonline-v2')
      const games = await db.collection('games').find({ status: 'waiting' }).toArray()

      try {
        if (games) {
          io.sockets.emit('games', games)
        } else {
          res.json({ status: 404, error: 'Games not found' })
        }
      } catch (error) {
        console.log(error)
      }
    }

    socket.on('games', retrieveGames)
  }

  io.on('connection', onConnection)

  res.end()
}
