import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Fab,
  Menu,
  MenuItem,
  Avatar,
  AvatarGroup,
} from '@mui/material'
import {
  Search as SearchIcon,
  Add as AddIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Folder as FolderIcon,
  People as PeopleIcon,
} from '@mui/icons-material'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { RootState } from '../../store/store'
import { Note, setNotes, setSearchQuery } from '../../store/slices/notesSlice'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { notes, searchQuery } = useSelector((state: RootState) => state.notes)
  const { user } = useSelector((state: RootState) => state.auth)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  // Имитация загрузки данных
  useEffect(() => {
    const mockNotes: Note[] = [
      {
        id: '1',
        title: 'Основы React',
        content: 'Компоненты, хуки, состояние...',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        authorId: user?.id || '1',
        collaborators: ['2', '3'],
        tags: ['React', 'JavaScript', 'Frontend'],
        isPublic: false,
      },
      {
        id: '2',
        title: 'Алгоритмы и структуры данных',
        content: 'Массивы, связанные списки, деревья...',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 7200000).toISOString(),
        authorId: user?.id || '1',
        collaborators: ['4'],
        tags: ['Алгоритмы', 'Computer Science'],
        isPublic: true,
        shareLink: 'https://notes.app/shared/abc123',
      },
      {
        id: '3',
        title: 'История России',
        content: 'Ключевые события и даты...',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        updatedAt: new Date(Date.now() - 10800000).toISOString(),
        authorId: '5',
        collaborators: [user?.id || '1', '6'],
        tags: ['История', 'Россия'],
        isPublic: false,
      },
    ]

    dispatch(setNotes(mockNotes))
  }, [dispatch, user?.id])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value))
  }

  const handleCreateNote = () => {
    navigate('/note/new')
  }

  const handleEditNote = (noteId: string) => {
    navigate(`/note/${noteId}`)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, note: Note) => {
    setAnchorEl(event.currentTarget)
    setSelectedNote(note)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedNote(null)
  }

  const handleShareNote = () => {
    if (selectedNote) {
      // Логика создания ссылки для совместного доступа
      navigator.clipboard.writeText(`https://notes.app/shared/${selectedNote.id}`)
      console.log('Ссылка скопирована в буфер обмена')
    }
    handleMenuClose()
  }

  const handleDeleteNote = () => {
    if (selectedNote) {
      // Логика удаления заметки
      console.log('Удаляем заметку:', selectedNote.id)
    }
    handleMenuClose()
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Мои конспекты
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Управляйте своими заметками и совместными проектами
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Поиск по заметкам и тегам..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredNotes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 4,
                },
              }}
              onClick={() => handleEditNote(note.id)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h2" noWrap>
                    {note.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMenuClick(e, note)
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {note.content}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {note.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(note.updatedAt), 'd MMM yyyy', { locale: ru })}
                  </Typography>

                  {note.collaborators.length > 0 && (
                    <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24 } }}>
                      {note.collaborators.map((collaboratorId) => (
                        <Avatar key={collaboratorId} sx={{ fontSize: '0.75rem' }}>
                          {collaboratorId}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  )}
                </Box>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditNote(note.id)
                  }}
                >
                  Редактировать
                </Button>
                {note.isPublic && (
                  <Chip
                    label="Публичная"
                    size="small"
                    icon={<PeopleIcon />}
                    color="primary"
                    variant="outlined"
                  />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredNotes.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300,
            textAlign: 'center',
          }}
        >
          <FolderIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchQuery ? 'Заметки не найдены' : 'У вас пока нет заметок'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {searchQuery
              ? 'Попробуйте изменить поисковый запрос'
              : 'Создайте свою первую заметку для совместной работы'
            }
          </Typography>
          {!searchQuery && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateNote}>
              Создать заметку
            </Button>
          )}
        </Box>
      )}

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
        }}
        onClick={handleCreateNote}
      >
        <AddIcon />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleShareNote}>
          <ShareIcon sx={{ mr: 1 }} />
          Поделиться
        </MenuItem>
        <MenuItem onClick={() => { handleEditNote(selectedNote?.id || ''); handleMenuClose() }}>
          <EditIcon sx={{ mr: 1 }} />
          Редактировать
        </MenuItem>
        <MenuItem onClick={handleDeleteNote} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Удалить
        </MenuItem>
      </Menu>
    </Container>
  )
}

export default Dashboard
