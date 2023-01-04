import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

export default function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress size={100} />
    </Box>
  )
}
