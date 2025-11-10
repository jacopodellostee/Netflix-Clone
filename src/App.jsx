import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import routes from './routes/routes'
import './App.css'

function App() {

  return <RouterProvider router={router} />
}

const router = createBrowserRouter(routes)

export default App
