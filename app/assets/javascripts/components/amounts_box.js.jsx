const AmountsBox = (props) => {
	return (
		<div className="col-md-4">
			<div className={"panel panel-"+props.type}>
				<div className="panel-heading">
					{props.text}
				</div>
				<div className="panel-body">
					{props.value}
				</div>
			</div>
		</div>
	)
}