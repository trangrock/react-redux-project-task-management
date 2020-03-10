import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import TaskForm from './components/TaskForm'
import SearchSort from './components/SearchSort'
import TaskList from './components/TaskList'
import * as actions from './actions/index'

class App extends Component {

	onToggleForm = () => {
		let { editTask } = this.props
		if(!!editTask && editTask.id !== '') {
			this.props.onOpenForm()
		} else {
			this.props.onToggleForm()
		}
		this.props.onClearTask({
			id: '',
			name: '',
			status: false
		})
	}

  	render() {

  		let { isDisplayForm } = this.props

	  	return (
	  		<div className="container">
	  			<div className="text-center">
	  				<h1>Task Management</h1><hr />
	  			</div>
	  			<div className="row">
	  				<div className= { !!isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
	  					{/* Task Form */}
	  					<TaskForm />
	  				</div>
	  				<div className= { !!isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
	  					<button
	  						type="button"
	  						className="btn btn-success"
	  						onClick={ this.onToggleForm }
	  					>
	  						<span className="fa fa-plus mr-5"></span>
	  						&nbsp;
	  						Add Task
	  					</button>
	  					{/* Search - Sort */}
	  					<SearchSort />
	  					{/* List */}
	  					<div className="row mt-15">
	  						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	  							<TaskList />
	  						</div>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  	)
	}
}

const mapStateToProps = state => {
	return {
		isDisplayForm: state.toogleForm,
		editTask: state.editTask
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onToggleForm: () => {
			dispatch(actions.toogleForm())
		},
		onClearTask: (task) => {
			dispatch(actions.editTask(task))
		},
		onOpenForm: () => {
			dispatch(actions.openForm())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
