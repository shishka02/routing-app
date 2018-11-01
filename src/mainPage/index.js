import React, { Component } from 'react'
import { addTaskToFirebase, removeTaskFromFirebase } from '../firebase'
import { connect } from 'react-redux'
import {
	getTasksThunk,
	watchTaskAddedEvent,
	watchTaskRemovedEvent
} from '../store'
import { withRouter } from 'react-router-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import MapContainer from './map'

class RenderingDescription extends Component {
	renderingDescription = () => {
		let buff
		let Description
		buff = this.props.tasks.AddRoute.map((item, i) => ({
			Description: item.task.Description,
			Name: item.task.Name
		}))
		buff.forEach(element => {
			if (element.Name === this.props.match.params.id) {
				Description = element.Description
			}
		})

		return Description
	}

	delete = () => {
		this.props.tasks.AddRoute.forEach(item => {
			if (item.task.Name === this.props.match.params.id) {
				removeTaskFromFirebase(item.id)
				this.props.history.push('/')
			}
		})
	}

	render() {
		return (
			<div>
				{this.renderingDescription()}
				<MapContainer
					route={this.props.tasks}
					match={this.props.match.params.id}
				/>
				<button className="del_button" onClick={this.delete}>
					delete
				</button>
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
	)(RenderingDescription)
)
