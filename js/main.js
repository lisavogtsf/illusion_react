// main.js
var Note = React.createClass({
	render: function () {
		return (<article className="note">
			<textarea defaultValue="Rabbit or Duck?" className="form-control"></textarea>
		</article>);
	}
});

var Board = React.createClass({

	render: function () {
		return (<section className="board">
			<Note/>
		</section>);
	}
});


React.render(<Board />, 
	document.getElementById('react-container'));