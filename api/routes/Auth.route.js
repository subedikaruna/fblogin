import express from 'express'
import { getUser, Login } from '../controllers/Auth.controller.js'
const AuthRoute=express.Router()
AuthRoute.post('/login',Login)
AuthRoute.get('/get-user',getUser)
 export default AuthRoute