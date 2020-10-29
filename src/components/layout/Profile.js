import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import { UserContext } from '../../App'


function Profile() {
    const [getPic, setGetPic] = useState([]);
    const { state, dispatch } = useContext(UserContext);

    const [profPic, setProfPic] = useState("")
   
    useEffect(() => {

        fetch('http://localhost:5000/post/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setGetPic(result.mypost)
            })
    }, [])

    useEffect(()=>{
        
        if(profPic){
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
   
          
            
            fetch('http://localhost:5000/users/updateprofpic',{
                method:"put",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    profpic:data.url
                })

            }).then(res=>res.json())
            .then(result=>{
             
                localStorage.setItem("user",JSON.stringify({...state,profpic:result.profpic}))
                dispatch({type:"UPDATEPIC",payload:result.profpic})
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    },[profPic,dispatch,state])

    const updatePic=(file)=>{
        setProfPic(file)
       
    }

    return (
        <div className="layout__profile">
            <div className="profile__disp">
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={state?state.profpic:"loading....."} alt="profilePic" />
                    <div className="file-field input-field">
                        <div className="btn #212121 grey darken-4">
                            <span>Update Profile pic</span>
                            <input type="file" onChange={e => updatePic(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
                <div>
                    <h4 style={{fontWeight:"600"}}>{state?state.name:"Loading..."}</h4>
                    <h5 style={{color:"blue"}}>{state?state.email:"Loading..."}</h5>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                        <h6>{getPic.length} posts</h6>
                        <h6>{state?state.followers.length:"0"} followers</h6>
                        <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                </div>


            </div>
            <div className="gallery">
                {
                    getPic.map(item => {
                        return (
                            <img className="item" src={item.pic} alt={item.title} key={item._id} />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Profile
