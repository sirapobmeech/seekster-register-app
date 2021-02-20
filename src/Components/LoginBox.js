import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginBox = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = () => {
        axios.post('http://localhost:9000/auth', {
            "email": email,
            "password": password
        })
            .then((res) => {
                window.alert(`User "${res.data.user}" login success, Your token is ===> ${res.data.token}`)
            })
            .catch((err) => {
                if(err.response && err.response.data){
                    window.alert(err.response.data && err.response.data.message)
                }
                else {
                    window.alert("Please run the server")
                }
            })
    }
    return (
        <div style={{ width: 720, paddingTop: 60 }} className="container">
            <h1>Log in</h1>
            <input className="form-control" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input className="form-control" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <div className="row justify-content-md-center">
                <div className="col">
                    <button style={{ width: 200 }} className="btn btn-primary" onClick={submitLogin}>Login</button>
                </div>
                <div className="col">
                    <Link to="/register"><button style={{ width: 200 }} class="btn">Register</button></Link>
                </div>
            </div>
        </div>
    )
}

export default LoginBox