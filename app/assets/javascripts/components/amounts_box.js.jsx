var AmountsBox = React.createClass({
	render: function(){
		return (
			<div className="col-md-4">
				<div className={"panel panel-"+this.props.type}>
					<div className="panel-heading">
						{this.props.text}
					</div>
					<div className="panel-body">
						{this.props.value}
					</div>
				</div>
			</div>
		)
	}
})