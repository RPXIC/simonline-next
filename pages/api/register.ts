import type { NextApiRequest, NextApiResponse } from 'next'
//@ts-ignore
import clientPromise from '../../lib/mongodb'

type Data = {
  status: number
  data?: any
  error?: string
  message?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  //@ts-ignore
  const client = await clientPromise
  const db = client.db('simonline-v2')

  const { name, email, alias = 'player' } = req.body
  const result = await db.collection('users').findOne({ email })

  if (result) {
    res.json({ status: 200, message: 'User already registered' })
  } else {
    try {
      await db.collection('users').insertOne({ name, email })
      res.json({ status: 200, message: 'User registered' })
    } catch (error) {
      console.log(error)
      res.json({ status: 404, error: 'error' })
    }
  }
}
