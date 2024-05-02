import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Settings/Settings";
import AuthRoutes from "./Utils/AuthRoutes";
import PrivateRoutes from "./Utils/PrivateRoutes";
import RoutePage from "./Pages/RoutePage/RoutePage";
import CreatePost from "./Pages/CreatePost/CreatePost";
import UpdatePost from "./Pages/UpdatePost/UpdatePost";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<RoutePage />} />
        <Route element={<AuthRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/update/:id" element={<UpdatePost />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
