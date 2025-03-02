
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login/Login'
import Profile from './Login/Profile'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<h2>Welcome to ZenVault</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
