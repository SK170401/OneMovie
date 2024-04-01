import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import Movies from './Movies/Movies.tsx'
import Info from './components/Info/Info.tsx'
import Series from './Series/Series.tsx'
import About from './About/About.tsx'
import Home from './Home/Home.tsx'
import CategoryGenre from './components/Category/CategoryGenre.tsx'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/category/:genre" element={<CategoryGenre />} />
      <Route path="/download/:slug" element={<Info />} /> 
      <Route path="/movies" element={<Movies />} />
      <Route path="/series" element={<Series />} />
      <Route path="/about" element={<About />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
