import {useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const PublicRoute = () => {
    const {currentUser} = useSelector(state=> state.user)
  return currentUser ? <Navigate to={`/${currentUser.role}/dashboard`}/> : <Outlet/>
}

export default PublicRoute 