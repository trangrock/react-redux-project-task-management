import * as types from './../constants/ActionTypes'
import shortid from 'shortid'

let data = JSON.parse(localStorage.getItem('tasks'))
let initialState = data ? data : []

const findIndex = (id, tasks) => {
		let result = -1
		tasks.forEach((task, index) => {
			if(task.id === id) {
				result = index
			}
		})
		return result
	}

let myReducer = (state = initialState, action) => {
	let id = ''
	let index = -1
	switch (action.type) {
		case types.LIST_ALL:
			return state
		case types.SAVE_TASK:
			let task = {
				id: action.task.id,
				name: action.task.name,
				status: action.task.status
			}
			if(!task.id) {
				task.id = shortid.generate()
				state.push(task)
			} else {
				index = findIndex(task.id, state)
				state[index] = task
			}
			localStorage.setItem('tasks', JSON.stringify(state))
			return [...state]
		case types.UPDATE_STATUS_TASK:
			id = action.id
			index = findIndex(id, state)
			state[index] = {
				...state[index],
				status: !state[index].status
			}
			localStorage.setItem('tasks', JSON.stringify(state))
			return [...state]
		case types.DELETE_TASK:
			id = action.id
			index = findIndex(id, state)

			state.splice(index, 1)
			localStorage.setItem('tasks', JSON.stringify(state))
			return [...state]
		default:
			return state
	}
}

export default myReducer