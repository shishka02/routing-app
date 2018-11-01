import React from 'react'
import NewRoute from './newRoute/index'
import { Link } from 'react-router-dom'

const CreatingRoute = ({ match }) => {
  return (
    <div>
      <Link to={'/'}>
        <h3>home</h3>
      </Link>

      <div>
        <NewRoute />
      </div>
    </div>
  )
}

export default CreatingRoute
