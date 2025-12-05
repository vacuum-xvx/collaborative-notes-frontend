import React from 'react'
import {
  Box,
  Container,
  Typography,
  Divider
} from '@mui/material'

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 Collaborative Notes Platform
          </Typography>

          <Divider sx={{ width: '100%' }} />

          <Typography variant="caption" color="text.secondary">
            Платформа для совместного создания конспектов
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

