import React, { useState, useContext, Fragment } from 'react'
import _ from 'lodash'
import decode from 'jwt-decode'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import UserContext from '../../context/userContext'

function UserAuth() {
	const appUser = useContext(UserContext)

const onLogout = () => {
		localStorage.removeItem('user');  // remove user
		Cookies.remove('token')	// delete token
    window.location.replace('/');
	}
	return (
		<Fragment>
			{
				appUser !== undefined
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