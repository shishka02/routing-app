import React, { Component } from 'react'
import { addTaskToFirebase, removeTaskFromFirebase } from '../firebase'
import { connect } from 'react-redux'
import {
	getTasksThunk,
	watchTaskAddedEvent,
	watchTaskRemovedEvent
} from '../store'
import GoogleMapReact from 'google-map-react'
import MapContainer from '../map/index'

import { withRouter } from 'react-router-dom'
class NewRoute extends Component {
	constructor(props) {
		super(props)
		this.state = { Name: '', Description: '', Coordinates: [] }
	}

	onInputChange = event => {
		const name = event.target.name

		this.setState({ [name]: event.target.value })
	}

	onSubmit = event => {
		event.preventDefault()

		let buff = Object.values(this.state).filter(input => input === '')
		if (buff[0] === '') {
			alert('нужно заполнить все поля и создать маршрут ')
		}
		addTaskToFirebase(this.state)
	}
	updateData = value => {
		let buff = Object.values(this.state).filter(input => input === '')

		if (buff[0] === '' || !value[1]) {
			alert(
				'нужно заполнить все поля и создать маршрут (должно быть как минимум два маркера) '
			)
		} else {
			this.setState({ Coordinates: value }, () => {
				addTaskToFirebase(this.state)
				this.props.history.push('/')
			})
		}
	}

	render() {
		return (
			<div>
				<form className="newRouteForm">
					<label>
						Name:{' '}
						<input
							className="name"
							name="Name"
							type="text"
							value={this.state.Name}
							onChange={this.onInputChange}
						/>
					</label>
					<label className="descriptionLabel">
						{' '}
						Description:{' '}
						<textarea
							className="description"
							name="Description"
							type="text"
							value={this.state.Description}
							onChange={this.onInputChange}
						/>
					</label>
				</form>
				<div className="map">
					<MapContainer updateData={this.updateData} />
				</div>
			</div>
		)
	}
}

export default withRouter(
	connect(state => ({
		tasks: state
	}))(NewRoute)
)

// export default withRouter(
// 	connect(
// 		mapState,
// 		mapDispatch
// 	)(RenderingDescription)
// )
