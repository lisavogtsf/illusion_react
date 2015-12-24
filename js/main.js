// main.js
var Note = React.createClass({
	render: function () {
		console.log("running Note component");
		return <article className="note"></article>
	}
});

var Board = React.createClass({

	render: function () {
		return (<section className="board">
			<Note />
		</section>);
	}
});


React.render(<Board />, 
	document.getElementById('react-container'));