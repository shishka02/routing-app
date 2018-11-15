const initialState = []

export default function Users (state = initialState, action) {
  // if (action.type === 'add user') {
  //   return [...state, action.user]
  // }
  // return state

  switch (action.type) {
    case 'get users':
      return action.users
    case 'add user':
      return [...state, action.user]
    case 'remove user':
      return state.filter(task => task.id !== action.task.id)
    default:
      return state
  }
}
