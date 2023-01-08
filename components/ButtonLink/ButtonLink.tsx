import Link from 'next/link'
import { Button } from '@mui/material'
import Text from '../Text/Text'

export default function ButtonLink({ to, text }: { to: string; text: string }) {
  return (
    <Button variant='outlined'>
      <Link href={to} style={{ textDecoration: 'none' }}>
        <Text text={text} />
      </Link>
    </Button>
  )
}
