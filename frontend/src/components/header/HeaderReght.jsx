import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderReght = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const [dropdown, setDropdown] = useState(false)

    const logoutHandler = () => {
        dispatch(logoutUser())
        setDropdown(false)

    }

    return ( 
        <div className="header-right">
            {user ?(
                <>
                    <div className="header-right-user-info">
                        <span onClick={() => setDropdown(prev => !prev)} className="header-right-username">
                            {user?.username}
                        </span>
                        <img
                            src={user?.profilePhoto.url}
                            alt="user-photo"
                            className="header-right-user-photo"
                        />
                        {
                            dropdown && (
                                <div
                                    className="header-right-dropdown"
                                    >
                                    <Link
                                        to={`/profile/${user._id}`}
                                        className="header-dropdown-item"
                                            onClick={() => setDropdown(false)}
                                        >
                                        <Icon.FilePerson />
                                        <span>Profile</span>
                                    </Link>
                                    <div
                                        className="header-dropdown-item"
                                        onClick={logoutHandler}
                                    >
                                        <Icon.BoxArrowInLeft />
                                        <span>Logout</span>
                                    </div>
                                </div>)  
                        }
                    </div>
                </>
                ): (
                <>
                    <Link to="/login"className="header-right-link">
                        <Icon.BoxArrowInRight className="icon" / >
                        <span>Login</span>
                    </Link>
                    <Link to="/register" className="header-right-link">
                        <Icon.PersonPlus className="icon"/>
                        <span>Register</span>
                    </Link>
                </>
                )
            }
        </div>
     );
}
 
export default HeaderReght;