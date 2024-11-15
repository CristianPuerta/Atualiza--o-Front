import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import GlobalStyles from './styles/globalStyles'
import { ToastContainer } from 'react-toastify'
import { router } from './routes'



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ToastContainer autoClose={2000} theme="colored"/>
    <RouterProvider router={router} />
    <GlobalStyles />
  </StrictMode>,

)
