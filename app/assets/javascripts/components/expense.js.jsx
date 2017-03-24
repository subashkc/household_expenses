var Expense = React.createClass({
	getInitialState: function(){
		return {edit: false}
	},
	handleEditToggle: function(e){
		e.preventDefault();
		this.setState({edit: !this.state.edit})
	},
	handleUpdate: function(e){
		e.preventDefault();
		var that = this;
		var expenseData = {title: this.refs.title.value, date: this.refs.date.value, amount: this.refs.amount.value}
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
	},
	handleDelete: function(e){
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
	},
	showExpenseRow: function(){
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
	},
	showExpenseForm: function(){
		return (
			<tr>
				<td>
					<input type="text" className="form-control" ref="date" defaultValue={this.props.expense.date} />
				</td>
				<td>
					<input type="text" className="form-control" ref="title" defaultValue={this.props.expense.title} />
				</td>
				<td>
					<input type="text" className="form-control" ref="amount" defaultValue={this.props.expense.amount} />
				</td>
				<td>
					<a href="" className="btn btn-default" onClick={this.handleUpdate}>Update</a>
					<a href="" className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
				</td>
			</tr>
		)
	},
	render: function(){
		if(this.state.edit){
			return this.showExpenseForm();
		} else {
			return this.showExpenseRow();
		}		
	}
});