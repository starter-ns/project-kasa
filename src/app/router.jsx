import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/HomePage'
import About from '../pages/About'
import Listing from '../pages/Listing'
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    element: <App />, // layout
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/listing/:id', element: <Listing /> },
      { path: '*', element: <NotFound /> }, // 404
    ],
  },
])
