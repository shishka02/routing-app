import React, { Component } from 'react'
import {
	Polyline,
	withScriptjs,
	Map,
	InfoWindow,
	Marker,
	GoogleApiWrapper
} from 'google-maps-react'

const newLocal = <div>hi</div>
class MapContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			markers: []
		}
	}

	renderingPolyline = () => {
		let buff = []
		if (this.props.route && this.props.route.AddRoute[0]) {
			this.props.route.AddRoute.forEach(element => {
				if (element.task.Name === this.props.match) {
					buff = (
						<div>
							<Map
								google={this.props.google}
								style={{ width: '100%', height: '100%', margin: 'auto' }}
								initialCenter={{ lat: 50.0, lng: 28.0 }}
								className={'map'}
								zoom={14}
							>
								<Polyline
									path={element.task.Coordinates}
									geodesic={false}
									options={{
										strokeColor: 'red',
										strokeOpacity: 1,
										strokeWeight: 7
									}}
								/>
								{element.task.Coordinates.map((marker, index) => (
									<Marker key={index} position={marker} />
								))}
							</Map>
						</div>
					)
				}
			})
		}

		return buff
	}

	render() {
		let buff = this.renderingPolyline()

		return <div>{buff}</div>
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyB7tw3Yo-oVoYt0CBGaG69dHFf4V5kYrJg'
})(MapContainer)
