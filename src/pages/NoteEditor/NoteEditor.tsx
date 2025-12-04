import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Box,
  TextField,
  Paper,
  Typography,
  Button,
  Chip,
  IconButton,
  Toolbar,
  Divider,
  Avatar,
  AvatarGroup,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Save as SaveIcon,
  Share as ShareIcon,
  People as PeopleIcon,
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatUnderlined as FormatUnderlinedIcon,
  FormatListBulleted as FormatListBulletedIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { RootState } from '../../store/store'
import { Note, setCurrentNote, updateNote } from '../../store/slices/notesSlice'
import { Collaborator } from '../../store/slices/collaborationSlice'

const NoteEditor: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentNote } = useSelector((state: RootState) => state.notes)
  const { user } = useSelector((state: RootState) => state.auth)

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [collaborators] = useState<Collaborator[]>([
    { id: '2', name: 'Анна Петрова', isOnline: true },
    { id: '3', name: 'Михаил Сидоров', isOnline: false },
  ])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'editor-content',
      },
    },
    onUpdate: ({ editor }) => {
      // Автосохранение при изменении контента
      handleAutoSave(editor.getHTML())
    },
  })

  // Загрузка заметки
  useEffect(() => {
    if (noteId && noteId !== 'new') {
      // Имитация загрузки заметки
      const mockNote: Note = {
        id: noteId,
        title: 'Основы React',
        content: '<h2>Компоненты React</h2><p>React компоненты - это переиспользуемые части интерфейса...</p>',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: user?.id || '1',
        collaborators: ['2', '3'],
        tags: ['React', 'JavaScript', 'Frontend'],
        isPublic: false,
      }

      dispatch(setCurrentNote(mockNote))
      setTitle(mockNote.title)
      setTags(mockNote.tags)
      editor?.commands.setContent(mockNote.content)
    } else {
      // Создание новой заметки
      const newNote: Note = {
        id: 'new',
        title: '',
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: user?.id || '1',
        collaborators: [],
        tags: [],
        isPublic: false,
      }
      dispatch(setCurrentNote(newNote))
    }
  }, [noteId, dispatch, user?.id, editor])

  const handleAutoSave = async (content: string) => {
    if (!currentNote) return

    const updatedNote = {
      ...currentNote,
      title,
      content,
      tags,
      updatedAt: new Date().toISOString(),
    }

    dispatch(updateNote(updatedNote))
  }

  const handleSave = async () => {
    if (!currentNote || !editor) return

    setIsSaving(true)

    const updatedNote = {
      ...currentNote,
      title,
      content: editor.getHTML(),
      tags,
      updatedAt: new Date().toISOString(),
    }

    try {
      // Здесь будет вызов API для сохранения
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch(updateNote(updatedNote))

      if (noteId === 'new') {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleShare = () => {
    setShareDialogOpen(true)
    setAnchorEl(null)
  }

  if (!editor) {
    return <div>Загрузка редактора...</div>
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Заголовок и управление */}
      <Paper elevation={1} sx={{ mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Введите заголовок заметки..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiInput-root': {
                fontSize: '1.5rem',
                fontWeight: 500,
              },
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Соавторы:
              </Typography>
              <AvatarGroup max={3}>
                {collaborators.map((collaborator) => (
                  <Tooltip key={collaborator.id} title={`${collaborator.name} ${collaborator.isOnline ? '(онлайн)' : '(офлайн)'}`}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        border: collaborator.isOnline ? '2px solid #4caf50' : 'none'
                      }}
                    >
                      {collaborator.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<PeopleIcon />}
                onClick={handleShare}
              >
                Поделиться
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Сохранение...' : 'Сохранить'}
              </Button>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Панель форматирования */}
      <Paper elevation={1} sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ minHeight: 48 }}>
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            color={editor.isActive('bold') ? 'primary' : 'default'}
          >
            <FormatBoldIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            color={editor.isActive('italic') ? 'primary' : 'default'}
          >
            <FormatItalicIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            color={editor.isActive('strike') ? 'primary' : 'default'}
          >
            <FormatUnderlinedIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            color={editor.isActive('bulletList') ? 'primary' : 'default'}
          >
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            color={editor.isActive('orderedList') ? 'primary' : 'default'}
          >
            <FormatListNumberedIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <IconButton>
            <LinkIcon />
          </IconButton>
          <IconButton>
            <ImageIcon />
          </IconButton>
        </Toolbar>
      </Paper>

      {/* Редактор */}
      <Paper elevation={1} sx={{ mb: 2, minHeight: 400 }}>
        <EditorContent editor={editor} />
      </Paper>

      {/* Теги */}
      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Теги
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Добавить тег..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTag()
              }
            }}
          />
          <Button onClick={handleAddTag} variant="outlined" size="small">
            Добавить
          </Button>
        </Box>
      </Paper>

      {/* Меню действий */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleShare}>
          <ShareIcon sx={{ mr: 1 }} />
          Поделиться
        </MenuItem>
        <MenuItem onClick={() => navigate('/dashboard')}>
          Вернуться к дашборду
        </MenuItem>
      </Menu>

      {/* Диалог совместного доступа */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Поделиться заметкой</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Пригласите коллег для совместного редактирования этой заметки
          </Typography>
          <TextField
            fullWidth
            label="Email соавтора"
            placeholder="example@email.com"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>Отмена</Button>
          <Button variant="contained">Пригласить</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default NoteEditor
