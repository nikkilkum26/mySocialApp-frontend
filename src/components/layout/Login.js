import React, {useState,useContext} from 'react';
import { UserContext } from '../../App'
import './Login.css';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';




function Login() {
    const {dispatch} = useContext(UserContext)
    const history =useHistory();
    const [password,setPassword]= useState("");
    const [email,setEmail]= useState("");

    let sendData=()=>{
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
           M.toast({html: "Invalid Email",classes:"#d50000 red accent-4"})
           return 
        }
        fetch("http://localhost:5000/auth/signin",{
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            email,
            password
        })

    }).then(res=>res.json())
    .then(e=>{
        
        if(e.error){
            M.toast({html: e.error,classes:"#ab47bc purple lighten-1"})
        }
        else{
            localStorage.setItem("jwt",e.token)
            localStorage.setItem("user",JSON.stringify(e.user))
            dispatch({type:"USER",payload:e.user})
            M.toast({html: "Successfully loggedIN",classes:"#388e3c green darken-2"})
            history.push('/')
        }
    }).catch(err=>{
        console.log(err)
    })
    }
    return (
        <div className="layout__login">
            <div className="card">
                <div className="card-content white-text">
                    <h2 className="layout__loginH2">G M</h2>
                    <input type="text" className="login__font" placeholder="Email" value= {email} onChange={e=> setEmail(e.target.value)} />
                    <input type="password"className="login__font" placeholder="Password" value= {password} onChange={e=> setPassword(e.target.value)} />
                    <div className="btn__login">
                    <button className="btn waves-effect waves-light #212121 grey darken-4 " type="submit" name="action"  onClick={()=>sendData()}>Login
    
                    </button> </div>
                    <h6 className="layout__h6"><Link to="/signup">Dont have an Account?</Link></h6>
                    <h6 className="layout__h6"><Link to="/reset">Forgot Password</Link></h6>
                </div>
            </div>
        </div>
    )
}

export default Login
