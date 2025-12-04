import React from 'react'
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack
} from '@mui/material'
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material'

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
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          {/* Информация о команде */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="body2" color="text.secondary">
              © 2025 <strong>Collaborative Notes Platform</strong>
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 0.5,
                mt: 0.5
              }}
            >
              Сделано с <FavoriteIcon sx={{ fontSize: '1rem', color: 'red' }} /> командой
              <strong>Бригада 2</strong>
            </Typography>
          </Box>

          {/* Навигационные ссылки */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ textAlign: 'center' }}
          >
            <Link
              href="/credits"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              О команде
            </Link>
            <Link
              href="https://github.com/vacuum-xvx/collaborative-notes-frontend"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              GitHub Frontend
            </Link>
            <Link
              href="https://github.com/vacuum-xvx/collaborative-notes-backend"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              GitHub Backend
            </Link>
            <Link
              href="#"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Документация API
            </Link>
          </Stack>

          {/* Социальные сети */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              color="primary"
              href="https://github.com/vacuum-xvx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              href="mailto:dev@brigade2.team"
            >
              <EmailIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Дополнительная информация */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Платформа для совместного создания конспектов с поддержкой редактирования в режиме реального времени
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            React • TypeScript • Node.js • MongoDB • Socket.IO
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
