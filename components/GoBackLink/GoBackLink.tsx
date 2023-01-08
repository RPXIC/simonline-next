import Link from 'next/link'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function GoBackLink({ to }: { to: string }) {
  return (
    <div style={{ margin: '1rem 1rem 0' }}>
      <Link href={to}>
        <Button variant='outlined' startIcon={<ArrowBackIcon style={{ padding: '5px 0 5px 10px' }} />}></Button>
      </Link>
    </div>
  )
}
