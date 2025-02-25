import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        pin: "",
        mobile: "",
        email: "",
        accountType: "User",
        nid: "",
    });

    const handleChange = (e) => {
        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, pin, mobile, email, accountType, nid } = inputs;

        console.log("input",inputs);

        if (pin.length !== 5 || isNaN(pin)) {
            toast.error("PIN must be exactly 5 digits");
            return;
        }

        const info = { name, pin, mobile, email, accountType, nid };
        fetch(`${import.meta.env.VITE_ENDPOINT}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        })
            .then(res => res.json())
            .then(data => {
                console.log("register",data);
                if (data?.error) {
                    toast.error(data.error);
                } else {
                    toast.success("Registration Successful,please login");
                    setTimeout(() => navigate('/'), 6000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("Registration failed. Please try again.");
            });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen text-gray-700">
            <ToastContainer />
            <form className="flex flex-col bg-white rounded shadow-lg p-12 w-[300px] sm:w-[400px] lg:w-[500px]" onSubmit={handleSubmit}>

                <h2 className="text-3xl mb-3 font-semibold text-center">Register</h2>

                <label className="font-semibold text-xs">Full Name</label>
                <input className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="text" name="name" value={inputs.name} onChange={handleChange} placeholder="Enter your name" required />

                <label className="font-semibold text-xs mt-2">5-digit PIN</label>
                <input className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="password" name="pin" value={inputs.pin} onChange={handleChange} placeholder="Enter 5-digit PIN" required maxLength="5" />

                <label className="font-semibold text-xs mt-2">Mobile Number</label>
                <input className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="tel" name="mobile" value={inputs.mobile} onChange={handleChange} placeholder="Enter your mobile number" required />

                <label className="font-semibold text-xs mt-2">Email</label>
                <input className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your email" required />

                <label className="font-semibold text-xs mt-2">Account Type</label>
                <select className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2" name="accountType" value={inputs.accountType} onChange={handleChange} required>
                    <option value="User">User</option>
                    <option value="Agent">Agent</option>
                </select>

                <label className="font-semibold text-xs mt-2">NID</label>
                <input className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="text" name="nid" value={inputs.nid} onChange={handleChange} placeholder="Enter your NID" required />

                <button className="h-12 mt-3 bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" type="submit">Register</button>

                <div className="flex mt-3 justify-center text-xs gap-2">
                    <span>Already have an account? </span>
                    <Link to="/" className="text-blue-400 hover:text-blue-500">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
