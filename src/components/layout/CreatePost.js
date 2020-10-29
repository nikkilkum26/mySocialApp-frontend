import React ,{useState,useEffect}from 'react';
import './Createpost.css'
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';


function CreatePost() {
    const history =useHistory();
    const[title,setTitle] = useState("");
    const[body,setBody] = useState("");
    const[image,setImage] =useState("");
    const[url,setUrl] =useState("");
    useEffect(()=>{
if(url){

        fetch("http://localhost:5000/post/createpost",{
            method:"post",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
               title,
               body,
               pic_url:url,
            })
    
        }).then(res=>res.json())
        .then(e=>{
      
            if(e.error){
                M.toast({html: e.error,classes:"#ab47bc purple lighten-1"})
            }
            else{
                M.toast({html: "Post created successfully",classes:"#388e3c green darken-2"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url,body,history,title])

    const postDetials=()=>{
        const data= new FormData();
        data.append("file",image);
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

    return (
        <div className="card input-filed layout__post">

            <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
            <input type="text" placeholder="Caption" vlaue={body} onChange={e=>setBody(e.target.value)}/>
            <div className="file-field input-field">
      <div className="btn #212121 grey darken-4">
        <span>Upload Image</span>
        <input type="file" onChange={e=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
      </div>
      <button className="btn waves-effect waves-light #212121 grey darken-4 " type="submit"onClick={()=>postDetials()}>
          Submit post
    
                    </button>
    
        </div>
    )
}

export default CreatePost
