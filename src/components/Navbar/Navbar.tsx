import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  Tooltip,
} from '@mui/material'
import {
  Add as AddIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material'

import { RootState } from '../../store/store'
import { logout } from '../../store/slices/authSlice'

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleClose()
    navigate('/login')
  }

  const handleCreateNote = () => {
    // Здесь будет логика создания новой заметки
    navigate('/note/new')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/dashboard')}
        >
          Совместные Конспекты
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Кнопка создания новой заметки */}
          <Tooltip title="Создать заметку">
            <IconButton
              color="inherit"
              onClick={handleCreateNote}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>

          {/* Кнопка дашборда */}
          <Tooltip title="Дашборд">
            <IconButton
              color={isActive('/dashboard') ? 'secondary' : 'inherit'}
              onClick={() => navigate('/dashboard')}
            >
              <DashboardIcon />
            </IconButton>
          </Tooltip>

          {/* Уведомления */}
          <Tooltip title="Уведомления">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Профиль пользователя */}
          <Tooltip title="Профиль">
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              {user?.avatar ? (
                <Avatar
                  src={user.avatar}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => { navigate('/profile'); handleClose() }}>
              <PersonIcon sx={{ mr: 1 }} />
              Профиль
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Выйти
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
