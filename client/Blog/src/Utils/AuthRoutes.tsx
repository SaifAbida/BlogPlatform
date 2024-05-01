import { Outlet,Navigate } from "react-router-dom";


const AuthRoutes = () => {
    const token = localStorage.getItem("token")
    return !token ? <Outlet /> : <Navigate to="/" />
}

export default AuthRoutes