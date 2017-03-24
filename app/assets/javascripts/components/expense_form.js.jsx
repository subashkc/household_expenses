var ExpenseForm = React.createClass({
	getInitialState: function(){
		return {title: '', date: '', amount: 0}
	},
	valid: function(){
		this.state.title && this.state.date && this.state.amount
	},
	handleChange: function(e){
		var state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
	},
	handleSubmit: function(e){
		e.preventDefault();
		var that = this;
		$.ajax({
	    	url:"/expenses",
	     	data: {expense: that.state},
	     	datdaType:'json',
	      	type:'POST',
	      	success: function(data) {
	        	that.props.handleNewExpense(data);
	        	that.setState(that.getInitialState());
	      	},
		    error: function(){
		    	
		     }
	    });

	},
	render: function(){
		return (
			<form className="form-inline" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input type='text' className='form-control' placeholder='Date' name='date' value={this.state.date} onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<input type='text' className='form-control' placeholder='Title' name='title' value={this.state.title} onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<input type='text' className='form-control' placeholder='Amount' name='amount' value={this.state.amount} onChange={this.handleChange} />
				</div>
				<button type='submit' className='btn btn-primary' disabled={!this.valid}>Add Expense</button>
			</form>
		)
	}
})