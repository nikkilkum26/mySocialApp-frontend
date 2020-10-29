import React, { useState, useEffect, useCallback } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
function Signup() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [profPic, setProfPic] = useState("")
    const [url, setUrl] = useState(undefined)

    

    
    let uploadProfilePic=()=>{
        const data= new FormData();
        data.append("file",profPic);
        data.append("upload_preset","mymedia");
        data.append("cloud_name","nik")
        fetch("https://api.cloudinary.com/v1_1/nik/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    

    let signup = useCallback(()=>{
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            M.toast({ html: "Invalid Email", classes: "#d50000 red accent-4" })
            return
        }
        fetch("http://localhost:5000/auth/signup", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                profpic:url
            })

        }).then(res => res.json())
            .then(e => {
                if (e.error) {
                    M.toast({ html: e.error, classes: "#ab47bc purple lighten-1" })
                }
                else {
                    M.toast({ html: e.message, classes: "#388e3c green darken-2" })
                    history.push('/signin')
                }
            }).catch(err => {
                console.log(err)
            })
    },[email,history,name,password,url])

    useEffect(()=>{
        if(url){
            signup()
        }

    },[url,signup])
    

    let sendData = () => {
        
        if(profPic){
            uploadProfilePic()
        }
        else{
            signup()
        
    }
}

    return (
        <div className="layout__login">
            <div className="card">
                <div className="card-content white-text">
                    <h2 className="layout__loginH2">G M</h2>
                    <input type="text" className="login__font" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" className="login__font" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="login__font" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <div className="file-field input-field">
                        <div className="btn #212121 grey darken-4">
                            <span>Upload Profile Pic</span>
                            <input type="file" onChange={e => setProfPic(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <div className="btn__login">
                        <button className="btn waves-effect waves-light #212121 grey darken-4 " type="submit" name="action" onClick={() => sendData()}>SignUp

                </button> </div>
                    <h6 className="layout__h6"><Link to="/signin" >Already have an account?</Link></h6>

                </div>
            </div>
        </div>
    )
}


export default Signup
