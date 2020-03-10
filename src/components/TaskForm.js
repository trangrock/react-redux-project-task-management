import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/index'

class TaskForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			id: '',
			name: '',
			status: false
		}
	}

	componentDidMount() {
		if(!!this.props.task) {
			this.setState({
				id: this.props.task.id,
				name: this.props.task.name,
				status: this.props.task.status
			})
		}
	}

	UNSAFE_componentWillReceiveProps(nextprops) {
		if(!!nextprops && !!nextprops.task) {
			this.setState({
				id: nextprops.task.id,
				name: nextprops.task.name,
				status: nextprops.task.status
			})
		} else if(!nextprops.task) {
			this.setState({
				id: '',
				name: '',
				status: false
			})
		}
	}

	onChange = (event) => {
		let target = event.target
		let name = target.name
		let value = target.value
		if(name === 'status') {
			value = target.value === 'true' ? true : false
		}
		this.setState({
			[name]: value
		})
	}

	onSubmit = (event) => {
		event.preventDefault()
		this.props.onSaveTask(this.state)
		// Cancel & Close Form
		this.onClear()
		this.props.onCloseForm()
	}

	onClear = () => {
		this.setState({
			name: '',
			status: false
		})
	}

	render() {
		let { id } = this.state
		let { onCloseForm, isDisplayForm } = this.props
		if (!isDisplayForm) return ''
	  	return (
	  		<div className="panel panel-info">
	  			<div className="panel-heading">
	  				<h3 className="panel-title">
	  					{ id !== '' ? 'Edit Task' : 'Add Task'}
	  					<span
	  						className="fa fa-times-circle text-right"
	  						onClick= { onCloseForm }
	  					>
	  					</span>
	  				</h3>
	  			</div>
	  			<div className="panel-body">
	  				<form onSubmit={ this.onSubmit }>
	  					<div className="form-group">
	  						<label>Name :</label>
	  						<input
	  							type="text"
	  							className="form-control"
	  							name="name"
	  							value={ this.state.name }
	  							onChange={ this.onChange }
	  						/>
	  					</div>
	  					<label>Status :</label>
	  					<select
	  						className="form-control"
	  						name="status"
	  						value={ this.state.status }
	  						onChange={ this.onChange }
	  					>
	  						<option value={true}>Enable</option>
	  						<option value={false}>Hide</option>
	  					</select>
	  					<br />
	  					<div className="text-center">
	  						<button
	  							type="submit"
	  							className="btn btn-warning">
	  							<span className="fa fa-plus mr-5"></span>
	  							Save
	  						</button>&nbsp;
	  						<button
	  							type="button"
	  							className="btn btn-danger"
	  							onClick={ this.onClear }
	  						>
	  							<span className="fa fa-close mr-5"></span>
	  							Cancel
	  						</button>
	  					</div>
	  				</form>
	  			</div>
	  		</div>
	  	)
	}
}

const mapStateToProps = state => {
	return {
		isDisplayForm: state.toogleForm,
		task: state.editTask
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onSaveTask: task => {
			dispatch(actions.saveTask(task))
		},
		onCloseForm: () => {
			dispatch(actions.closeForm())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)