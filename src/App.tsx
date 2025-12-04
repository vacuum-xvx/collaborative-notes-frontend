import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'

import { RootState } from './store/store'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Dashboard from './pages/Dashboard/Dashboard'
import NoteEditor from './pages/NoteEditor/NoteEditor'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import SharedNote from './pages/SharedNote/SharedNote'
import Credits from './pages/Credits/Credits'

function App() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {user && <Navbar />}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          {/* Публичные маршруты */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route path="/shared/:shareId" element={<SharedNote />} />

          {/* Защищенные маршруты */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/note/:noteId"
            element={user ? <NoteEditor /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/credits"
            element={<Credits />}
          />

          {/* Перенаправления */}
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </Box>

      {/* Footer для всех страниц */}
      <Footer />
    </Box>
  )
}

export default App
