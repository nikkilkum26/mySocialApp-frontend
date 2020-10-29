import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import { UserContext } from '../../App'
import {useParams} from 'react-router-dom'

function Profile() {
    const [profile, setProfile] = useState(null);
    const { state, dispatch } = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setshowfollow] = useState(state? !state.following.includes(userid):true)
    
    useEffect(() => {
        fetch( `http://localhost:5000/users/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setProfile(result)
            })
    }, [userid])

    const followUser=()=>{
        fetch('http://localhost:5000/users/follow',{
            method:"put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))

            setProfile((prevState)=>{
               return{ 
                   ...prevState,
                   user:{...prevState.user,
                followers:[...prevState.user.followers,data._id]}
                }

            })
        })
        setshowfollow(false);
    }
    const unfollowUser=()=>{
        fetch('http://localhost:5000/users/unfollow',{
            method:"put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setProfile((prevState)=>{
                const newfollower = prevState.user.followers.filter(item=>item !== data._id)
               return{ 
                   ...prevState,
                   user:{...prevState.user,
                followers:newfollower}
                }

            })
        })
        setshowfollow(true);
        
    }

    return (
        <>
        {profile? 
        <div className="layout__profile">
        <div className="profile__disp">
            <div>
                <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={profile.user.profpic} alt="profilepic"/>
            </div>
            <div>
            
                <h4>{profile.user.name}</h4>
                <h5>{profile.user.email}</h5>
                <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                    <h6>{profile.posts.length} posts</h6>
                    <h6>{profile.user.followers.length} followers</h6>
                    <h6>{profile.user.following.length} following</h6>
                   
                </div>
                { showfollow? <button style={{margin:"10px"}} className="btn waves-effect waves-light #673ab7 deep-purple " type="submit" name="action"  onClick={()=>followUser()}>Follow
                   </button> :                
                <button style={{margin:"10px"}} className="btn waves-effect waves-light #673ab7 deep-purple " type="submit" name="action"  onClick={()=>unfollowUser()}>UnFollow
                   </button>
                }
                
     
            </div>


        </div>
        <div className="gallery">
            {
                profile.posts.map(item => {
                    return (
                        <img className="item" src={item.pic} alt={item.title} key={item._id} />
                    )
                })
            }

        </div>
    </div>
        
        : <h2> loading........ </h2>}
        
        </>
    )
}

export default Profile
