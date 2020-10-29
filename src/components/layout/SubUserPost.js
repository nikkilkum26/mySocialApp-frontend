import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App'
import './home.css';
import {Link} from 'react-router-dom'
function Home() {
    const [getPost, setGetPost] = useState([]);
    const { state} = useContext(UserContext);
    useEffect(() => {
        fetch('https://globalmedia.herokuapp.com/post/subpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result.posts)
                setGetPost(result.posts);
            })

    }, [])

    const likePost = (id) => {
        fetch('https://globalmedia.herokuapp.com/post/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newOp = getPost.map(item => {
                    if (item._id === result._id) {
                        return result;
                    }
                    else {
                        return item;
                    }
                })
                setGetPost(newOp)
            }).catch(err => {
                console.log(err)
            })
    }

    const unlikePost = (id) => {
        fetch('https://globalmedia.herokuapp.com/post/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {

                const newOp = getPost.map(item => {
                    if (item._id === result._id) {
                        return result;
                    }
                    else {
                        return item;
                    }
                })
                setGetPost(newOp)
            }).catch(err => {
                console.log(err)
            })
    }
    const makeComment = (text, postId) => {

        fetch('https://globalmedia.herokuapp.com/post/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())

            .then(result => {
                console.log(result)
                const newOpp = getPost.map(item => {
                    if (item._id === result._id) {
                        return result;
                    }
                    else {
                        return item;
                    }

                })
                setGetPost(newOpp);
            }).catch(err => {
                console.log(err)
            })
    }

const deletePost =(postId) =>{
    fetch(`https://globalmedia.herokuapp.com/post/deletepost/${postId}`,{
        method:"delete",
        headers: {
          
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newItem = getPost.filter(item=>{
            return item._id !== result._id;
        })
        setGetPost(newItem);
    })
}


    return (
        <div className="layout__home" >
            {

                getPost.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5 > <Link to={item.postedBy._id !== state._id? "/profile/"+item.postedBy._id : "/profile/"} className="link" >
                                {item.postedBy.name} </Link> {item.postedBy._id === state._id && <i className="material-icons" style={{float:"right" , cursor:"pointer"}} onClick={()=>deletePost(item._id)}>delete_forever</i>}
                            </h5>
                            <div className="card-image">
                                <img src={item.pic} alt={item.postedBy.title}/>
                            </div>
                            <div className="card-content">
                               
                                {item.likes.includes(state._id) ? <i className="material-icons unlike"  onClick={() => { unlikePost(item._id) }}>thumb_down</i> : <i className="material-icons rainbow" onClick={() => { likePost(item._id) }}>thumb_up</i>}




                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <br/>
                                <p  style={{fontWeight:"500" , color:"blue"}}>Comments:</p>
                                {
                                    item.comments.map(c => {
                                        return (
                                            <h6><span style={{ fontWeight:"500" }}>{c.postedBy.name}</span> {c.text}</h6>
                                            )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                    e.target[0].value="";
                                }}>
                                    <input type="text" placeholder="Add comment"></input>
                                </form>
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default Home
