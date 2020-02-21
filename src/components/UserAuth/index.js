import React, { useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/userContext'

function UserAuth() {
	const appUser = useContext(UserContext)

	const onLogout = () => {
console.log('here');
		localStorage.removeItem('user');  // remove user
    document.cookie = `token=null`  // delete token
    window.location.replace('/');
	}
	return (
		<Fragment>
			{
				appUser
				?
				<>
					<Link to='/profile'>
						{ appUser && appUser.name }
					</Link>
					<Link to={'/'} onClick={onLogout}>Logout</Link>
				</>
				:
				<>
					<Link to='/login'>Login</Link>
					<Link to='/login'>Register</Link>
				</>
			}
			
		</Fragment>
	)
}

export default UserAuth;