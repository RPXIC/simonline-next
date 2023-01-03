import { signIn, useSession } from 'next-auth/react'
import Router from 'next/router'

export default function useLogin() {
  const { status } = useSession()

  return {
    router: Router,
    signIn,
    status
  }
}
