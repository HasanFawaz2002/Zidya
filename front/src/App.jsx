import React from "react";
import {Routes,Route,Outlet} from 'react-router-dom'
import Home from "./Components/HOME/Home";
import Navbar from "./Components/NAVBAR/Navbar";
import About from "./Components/ABOUT/About";
import Institutionlogin from "./Components/InstitutionLogin/Institutionlogin";
import InstituteHome from "./Components/InstitutionLogin/InstituteHome";
import Register from "./Components/Authentication/Register"
import LogintoZidyia from "./Components/Authentication/Login";
import ForgotPassword from "./Components/Authentication/forgotpassword";
import Resetpassword from "./Components/Authentication/Resetpassword";
import CreateCertificate from "./Components/CreateCertificate/CreateCertificate";

const App = () => {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/Institutionlogin" element={<Institutionlogin/>}></Route>
            <Route path="/InstituteHome" element={<InstituteHome/>}></Route>
            <Route path="/Register" element={<Register/>}></Route>
            <Route path="/login" element={<LogintoZidyia/>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset_password/:id/:token" element={<Resetpassword />}></Route>
            <Route path="/CreateCertificate" element={<CreateCertificate />}></Route>
        </Routes>
        </>
    )
}

export default App;