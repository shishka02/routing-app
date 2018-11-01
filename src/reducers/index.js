import { combineReducers } from 'redux'

import filterArticles from './filter'
import AddRoute from './forRoute'


export default combineReducers({
  filterArticles,
  AddRoute,

})
