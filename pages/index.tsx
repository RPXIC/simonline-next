import { getSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'

export default function Home() {
  return <p>home</p>
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      ...session
    }
  }
}
