import { AppBar, Typography, Container } from '@mui/material'

export const Footer = () => {
  return (
    <AppBar position='static' component='footer'>
      <Container maxWidth='xl'>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{
            mr: 2,
            display: { md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            justifyContent: 'center'
          }}>
          <a href='https://www.rpxic.com' style={{ color: 'white', textDecoration: 'none' }}>
            RPXIC
          </a>
        </Typography>
      </Container>
    </AppBar>
  )
}