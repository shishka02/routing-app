const initialState = ''

export default function filterArticles (state = initialState, action) {
  if (action.type === 'Find_Article') {
    return action.payload
  }
  return state
}
