import { useRouter } from 'next/router'
import { Footer } from '../Footer/Footer'
import { Seo } from '../Seo/Seo'
import TopBar from '../Topbar/Topbar'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Seo />
      {pathname !== '/login' && <TopBar />}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>
      <Footer />
    </div>
  )
}
