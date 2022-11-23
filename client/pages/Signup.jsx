import React, { useState } from 'react';
// import { AuthContext } from '../context/AuthContext.jsx';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    // const { setCurrentUser } = useContext(AuthContext);
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const usernameInput = useRef();
    const passwordInput = useRef();
    const navigate = useNavigate();

    const createUser = async (e) => {
        e.preventDefault();
        const reqBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname: firstNameInput.current.value,
                lastname: lastNameInput.current.value,
                username: usernameInput.current.value,
                password: passwordInput.current.value
            })
        }
        // what url ?
        //added the url you needed
        const result = await fetch('/api/user/signup', reqBody);
        const data = await result.json();

        //data retunred from fetch (from res.locals.result) will equal the username of whoever just signed up

        // setCurrentUser(data);
        // navigate('/home');
        alert(`${data} has signed up and is logged in`)
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form>
                <label>
                    <input
                        ref={firstNameInput}
                        type="text"
                        placeholder="First Name"
                    ></input>
                </label>
            </form>
            <form>
                <label>
                    <input
                        ref={lastNameInput}
                        type="text"
                        placeholder="Last Name"
                    ></input>
                </label>
            </form>
            <form>
                <label>
                    <input
                        ref={usernameInput}
                        type="text"
                        placeholder="Username"
                    ></input>
                </label>
            </form>
            <form>
                <label>
                    <input
                        ref={passwordInput}
                        type="password"
                        placeholder="Password"
                    ></input>
                </label>
            </form>
            <form>
                <button onClick={createUser}>Sign Up!</button>
            </form>
        </div>
    )
}

export default Signup;
