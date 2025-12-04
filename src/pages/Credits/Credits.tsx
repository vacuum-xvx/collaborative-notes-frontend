import React from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Link,
  Chip,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material'
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Code as CodeIcon,
  People as PeopleIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material'

const Credits: React.FC = () => {
  const technologies = [
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Material-UI', color: '#0081CB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Express', color: '#000000' },
    { name: 'Socket.IO', color: '#010101' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Vite', color: '#646CFF' }
  ]

  const features = [
    'Совместное редактирование в реальном времени',
    'Система аутентификации и авторизации',
    'Публичные ссылки для просмотра заметок',
    'Теги и категории для организации',
    'История версий документов',
    'Адаптивный дизайн для всех устройств',
    'Темная и светлая темы',
    'Экспорт в различные форматы'
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          Collaborative Notes Platform
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Платформа для совместного создания конспектов
        </Typography>
        <Chip
          icon={<PeopleIcon />}
          label="Сделано Бригадой 2"
          color="primary"
          size="large"
          sx={{
            fontSize: '1.1rem',
            py: 3,
            px: 2,
            mt: 2,
            fontWeight: 'bold'
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* О команде */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Typography variant="h5" component="h2">
                  Команда разработки
                </Typography>
              </Box>

              <Typography variant="h6" color="primary" gutterBottom>
                Бригада 2
              </Typography>

              <Typography variant="body1" paragraph>
                Команда талантливых разработчиков полного цикла, специализирующихся
                на создании современных веб-приложений с использованием передовых технологий.
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>Наша миссия:</strong> Создавать интуитивно понятные и мощные
                инструменты для совместной работы и обучения.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Контакты:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="GitHub">
                    <IconButton color="primary">
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="LinkedIn">
                    <IconButton color="primary">
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Email">
                    <IconButton color="primary">
                      <EmailIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* О проекте */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <CodeIcon />
                </Avatar>
                <Typography variant="h5" component="h2">
                  О проекте
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                <strong>Collaborative Notes Platform</strong> — это современная платформа
                для создания, редактирования и совместного использования конспектов и заметок.
              </Typography>

              <Typography variant="body1" paragraph>
                Проект создан с использованием лучших практик современной веб-разработки
                и включает как frontend, так и backend компоненты для полноценной работы.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Версия: 1.0.0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Дата релиза: Декабрь 2025
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Технологии */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Технологический стек
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {technologies.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech.name}
                  sx={{
                    bgcolor: tech.color + '20',
                    color: tech.color,
                    border: `1px solid ${tech.color}40`,
                    fontWeight: 'medium'
                  }}
                />
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Архитектура проекта:
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Frontend
                </Typography>
                <Typography variant="body2">
                  • React 18 + TypeScript<br/>
                  • Material-UI компоненты<br/>
                  • Redux Toolkit<br/>
                  • Vite для сборки<br/>
                  • Socket.IO клиент
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Backend
                </Typography>
                <Typography variant="body2">
                  • Node.js + Express<br/>
                  • MongoDB + Mongoose<br/>
                  • Socket.IO сервер<br/>
                  • JWT аутентификация<br/>
                  • Real-time синхронизация
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Deployment
                </Typography>
                <Typography variant="body2">
                  • Vercel (Frontend)<br/>
                  • Railway (Backend)<br/>
                  • GitHub Pages<br/>
                  • MongoDB Atlas<br/>
                  • CI/CD pipeline
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Функциональность */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              <StarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Ключевые возможности
            </Typography>

            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      size="small"
                      label="✓"
                      color="success"
                      sx={{ mr: 1, minWidth: 'auto', width: 24, height: 24 }}
                    />
                    <Typography variant="body1">{feature}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Благодарности */}
        <Grid item xs={12}>
          <Card
            elevation={3}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <CardContent sx={{ py: 4 }}>
              <FavoriteIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Создано с любовью к коду
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Этот проект создан командой <strong>Бригада 2</strong> для демонстрации
                навыков полноценной разработки современных веб-приложений.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  label="💻 Full-Stack Development"
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                />
                <Chip
                  label="🚀 Modern Technologies"
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                />
                <Chip
                  label="🎨 Beautiful Design"
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                />
                <Chip
                  label="⚡ Real-time Features"
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                />
              </Box>

              <Typography variant="body2" sx={{ mt: 3, opacity: 0.9 }}>
                Спасибо за использование нашей платформы! 🙏
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Credits
