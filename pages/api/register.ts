import type { NextApiRequest, NextApiResponse } from 'next'
//@ts-ignore
import clientPromise from '../../lib/mongodb'
import sanitize from '../../utils/sanitize'

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
    const sanitizedResult = sanitize(result)
    res.json({ status: 200, message: 'User already registered', data: sanitizedResult })
  } else {
    try {
      const newUser = { name, email, alias }
      const res = await db.collection('users').insertOne(newUser)
      //@ts-ignore
      newUser.id = res.insertedId.toString()
      const sanitizedUserRegistered = sanitize(newUser)
      res.json({ status: 200, message: 'User registered', data: sanitizedUserRegistered })
    } catch (error) {
      console.log(error)
      res.json({ status: 404, error: 'error' })
    }
  }
}
