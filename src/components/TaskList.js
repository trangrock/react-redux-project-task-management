import React, { Component } from 'react'
import TaskItem from './TaskItem'
import { connect } from 'react-redux'
import * as actions from './../actions/index'

class TaskList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			filterName: '',
			filterStatus: -1 // all: -1, hide: 1, enable: 0
		}
	}

	onChange = (event) => {
		let target = event.target
		let name = target.name
		let value = target.value
		let filter = {
			name : name === 'filterName' ? value : this.state.filterName,
			status: name === 'filterStatus' ? value : this.state.filterStatus
		}
		this.props.onFilterTable(filter)
		this.setState({
			[name] : value
		})
	}

	render() {
		let { tasks, filterTable, keyword, sort } = this.props
		let { filterName, filterStatus } = this.state

		// Filter on table
		if(!!filterTable) {
  			if(!!filterTable.name) {
  				tasks = tasks.filter((task) => {
  					return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
  				})
  			}
			tasks = tasks.filter((task) => {
				if(filterTable.status === -1) {
					return task
				} else {
					return task.status === (filterTable.status === 1 ? true : false)
				}
			})
		}

		// Search keyword
		tasks = tasks.filter(task => {
			return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
		})

		// Sort
		if(sort.by === 'name') {
			tasks.sort((task1, task2) => {
				if(task1.name > task2.name) return sort.value
				else if (task1.name < task2.name) return -sort.value
				else return 0
			})
		} else {
			tasks.sort((task1, task2) => {
				if(task1.status > task2.status) return -sort.value
				else if (task1.status < task2.status) return sort.value
				else return 0
			})
		}

		let elmTasks = tasks.map((task, index) => {
			return 	<TaskItem
						key = {task.id}
						index = {index}
						task = {task}
					/>
		})

		return (
			<table className="table table-bordered table-hover">
				<thead>
					<tr>
						<th className="text-center">No.</th>
						<th className="text-center">Name</th>
						<th className="text-center">Status</th>
						<th className="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>
							<input
								type="text"
								className="form-control"
								name="filterName"
								value= { filterName }
								onChange= { this.onChange }
							/>
						</td>
						<td>
							<select
								className="form-control"
								name="filterStatus"
								value= { filterStatus }
								onChange= { this.onChange }
							>
								<option value={-1}>All</option>
								<option value={0}>Hide</option>
								<option value={1}>Enable</option>
							</select>
						</td>
						<td></td>
					</tr>
					{ elmTasks }
				</tbody>
			</table>
		)
	}
}

const mapStateToProps = state => {
	return {
		tasks: state.tasks,
		filterTable: state.filterTable,
		keyword: state.search,
		sort: state.sort
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onFilterTable: filter => {
			dispatch(actions.filterTask(filter))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)