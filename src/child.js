import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import RenderingDescription from './mainPage/index'
import MapContainer from './mainPage/map.js'

const Child = ({ match }) => {
  return (
    <div>
      <Link to={'/'}>
        <h3>home</h3>
      </Link>

      <h1>{match.params.id}</h1>
      <RenderingDescription match={match} />
      <MapContainer />
    </div>
  )
}

export default Child
