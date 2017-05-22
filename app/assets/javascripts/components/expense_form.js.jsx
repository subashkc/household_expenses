class ExpenseForm extends React.Component{


	constructor(props) {
		super(props);
		
		this.defaultState = {title: '', date: '', amount: 0};
		this.state = this.defaultState;

		this.valid = this.valid.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	valid() {
		this.state.title && this.state.date && this.state.amount
	}

	resetState() {
		this.setState(this.defaultState);
	}

	handleChange(e) {
		var state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	handleSubmit(e) {
		e.preventDefault();
		// var that = this;
		$.ajax({
	    	url:"/expenses",
	     	data: {expense: this.state},
	     	datdaType:'json',
	      	type:'POST',
	      	success: function(data) {
	        	this.props.handleNewExpense(data);
	        	this.resetState();
	        	// that.setState(that.getInitialState());
	      	}.bind(this),
		    error: function(){}
	    });

	}

	render() {
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
}

// var ExpenseForm = React.createClass({
// })