import React from "react";
// import { AuthContext } from '../context/AuthContext.jsx';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    // const { setCurrentUser } = useContext(AuthContext);
    const usernameInput = useRef();
    const passwordInput = useRef();
    const navigate = useNavigate();

    const getUser = async (e) => {
        e.preventDefault();
        const reqBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: usernameInput.current.value,
                password: passwordInput.current.value
            })
        }
        // url?
        // added URL you needed
        const result = await fetch('/api/user/login', reqBody);
        const data = await result.json();

        //data retunred from fetch (from res.locals.result) will equal the username of whoever just logged in
        // alert(`${data} is logged in`)
        // setCurrentUser(data);
        navigate('/homepage');
    }

    return (
        <div className="box">
            <h1 className="header">Log In</h1>
            <form className="loginForm">
                <label>
                    <input
                        ref={usernameInput}
                        type="text"
                        placeholder="Username"
                    ></input>
                </label>
            {/* </form>
            <form> */}
                <label>
                    <input
                        ref={passwordInput}
                        type="password"
                        placeholder="Password"
                    ></input>
                </label>
            {/* </form>
            <form> */}
                <button onClick={getUser}>Log In!</button>
            </form>
        </div>
    );
}

export default Login;
