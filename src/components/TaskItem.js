import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/index'

class TaskItem extends Component {

	onUpdateStatus = () => {
		this.props.onUpdateStatus(this.props.task.id)
	}

	onDelete = () => {
		this.props.onDeleteTask(this.props.task.id)
		this.props.onCloseForm()
	}

	onEdit = () => {
		this.props.onOpenForm()
		this.props.onEdit(this.props.task)
	}

	render() {
		let { task, index } = this.props
		return (
			<tr>
				<td> { index + 1 } </td>
				<td style={{fontWeight: "bold"}}> { task.name } </td>
				<td className="text-center">
					<span
						className={ !!task.status ? "label label-danger" : "label label-success"}
						onClick= { this.onUpdateStatus }
					>
						{ !!task.status ? "Enable" : "Hide"}
					</span>
				</td>
				<td className="text-center">
					<button
						type="button"
						className="btn btn-warning"
						onClick= { this.onEdit }
					>
						<span className="fa fa-pencil mr-5"></span>
						Edit
					</button>
					&nbsp;
					<button
						type="button"
						className="btn btn-danger"
						onClick= { this.onDelete }
					>
						<span className="fa fa-trash mr-5"></span>
						Delete
					</button>
				</td>
			</tr>
		)
	}
}

const mapStateToProps = state => {
	return {

	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onUpdateStatus: id => {
			dispatch(actions.updateStatus(id))
		},
		onDeleteTask: id => {
			dispatch(actions.deleteTask(id))
		},
		onOpenForm: () => {
			dispatch(actions.openForm())
		},
		onCloseForm: () => {
			dispatch(actions.closeForm())
		},
		onEdit: task => {
			dispatch(actions.editTask(task))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem)