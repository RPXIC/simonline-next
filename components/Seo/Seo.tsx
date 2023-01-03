import Head from 'next/head'
import { useRouter } from 'next/router'
import { parsePathname } from '../../utils/parsePathname'

export const Seo = () => {
  const { pathname } = useRouter()
  const parsedTitle = pathname === '/' ? 'Home' : parsePathname(pathname)

  return (
    <Head>
      <title>{`Simonline - ${parsedTitle}`}</title>
      <meta name='description' content='Created by rpxic' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
