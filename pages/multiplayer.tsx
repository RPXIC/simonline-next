import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { Loader, Title, GoBackLink, ButtonLink, Container } from '../components'
import authOptions from './api/auth/[...nextauth]'

export default function Multiplayer() {
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
      <Title title='MULTIPLAYER' />
      <Container>
        <ButtonLink to='/createGame' text='CREATE GAME' />
        <ButtonLink to='/joinGame' text='JOIN GAME' />
      </Container>
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
