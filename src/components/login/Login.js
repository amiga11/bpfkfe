import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css';
import possibilityImage from '../../assets/login.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const Auth = async (e) => {
        e.preventDefault()
        try {
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const results = await axios.post('/apibpfk/login', {
                userName: email,
                password: password
            }, customConfig)
            // if(results.data.data.jenis_user==2){

            navigate("/registrasilist")
            // }
            // else

        } catch (error) {
            if (error.response) {
                toast('User Name/Password Salah !!!', {
                    position: toast.POSITION.TOP_RIGHT
                })
                // alert('salah')
                // setMsg(error.response.data.message)
            }
        }
    }


    return (
        <div className="gpt3__login section__padding" id="login">
            <div className="gpt3__login-image">
                <img src={possibilityImage} alt="login" />
            </div>
            <div className="gpt3__login-content">
                <form onSubmit={Auth}>
                    {/* <h4>Request Early Access to Get Started</h4> */}
                    <h1 className="gradient__text">Login Form</h1>
                    {/* <p>Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.</p>
                <h4>Request Early Access to Get Started</h4> */}
                    {/* <div class="container"> */}
                    <h4 ><b>Username</b></h4>
                    <input type="text" placeholder="Enter Username" name="uname" id="floatingInput"
                        value={email} onChange={(e) => setEmail(e.target.value)} />

                    <h4 ><b>Password</b></h4>
                    <input type="password" placeholder="Enter Password" name="psw" id="floatingPassword"
                        value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Submit</button>
                    {/* <label>
                    <input type="checkbox" checked="checked" name="remember"/> Remember me
                    </label> */}
                    {/* </div> */}
                </form>
            </div>
            <ToastContainer />
        </div>
    )
};

export default Login;