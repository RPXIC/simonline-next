import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import Loader from '../components/Loader/Loader'
import authOptions from './api/auth/[...nextauth]'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/login')
    }
  })

  if (status === 'loading') return <Loader />

  return <p>home</p>
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await unstable_getServerSession(context.req, context.res, authOptions)
    }
  }
}
