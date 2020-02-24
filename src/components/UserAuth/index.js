import React, { useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import UserContext from '../../context/userContext'

function UserAuth() {
	const appUser = useContext(UserContext)

	const onLogout = () => {
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
            <Menu.Item name={appUser.name} />
					</Link>
					<Link to={'/'} onClick={onLogout}>
            <Menu.Item name='Logout' />
          </Link>
				</>
				:
				<>
          <Link to='/login'>
					  <Menu.Item name='Login' />
					</Link>
				</>
			}
			
		</Fragment>
	)
}

export default UserAuth;