import { createStore, applyMiddleware } from 'redux'
import database from './firebase'
import thunkMiddleware from 'redux-thunk'
import Reducer from './reducers/index'

/**
 * ACTION TYPES
 */
const GET_TASKS = 'get tasks'
const REMOVE_TASK = 'remove task'
const ADD_TASK = 'add task'
const ADD_USER = 'add user'
const GET_USERS = 'get users'
const REMOVE_USER = 'remove user'
/**
 * ACTION CREATORS
 */
export const getTasks = tasks => ({ type: GET_TASKS, tasks })
export const addTask = task => ({ type: ADD_TASK, task })
export const removeTask = task => ({ type: REMOVE_TASK, task })
export const addUser = user => ({ type: ADD_USER, user })
export const getUsers = users => ({ type: GET_USERS, users })
export const removeUser = user => ({ type: REMOVE_USER, user })

/**
 * LISTENERS
 */
export function watchUserAddedEvent (dispatch) {
  database.ref(`/USERS`).on('child_added', snap => {
    dispatch(addUser(snap.val()))
  })
}
export function watchTaskAddedEvent (dispatch) {
  database.ref(`/Route`).on('child_added', snap => {
    dispatch(addTask(snap.val()))
  })
}
export function watchTaskRemovedEvent (dispatch) {
  database.ref(`/Route`).on('child_removed', snap => {
    dispatch(removeTask(snap.val()))
  })
}
/**
 * THUNKS
 */
export function getTasksThunk () {
  return dispatch => {
    const tasks = []
    database
      .ref(`/Route/`)
      .once('value', snap => {
        snap.forEach(data => {
          let task = data.val()
          tasks.push(task)
        })
      })
      .then(() => dispatch(getTasks(tasks)))
  }
}
export function getUsersThunk () {
  return dispatch => {
    const users = []
    database
      .ref(`/USERS/`)
      .once('value', snap => {
        snap.forEach(data => {
          let user = data.val()
          users.push(user)
        })
      })
      .then(() => dispatch(getUsers(users)))
  }
}
/**
 * REDUCER
 */
// function Reducer (state = [], action) {
//   switch (action.type) {
//    case GET_TASKS:
//     return action.tasks
//    case ADD_TASK:
//     return [...state, action.task]
//    case REMOVE_TASK:
//     return state.filter(task => task.id !== action.task.id)
//    default:
//     return state
//   }
// }
export default createStore(Reducer, applyMiddleware(thunkMiddleware))
