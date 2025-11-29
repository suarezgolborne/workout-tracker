import { Box, Typography, AppBar, Toolbar } from '@mui/material'
import { PRDashboard } from '../components/Progress/PRDashboard'

export function ProgressPage() {
  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Personal Records</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, pb: 10 }}>
        <PRDashboard />
      </Box>
    </Box>
  )
}
