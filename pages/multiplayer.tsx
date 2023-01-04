import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import authOptions from './api/auth/[...nextauth]'
import Loader from '../components/Loader/Loader'

export default function Multiplayer() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/login')
    }
  })

  if (status === 'loading') return <Loader />

  return <p>multiplayer</p>
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await unstable_getServerSession(context.req, context.res, authOptions)
    }
  }
}
