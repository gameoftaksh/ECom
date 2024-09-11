import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ChangePassword from './pages/ChangePassword'
import EmailVerification from './pages/EmailVarification'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordConfirm from './pages/ResetPasswordConfirm'
import Home from './pages/Home' 
import Layout from './hocs/Layout'
import { Provider } from 'react-redux'
import Store from './Store'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

const App = () => {

  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Layout>
            <Routes>
              <Route exact path='/' Component={Home}></Route>
              <Route exact path='/login' Component={Login}></Route>
              <Route exact path='/signup' Component={Signup}></Route>
              <Route exact path='/change-password' Component={ChangePassword}></Route>
              <Route exact path='dj-rest-auth/registration/account-confirm-email/<str:key>/' Component={EmailVerification}></Route>
              <Route exact path='/reset-password' Component={ResetPassword}></Route>
              <Route exact path='/reset-password/:token' Component={ResetPasswordConfirm}></Route>
              <Route path="/product/:id" element={<ProductDetails />} />

            </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}

export default App
