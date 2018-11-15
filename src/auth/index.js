import React, { Component } from 'react'
import { addUserToFirebase, removeTaskFromFirebase } from '../firebase'
import { connect } from 'react-redux'
import {
	getUsersThunk,
	watchUserAddedEvent,
	watchTaskRemovedEvent
} from '../store'
import { BrowserRouter, Link, Route } from 'react-router-dom'

import { withRouter } from 'react-router-dom'

class Auth extends Component {
	constructor(props) {
		super(props)
		this.state = {
			login: '',
			pass: ''
		}
	}
	onInputChange = event => {
		const name = event.target.name
		this.setState({ [name]: event.target.value })
	}
	login = () => {
		let buff = this.props.tasks.Users.find(item => item.id === this.state.login)
		console.log(buff)
		if (buff === undefined) {
			alert('such user not exist  ')
		} else if (buff && buff.User.pass !== this.state.pass) {
			alert('incorect pass ')
		} else {
			alert('I greet U')
			this.setState({
				login: '',
				pass: ''
			})
		}
	}

	clearState = () => {
		this.setState(
			{
				login: this.state.login.replace(/\s/g, ''),
				pass: this.state.pass.replace(/\s/g, '')
			},
			() => this.create()
		)
	}
	create = () => {
		let buff = this.props.tasks.Users.find(item => item.id === this.state.login)

		if (buff === undefined) {
			if (!!this.state.login && !!this.state.pass) {
				addUserToFirebase(this.state)
				this.setState({
					login: '',
					pass: ''
				})
			} else {
				alert('u must put smth in login and pass fields')
			}
		} else {
			alert('user already exist')
		}
	}

	render() {
		console.log(this.props.tasks.Users)
		return (
			<div>
				<form>
					<label>
						Name:
						<input
							name="login"
							type="text"
							value={this.state.login}
							onChange={this.onInputChange}
						/>
					</label>
					<div />
					<label>
						pass:
						<input
							name="pass"
							type="text"
							value={this.state.pass}
							onChange={this.onInputChange}
						/>
					</label>
				</form>

				<button
					onClick={() => {
						this.login()
					}}
				>
					{' '}
					loggin
				</button>
				<button
					onClick={() => {
						this.clearState()
					}}
				>
					{' '}
					create new
				</button>
			</div>
		)
	}
}

const mapState = state => ({
	tasks: state
})
const mapDispatch = dispatch => {
	dispatch(getUsersThunk())
	watchUserAddedEvent(dispatch)

	return {}
}

export default withRouter(
	connect(
		mapState,
		mapDispatch
	)(Auth)
)
