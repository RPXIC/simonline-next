import Link from 'next/link'
import { Button } from '@mui/material'
import Text from '../Text/Text'

export default function ButtonLink({ to, text }: { to: string; text: string }) {
  return (
    <Link href={to} style={{ textDecoration: 'none' }}>
      <Button variant='outlined' style={{ width: '100%' }}>
        <Text text={text} />
      </Button>
    </Link>
  )
}
