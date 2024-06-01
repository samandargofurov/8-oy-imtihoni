import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Likes from './pages/Likes'
import Music from './pages/Music'
import Layout from './Layout/Layout'
import { useDispatch } from 'react-redux'
import { getToken } from './components/utils'
import { useEffect } from 'react'
import { create } from './redux/authSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    getToken()
      .then(res => {
        dispatch(create(res))
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><Home></Home></Layout>}></Route>
        <Route path='/likes' element={<Layout><Likes></Likes></Layout>}></Route>
        <Route path='/playlist/:id' element={<Layout><Music></Music></Layout>}></Route>
      </Routes>
    </>
  )
}

export default App
