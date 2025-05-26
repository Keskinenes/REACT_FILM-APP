import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import FavoritesPage from "./pages/FavoritesPage"
import MovieDetailPage from "./pages/MovieDetailPage"
import RegisterPage from "./auth/RegisterPage"
import LoginPage from "./auth/LoginPage"
import ErrorPage from "./pages/ErrorPage"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"

function App() {
  const [user, loading] = useAuthState(auth)
  if (loading) return <div>Loading...</div>
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites"
          element={
            <ProtectedRoute user={user}>
              <FavoritesPage />
            </ProtectedRoute>
          } />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
