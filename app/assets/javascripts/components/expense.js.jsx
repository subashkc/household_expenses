class Expense extends React.Component {

	constructor(props) {
		super(props);
		this.state = { edit: false, date: this.props.expense.date, title: this.props.expense.title, amount: this.props.expense.amount };

		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleEditToggle = this.handleEditToggle.bind(this);
	}

	handleEditToggle(e) {
		e.preventDefault();
		this.setState({edit: !this.state.edit});
	}

	handleUpdate(e) {
		e.preventDefault();
		var that = this;
		var expenseData = {title: this.state.title, date: this.state.date, amount: this.state.amount}
		$.ajax({
			url: "/expenses/"+this.props.expense.id,
			type: 'PUT',
			data: {expense: expenseData},
			dataType:'json',
			success: function(data){
				that.setState({edit: false})
				that.props.handleUpdateExpense(that.props.expense, data);
			},
			error: function(data){

			}
		});
	}

	handleDelete(e) {
		e.preventDefault();
		var confirmDelete = confirm('Are you sure?');
		if(confirmDelete){
			var that = this;
			$.ajax({
				url: "/expenses/"+this.props.expense.id,
				type: 'DELETE',
				dataType:'json',
				success: function(){
					that.props.handleDeleteExpense(that.props.expense);
				},
				error: function(data){

				}
			})		
		}
	}

	showExpenseRow() {
		return (
			<tr>
				<td>{this.props.expense.date}</td>
				<td>{this.props.expense.title}</td>
				<td>{this.props.expense.amount}</td>
				<td>
					<a href="" className="btn btn-default" onClick={this.handleEditToggle}>Edit</a>
					<a href="" className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
				</td>
			</tr>
		)
	}

	showExpenseForm() {
		return (
			<tr>
				<td>
					<input type="text" className="form-control" onChange={event => this.setState({date: event.target.value})} defaultValue={this.props.expense.date} />
				</td>
				<td>
					<input type="text" className="form-control" onChange={event => this.setState({title: event.target.value})} defaultValue={this.props.expense.title} />
				</td>
				<td>
					<input type="text" className="form-control" onChange={event => this.setState({amount: event.target.value})} defaultValue={this.props.expense.amount} />
				</td>
				<td>
					<a href="" className="btn btn-default" onClick={this.handleUpdate}>Update</a>
					<a href="" className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
				</td>
			</tr>
		)
	}
	render(){
		if(this.state.edit){
			return this.showExpenseForm();
		} else {
			return this.showExpenseRow();
		}		
	}
	
}