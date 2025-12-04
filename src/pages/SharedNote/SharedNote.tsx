import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  Share as ShareIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material'

interface SharedNoteData {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  tags: string[]
  isPublic: boolean
}

function SharedNote() {
  const { shareId } = useParams<{ shareId: string }>()
  const [note, setNote] = useState<SharedNoteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSharedNote = async () => {
      try {
        setLoading(true)
        // Здесь должен быть API вызов для получения общедоступной заметки
        // const response = await api.getSharedNote(shareId)
        // setNote(response.data)

        // Временные тестовые данные
        setTimeout(() => {
          setNote({
            id: shareId || '1',
            title: 'Общедоступная заметка',
            content: 'Это содержимое общедоступной заметки, которое может просматривать любой пользователь с ссылкой.',
            author: 'Автор заметки',
            createdAt: '2025-12-04T10:00:00Z',
            updatedAt: '2025-12-04T12:00:00Z',
            tags: ['публичная', 'общий доступ'],
            isPublic: true
          })
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError('Не удалось загрузить заметку. Возможно, ссылка недействительна.')
        setLoading(false)
      }
    }

    if (shareId) {
      fetchSharedNote()
    } else {
      setError('Неверная ссылка на заметку')
      setLoading(false)
    }
  }, [shareId])

  const handleShare = () => {
    if (navigator.share && note) {
      navigator.share({
        title: note.title,
        text: 'Посмотрите эту заметку',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Здесь можно добавить уведомление о копировании
    }
  }

  const handleDownload = () => {
    if (!note) return

    const element = document.createElement('a')
    const file = new Blob([`# ${note.title}\n\n${note.content}`], {
      type: 'text/plain'
    })
    element.href = URL.createObjectURL(file)
    element.download = `${note.title}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  if (!note) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">Заметка не найдена</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Заголовок и действия */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {note.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Автор: {note.author} •
              Создано: {new Date(note.createdAt).toLocaleDateString('ru-RU')} •
              Обновлено: {new Date(note.updatedAt).toLocaleDateString('ru-RU')}
            </Typography>
            {note.tags && note.tags.length > 0 && (
              <Box sx={{ mb: 2 }}>
                {note.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Поделиться">
              <IconButton onClick={handleShare} color="primary">
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Скачать">
              <IconButton onClick={handleDownload} color="primary">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Только для просмотра">
              <IconButton disabled>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Содержимое заметки */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: 'background.default',
            borderRadius: 1,
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace'
          }}
        >
          <Typography variant="body1">
            {note.content}
          </Typography>
        </Box>

        {/* Информация о публичном доступе */}
        {note.isPublic && (
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              Эта заметка доступна для просмотра всем, у кого есть ссылка.
              Редактирование недоступно в режиме просмотра.
            </Typography>
          </Alert>
        )}
      </Paper>
    </Container>
  )
}

export default SharedNote
