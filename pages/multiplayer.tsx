import { getSession } from 'next-auth/react'

export default function Multiplayer() {
  return <p>multiplayer</p>
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
