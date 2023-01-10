//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import clientPromise from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, id } = req.body

  const newGame = {
    name,
    players: [ObjectId(id)],
    watching: [],
    combination: [],
    status: 'waiting',
    date: new Date(),
    owner: ObjectId(id)
  }

  try {
    const client = await clientPromise
    const db = client.db('simonline-v2')
    const gameExist = await db.collection('games').findOne({ name })

    if (!gameExist) {
      await db.collection('games').insertOne(newGame)
      res.json({ status: 200, error: 'Game created' })
    } else {
      res.json({ status: 404, error: 'Game name already exist' })
    }
  } catch (error) {
    console.log(error)
  }

  res.end()
}
