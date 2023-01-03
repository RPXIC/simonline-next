import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import clientPromise from '../../lib/mongodb'

type Data = {
  status: number
  data?: any
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const client = await clientPromise
  const db = client.db('simonline-v1')

  const { username, password } = req.body
  const result = await db.collection('users').findOne({ username })

  if (result) {
    const isValid = await bcrypt.compare(password, result.password)
    if (isValid) {
      const token = jwt.sign({ sub: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
      res.json({ status: 200, data: { username: result.username, id: result._id, token } })
    } else {
      res.json({ status: 401, error: 'Unauthorized' })
    }
  } else {
    res.json({ status: 404, error: 'User not found' })
  }
}
