import React, { Component } from 'react'
import { addTaskToFirebase, removeTaskFromFirebase } from './firebase'
import { connect } from 'react-redux'
import {
	getTasksThunk,
	watchTaskAddedEvent,
	watchTaskRemovedEvent
} from './store'
import './App.css'
import NewRoute from './newRoute/index'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Auth from './auth/index.js'
import { withRouter } from 'react-router-dom'
class App extends Component {
	render_of_routes = () => {
		if (this.props.tasks.AddRoute[0] && this.props.tasks.AddRoute[0].id) {
			return this.props.tasks.AddRoute.map((item, i) => (
				<Link key={i} to={'/b/' + item.task.Name}>
					<div>
						<li>{'name: ' + item.task.Name}</li>{' '}
						<li>{'Description: ' + item.task.Description}</li>
					</div>
				</Link>
			))
		}
	}

	render() {
		return (
			<div>
				<div />
				<div>
					<h2> List of Routes:</h2>
					<ul>
						{this.render_of_routes()}
						<Link to={'/test'}>
							<h3>add route</h3>
						</Link>
					</ul>
					<Auth />
				</div>
			</div>
		)
	}
}

const mapState = state => ({
	tasks: state
})
const mapDispatch = dispatch => {
	dispatch(getTasksThunk())
	watchTaskAddedEvent(dispatch)
	watchTaskRemovedEvent(dispatch)
	return {}
}

export default withRouter(
	connect(
		mapState,
		mapDispatch
	)(App)
)

// export default connect(
// 	mapState,
// 	mapDispatch
// )(App)
