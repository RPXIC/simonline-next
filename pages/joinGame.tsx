import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { Games, Loader, GoBackLink, Title } from '../components'
import authOptions from './api/auth/[...nextauth]'

export default function JoinGame() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/login')
    }
  })

  if (status === 'loading') return <Loader />

  return (
    <>
      <GoBackLink to='/multiplayer' />
      <Title title='JOIN GAME' />
      <Games />
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
