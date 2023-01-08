import { Typography } from '@mui/material'

export default function Title({ title }: { title: string }) {
  return (
    <Typography
      variant='h4'
      component='h2'
      sx={{
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        textAlign: 'center',
        margin: '1rem 0 3rem'
      }}>
      {title}
    </Typography>
  )
}
