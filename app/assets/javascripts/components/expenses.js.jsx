class Expenses extends React.Component{

	constructor(props) {
		super(props);
		this.state = {expenses: this.props.data};

		this.debits = this.debits.bind(this);
		this.credits = this.credits.bind(this);
		this.balance = this.balance.bind(this);
		this.deleteExpense = this.deleteExpense.bind(this);
		this.updateExpense = this.updateExpense.bind(this);
		this.handleNewExpense = this.handleNewExpense.bind(this);
	}

	// getDefaultProps() {
	// 	expenses: []
	// }

	handleNewExpense(expense) {		
		expenses = React.addons.update(this.state.expenses, {$push: [expense]})
		this.setState({expenses: expenses});
	}

	credits() {
		var expenses = this.state.expenses.filter(function(expense, index){
			return expense.amount >= 0
		});
		return expenses.reduce(function(total, expense){
			return total + expense.amount
		},0)
	}

	debits() {
		var expenses = this.state.expenses.filter(function(expense, index){
			return expense.amount < 0
		});
		return expenses.reduce(function(total, expense){
			return total + expense.amount
		},0)
	}

	balance() {
		return this.credits() + this.debits();
	}
	
	deleteExpense(expense) {
		index = this.state.expenses.indexOf(expense)
		expenses = React.addons.update(this.state.expenses, {$splice: [[index, 1]]});
		this.setState({expenses: expenses});
	}

	updateExpense(expense, updated_expense) {
		index = this.state.expenses.indexOf(expense)
		expenses = React.addons.update(this.state.expenses, {$splice: [[index, 1, updated_expense]]});
		this.setState({expenses: expenses});
	}

	render() {
		var deleteExpense = this.deleteExpense;
		var updateExpense = this.updateExpense;
		return (
			<div>
				<div className='expenses'>
					<h2 className='title'> Expenses </h2>
					<div className="row">
						<AmountsBox type="success" text="Credit" value={this.credits()} />
						<AmountsBox type="danger" text="Debit" value={this.debits()} />
						<AmountsBox type="info" text="Balance" value={this.balance()} />
					</div>
					<ExpenseForm handleNewExpense={this.handleNewExpense} />
					<hr />
					<table className='table table-bordered table-striped'>
						<thead>
							<tr>
								<th>Date</th>
								<th>Title</th>
								<th>Amount</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{this.state.expenses.map(function(expense, i){
								return <Expense expense={expense} key={expense.id} handleDeleteExpense={deleteExpense} handleUpdateExpense={updateExpense} />
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
	
}