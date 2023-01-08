import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { Loader, GoBackLink, Title } from '../components'
import authOptions from './api/auth/[...nextauth]'

export default function Singleplayer() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/login')
    }
  })

  if (status === 'loading') return <Loader />

  return (
    <>
      <GoBackLink to='/' />
      <Title title='SINGLEPLAYER' />
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
