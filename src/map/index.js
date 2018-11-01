import React, { Component } from 'react'
import {
	Polyline,
	withScriptjs,
	Map,
	InfoWindow,
	Marker,
	GoogleApiWrapper
} from 'google-maps-react'

export class MapContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			markers: []
		}
	}

	mapClick = (t, map, coord) => {
		const { latLng } = coord
		const lat = latLng.lat()
		const lng = latLng.lng()
		let buff = Date.now()
		if (this.state.markers.length < 5) {
			this.setState(previousState => {
				return {
					markers: [
						...previousState.markers,
						{
							id: buff,
							name: '',
							position: { lat, lng }
						}
					]
				}
			})
		} else {
			alert(
				'u can set only 5 markers, if u want to delete markers u already set just click on them'
			)
		}
	}

	onMarkerClick = id => {
		this.state.markers.filter((item, i) => {
			if (id === item.id) {
				this.setState(prevState => {
					let items = prevState.markers
					items.splice(i, 1)
					return { items }
				})
			}
		})
	}

	coordinates = () => {
		let buff = []
		this.state.markers.forEach(item => {
			buff.push(item.position)
		})

		return buff
	}

	render() {
		return (
			<div>
				<div>
					<h1 className="text-center" />
					<Map
						google={this.props.google}
						style={{ width: '100%', height: '100%', margin: 'auto' }}
						initialCenter={{ lat: 50.0, lng: 28.0 }}
						className={'map'}
						zoom={14}
						onClick={this.mapClick}
					>
						<Polyline
							path={this.coordinates()}
							geodesic={false}
							options={{
								strokeColor: '#38B44F',
								strokeOpacity: 1,
								strokeWeight: 7
							}}
						/>
						{this.state.markers.map((marker, index) => (
							<Marker
								key={index}
								title={marker.title}
								name={marker.name}
								position={marker.position}
								onClick={id => {
									this.onMarkerClick(marker.id)
								}}
							/>
						))}
					</Map>
				</div>
				<div className="map_button">
					<button
						className="save_button"
						onClick={() => {
							this.props.updateData(this.coordinates())
						}}
					>
						save
					</button>
				</div>
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyB7tw3Yo-oVoYt0CBGaG69dHFf4V5kYrJg'
})(MapContainer)
