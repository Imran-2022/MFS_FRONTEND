import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        identifier: "", // Can be mobile number or email
        pin: "",
    });

    const handleChange = (e) => {
        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { identifier, pin } = inputs;
        console.log("inputs-login",inputs);

        fetch(`${import.meta.env.VITE_ENDPOINT}/user/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, pin }),
        })
            .then(res => res.json())
            .then(data => {
                console.log("login",data);
                if (data.user.accountType=="User") {
                    navigate(`/user`);
                }
                else if (data.user.accountType=='Agent'){
                    navigate('/agent');
                }else if(data.user.accountType=="Admin"){
                    navigate('/admin');
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen text-gray-700">
            <form className="flex flex-col bg-white rounded shadow-lg p-12 w-[300px] sm:w-[400px] lg:w-[500px]" onSubmit={handleSubmit}>
                <label className="font-semibold text-xs" htmlFor="identifier">Mobile Number / Email</label>
                <input
                    className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                    type="text"
                    name="identifier"
                    value={inputs.identifier}
                    onChange={handleChange}
                    placeholder="Enter your mobile number or email"
                    required
                />
                <label className="font-semibold text-xs mt-3" htmlFor="pin">PIN</label>
                <input
                    className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                    type="password"
                    name="pin"
                    value={inputs.pin}
                    onChange={handleChange}
                    placeholder="Enter your PIN"
                    required
                />
                <button className="h-12 mt-8 bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" type="submit">Login</button>
                <div className="flex mt-3 justify-center text-xs gap-2">
                    <span>No account Yet? </span>
                    <Link to="/register" className="text-blue-400 hover:text-blue-500">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
