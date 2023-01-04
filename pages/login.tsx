import Router from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'
import Loader from '../components/Loader/Loader'
import Logo from '../assets/logo.svg'
import GitHubLogo from 'assets/GitHubLogo.png'
import GoogleLogo from 'assets/GoogleLogo.svg'

export default function Login() {
  const { status } = useSession()

  if (status === 'loading') return <Loader />

  if (status === 'authenticated') Router.push('/')

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component='h1'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}>
              SIMONLINE
            </Typography>
            <Typography
              variant='h5'
              noWrap
              component='h1'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}>
              SIMONLINE
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          gap: 4
        }}>
        <Image priority src={Logo} alt='logo' className='logo' />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
          <Typography
            variant='h4'
            noWrap
            component='h2'
            sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', pb: 1 }}>
            LOGIN
          </Typography>
          <Box sx={{ width: '30ch' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={() => signIn('github')}>
                <Image src={GitHubLogo} alt='ghlogo' width={40} height={40} />
              </Button>
              <Button onClick={() => signIn('google')}>
                <Image src={GoogleLogo} alt='googlelogo' width={40} height={40} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
