import React,{useContext} from 'react'
import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
function Navbar() {
    const {state,dispatch} = useContext(UserContext);
    const history =useHistory()
    const renderList =()=>{
        if(state){
            return[
                <li><Link to="/profile">Profile</Link></li>,
                        <li><Link to="/createpost">Create post</Link></li>,
                        <li><Link to='/myfollowingpost'>Following Users post</Link></li>,
                        <li>                <button className="btn #64b5f6 blue lighten-2 " type="submit" name="action"
                         onClick={()=>{
                             localStorage.clear()
                             dispatch({type:"CLEAR"})
                             history.push('/signin')
                             }}>
                             Logout</button>
                        </li>
                        
            ]
                
    
        }
        else{
            return[
                <li><Link to="/signin">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }


    return (
        <div>
            <nav>
                <div className="nav-wrapper navbar__color">
                    <Link to={state?"/":"/signin"} className="brand-logo right"><h4 className="setFont">Global Media</h4></Link>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                      
                      {renderList()}
                        
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
