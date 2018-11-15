import { combineReducers } from 'redux'
import Users from './users'
import filterArticles from './filter'
import AddRoute from './forRoute'

export default combineReducers({
  filterArticles,
  AddRoute,
  Users
})
