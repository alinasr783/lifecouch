import { Routes, Route } from 'react-router-dom'
import DDB from './pages/DDB/DDB'
import DDBL from './pages/DDB/DDBL'
function App() {
  return (
    <>
      <Routes>
        <Route path="/direct-dashboard" element={<DDB />} />
        <Route path="/login" element={<DDBL />} />
      </Routes>
    </>
  )
}

export default App