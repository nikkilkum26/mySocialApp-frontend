import React, {useState} from 'react';
import './Login.css';
import {useHistory,useParams} from 'react-router-dom';
import M from 'materialize-css';




function Login() {
    
    const history =useHistory();
    const [password,setPassword]= useState("");
    const {token} = useParams()
  

    let sendData=()=>{
        
        fetch("http://localhost:5000/auth/newpassword",{
        method:"post", 
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
         
            password,
            token
        })

    }).then(res=>res.json())
    .then(e=>{
        
        if(e.error){
            M.toast({html: e.error,classes:"#ab47bc purple lighten-1"})
        }
        else{
            
            M.toast({html: e.message,classes:"#388e3c green darken-2"})
            history.push('/signin')
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
                    <input type="password"className="login__font" placeholder="Enter a Password" value= {password} onChange={e=> setPassword(e.target.value)} />
                    <div className="btn__login">
                    <button className="btn waves-effect waves-light #212121 grey darken-4 " type="submit" name="action"  onClick={()=>sendData()}>Update Password
    
                    </button> </div>
                </div>
            </div>
        </div>
    )
}

export default Login
