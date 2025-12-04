import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Grid,
  Divider,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material'

import { RootState } from '../../store/store'
import { loginSuccess } from '../../store/slices/authSlice'

const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  })
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    shareByDefault: false,
    darkMode: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePreferenceChange = (preference: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({
      ...preferences,
      [preference]: e.target.checked,
    })
  }

  const handleSave = async () => {
    try {
      // Здесь будет API вызов для обновления профиля
      const updatedUser = {
        ...user!,
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
      }

      dispatch(loginSuccess({
        user: updatedUser,
        token: localStorage.getItem('token') || ''
      }))

      setIsEditing(false)
    } catch (error) {
      console.error('Ошибка сохранения профиля:', error)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
    })
    setIsEditing(false)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Профиль пользователя
      </Typography>

      <Grid container spacing={3}>
        {/* Основная информация */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Основная информация</Typography>
              {!isEditing ? (
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                >
                  Редактировать
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={handleSave}
                  >
                    Сохранить
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                  >
                    Отмена
                  </Button>
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={formData.avatar}
                sx={{ width: 80, height: 80, mr: 2 }}
              >
                {formData.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              {isEditing && (
                <Button variant="outlined" size="small">
                  Изменить фото
                </Button>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Имя"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Роль"
                  value={user?.role === 'student' ? 'Студент' : 'Преподаватель'}
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Настройки */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Настройки
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.emailNotifications}
                  onChange={handlePreferenceChange('emailNotifications')}
                />
              }
              label="Email уведомления"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.shareByDefault}
                  onChange={handlePreferenceChange('shareByDefault')}
                />
              }
              label="Делать заметки публичными по умолчанию"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.darkMode}
                  onChange={handlePreferenceChange('darkMode')}
                />
              }
              label="Темная тема"
            />
          </Paper>
        </Grid>

        {/* Статистика */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Статистика
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Заметок создано
                </Typography>
                <Typography variant="h4" color="primary">
                  12
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Совместных проектов
                </Typography>
                <Typography variant="h4" color="primary">
                  5
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Дней в системе
                </Typography>
                <Typography variant="h4" color="primary">
                  28
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Безопасность
              </Typography>
              <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
                Изменить пароль
              </Button>
              <Button fullWidth variant="outlined">
                Настроить 2FA
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile
