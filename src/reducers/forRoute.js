const initialState = []

// export default function Articles (state = initialState, action) {
//   if (action.type === 'ADD_TRACK') {
//     return [...state, action.payload]
//   }
//   return state
// }

export default function AddRoute (state = initialState, action) {
  switch (action.type) {
    case 'get tasks':
      return action.tasks
    case 'add task':
      return [...state, action.task]
    case 'remove task':
      return state.filter(task => task.id !== action.task.id)
    default:
      return state
  }
}
