import { combineReducers } from 'redux'
import tasks from './tasks'
import toogleForm from './toogleForm'
import editTask from './editTask'
import filterTable from './filterTable'
import search from './search'
import sort from './sort'

const myReducer = combineReducers({
	tasks,
	toogleForm,
	editTask,
	filterTable,
	search,
	sort
})

export default myReducer