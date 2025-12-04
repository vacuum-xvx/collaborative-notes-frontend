import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material'
import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material'

import { RootState } from '../../store/store'
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(loginStart())

    try {
      // Здесь будет реальная логика авторизации через API
      // Пока что имитируем успешный вход
      setTimeout(() => {
        const mockUser = {
          id: '1',
          email: formData.email,
          name: 'Тестовый пользователь',
          role: 'student' as const,
        }
        const mockToken = 'mock-jwt-token'

        dispatch(loginSuccess({ user: mockUser, token: mockToken }))
        navigate('/dashboard')
      }, 1000)
    } catch (error) {
      dispatch(loginFailure('Ошибка входа в систему'))
    }
  }

  const handleSocialLogin = (provider: 'google' | 'github') => {
    // Здесь будет логика OAuth авторизации
    console.log(`Авторизация через ${provider}`)
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            color="primary"
          >
            Вход в систему
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Добро пожаловать в платформу совместного создания конспектов
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mb: 2 }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Войти'}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              или
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialLogin('google')}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={() => handleSocialLogin('github')}
            >
              GitHub
            </Button>
          </Box>

          <Typography variant="body2" align="center">
            Нет аккаунта?{' '}
            <Link
              to="/register"
              style={{
                color: '#1976d2',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Зарегистрироваться
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
