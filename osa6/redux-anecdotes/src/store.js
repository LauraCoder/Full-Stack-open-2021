import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
//import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)
/*
anecdoteService.getAll().then(anecdotes =>
    store.dispatch(initializeAnecdotes(anecdotes))
)*/

export default store