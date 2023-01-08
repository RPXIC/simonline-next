import { Typography } from '@mui/material'

export default function Text({ text }: { text: string }) {
  return (
    <Typography
      variant='h6'
      component='p'
      sx={{
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        textAlign: 'center'
      }}>
      {text}
    </Typography>
  )
}
