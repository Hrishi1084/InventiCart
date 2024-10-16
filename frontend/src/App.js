import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="inventi-cart.vercel.app/"
              element={
                user ? (
                  user.accountType === 'Merchant' ? <Dashboard /> : <Home />
                ) : (
                  <Navigate to="inventi-cart.vercel.app/login" />
                )
              }
            />
            <Route
              path="inventi-cart.vercel.app/login"
              element={!user ? <Login /> : <Navigate to="inventi-cart.vercel.app/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="inventi-cart.vercel.app/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
