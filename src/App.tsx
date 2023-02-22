import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import TollDetails from './components/TollDetails'
import TollList from './components/TollList'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TollList />,
    },
    {
      path: "/add-new",
      element: <TollDetails type='add' />,
    },
    {
      path: "/edit/:id",
      element: <TollDetails type='edit' />,
    },
  ])

  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
