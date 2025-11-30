import { Box } from '@mui/material'
import { PageAppBar } from '../components/Layout/PageAppBar'
import { PRDashboard } from '../components/Progress/PRDashboard'

export function ProgressPage() {
  return (
    <Box>
      <PageAppBar title="Personal Records" />
      <Box sx={{ p: 2, pb: 10 }}>
        <PRDashboard />
      </Box>
    </Box>
  )
}
