import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const Register = () => {
    let history = useHistory();
    const [name, setName] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/userRegister',{
            "email" : email,
            "password" : password,
            "name" : name,
            "lastName" : lastName,
        })
        .then((res) => {
            window.alert("Register Success")
            history.push("/");
        })
        .catch((err) => {
            if(err.response && err.response.data){
                window.alert(err.response && err.response.data && err.response.data.message)
            }
            else{
                window.alert("Please run the server")
            }
        })

    }
    return (
        <div style={{ textAlign: "left",padding: 60 }} className="container">
            <h2 style={{ textAlign: "center" }}>Register Forms</h2>
            <form onSubmit={submitRegister}>
                <label for="fname">First name:</label><br />
                <input className="form-control" onChange={(e) => setName(e.target.value)} type="text" id="fname" name="fname" value={name} /><br />
                <label for="lsurname">Last name:</label><br />
                <input className="form-control" onChange={(e) => setLastname(e.target.value)} type="text" id="lname" name="lname" value={lastName} /><br />
                <label for="lemail">email:</label><br />
                <input className="form-control" onChange={(e) => setEmail(e.target.value)} type="text" id="femail" name="fname" value={email} /><br />
                <label for="lpassword">password:</label><br />
                <input className="form-control" onChange={(e) => setPassword(e.target.value)} type="password" id="fpassword" name="fname" value={password} /><br />
                <div>
                    <input style={{ width: "100%" }} className="btn btn-primary" type="submit" value="Submit" />
                </div>

            </form>

        </div>
    )
}

export default Register;