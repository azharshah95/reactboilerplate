import React, { Component } from 'react'
import UserContext from '../../context/userContext'
import UserLogo from '../UserLogo'

class NavBar extends Component {
	static contextType = UserContext;
	render() {
		return (
			<UserContext.Consumer>
				{
					userContext => <div style={{backgroundColor:'grey'}}>Hello<UserLogo /></div>
				}
			</UserContext.Consumer>
		)
	}
}

export default NavBar;