import { Routes, Route } from 'react-router-dom'
import DDB from './pages/DDB/DDB'
import DDBL from './pages/DDB/DDBL'
import UDBL from './pages/UDB/UDBL'
import UDB from './pages/UDB/UDB'
function App() {
  return (
    <>
      <Routes>
        <Route path="/direct-dashboard" element={<DDB />} />
        <Route path="/d-login" element={<DDBL />} />
        <Route path="/user-dashboard" element={<UDB />} />
        <Route path="/u-login" element={<UDBL />} />
        <Route path="/" element={<UDBL />} />
      </Routes>
    </>
  )
}

export default App