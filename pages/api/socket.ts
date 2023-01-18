//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'
import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (res.socket.server.io) {
    console.log('Already set up')
    res.end()
    return
  }

  const io = new Server(res.socket.server)
  res.socket.server.io = io

  const client = await clientPromise
  const db = client.db('simonline-v2')

  const onConnection = (socket) => {
    const retrieveGame = async (id) => {
      try {
        const game = await db.collection('games').findOne({ _id: ObjectId(id) })
        if (game) {
          return io.sockets.emit('game', game)
        } else {
          return res.json({ status: 404, error: 'Game not found' })
        }
      } catch (error) {
        return console.log(error)
      }
    }

    const retrieveGames = async () => {
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

    socket.on('game', retrieveGame)
  }

  io.on('connection', onConnection)

  res.end()
}
