import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Likes from './pages/Likes'
import Music from './pages/Music'
import Layout from './Layout/Layout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><Home></Home></Layout>}></Route>
        <Route path='/likes' element={<Layout><Likes></Likes></Layout>}></Route>
        <Route path='/music' element={<Layout><Music></Music></Layout>}></Route>
      </Routes>      
    </>
  )
}

export default App
