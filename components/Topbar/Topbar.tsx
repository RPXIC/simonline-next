import { useState } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { AppBar, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AdbIcon from '@mui/icons-material/Adb'
import Text from '../Text/Text'

export default function TopBar() {
  const { data } = useSession()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      {data ? (
        <AppBar position='static'>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant='h6'
                noWrap
                component='div'
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

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' }
                  }}>
                  <MenuItem>
                    <Link href='/' style={{ color: 'black', textDecoration: 'none' }}>
                      HOME
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href='/singleplayer' style={{ color: 'black', textDecoration: 'none' }}>
                      SINGLEPLAYER
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href='/multiplayer' style={{ color: 'black', textDecoration: 'none' }}>
                      MULTIPLAYER
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant='h5'
                noWrap
                component='div'
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
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2, justifyContent: 'space-evenly' }}>
                <Link href='/' style={{ color: 'white', textDecoration: 'none' }}>
                  HOME
                </Link>
                <Link href='/singleplayer' style={{ color: 'white', textDecoration: 'none' }}>
                  SINGLEPLAYER
                </Link>
                <Link href='/multiplayer' style={{ color: 'white', textDecoration: 'none' }}>
                  MULTIPLAYER
                </Link>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {data?.user?.image && <Avatar alt='avatar' src={data.user.image} />}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center' onClick={() => signOut()}>
                      LOGOUT
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <Text text='REDIRECTING...' />
      )}
    </>
  )
}
