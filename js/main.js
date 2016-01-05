// main.js

/**
 * Note component
 * 
 */
var Note = React.createClass({

	edit: function () {
		this.setState({editing: true});
	},

	render: function () {
		return (<article className="note">
			<textarea defaultValue="Rabbit or Duck?" className="form-control"></textarea>
			<img src="assets/rabduck.gif" alt="an optical illusion appearing to be either a rabbit or a duck" className="illusion"/>
			<span>
				<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil" />
			</span>
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