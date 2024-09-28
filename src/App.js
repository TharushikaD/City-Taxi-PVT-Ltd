import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import axios from 'axios'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const DriverLayout = React.lazy(() => import('./layout/DriverLayout'))
const AdminLayout = React.lazy(() => import('./layout/AdminLayout'))




// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Home = React.lazy(() => import('./views/pages/home/Home'))
// const Vehicles = React.lazy(() => import('./views/vehicles/Vehicles'))
const Ride = React.lazy(() => import('./views/pages/ride/Ride'))
const Drive = React.lazy(() => import('./views/pages/drive/Drive'))
const Contact = React.lazy(() => import('./views/pages/contact/Contact'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
        <Route exact path="/adminLayout" name="AdminLayout" element={<AdminLayout />} />
          <Route exact path="/defaultLayout" name="DefaultLayout" element={<DefaultLayout />} />
          <Route exact path="/driverLayout" name="DriverLayout" element={<DriverLayout />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="/home" name="Home" element={<Home />} />
          <Route path="*" name="Home" element={<AdminLayout />} />
          {/* <Route path="/vehicles" name="Vehicles" element={<Vehicles />} /> */}
          <Route path="/ride" name="Ride" element={<Ride/>} />
          <Route path="/contact" name="Contact" element={<Contact/>} />
          <Route path="/drive" name="Drive" element={<Drive/>} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
