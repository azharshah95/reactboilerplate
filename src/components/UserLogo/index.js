import React, { useContext } from 'react'
import UserContext from '../../context/userContext'

function UserLogo() {
	const appUser = useContext(UserContext)
	return (
		<div>
			{
				appUser && appUser.name
			}
		</div>
	)
}

export default UserLogo;