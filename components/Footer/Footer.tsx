import { AppBar, Typography, Container } from '@mui/material'

export default function Footer() {
  return (
    <AppBar position='static' component='footer'>
      <Container maxWidth='xl'>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{
            display: { md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            justifyContent: 'center'
          }}>
          <a href='https://github.com/RPXIC' target='_blank' rel='noreferrer noopener' style={{ color: 'white', textDecoration: 'none' }}>
            RPXIC
          </a>
        </Typography>
      </Container>
    </AppBar>
  )
}
