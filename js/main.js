// main.js

/**
 * Note component
 * 
 */
var Note = React.createClass({

	getInitialState: function () {
		return {editing: false};
	},

	create: function () {
		console.log("creating new note");
	},

	edit: function () {
		this.setState({editing: true});
	},

	save: function () {
		this.setState({editing: false});
	},

	remove: function () {
		this.setState({editing: false});
	},

	renderDisplay: function () {
		return (<article className="note">
			<p>{this.props.children}</p>
			<img src="assets/rabduck.gif" alt="an optical illusion appearing to be either a rabbit or a duck" className="illusion"/>
			<span>
				<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil" />
				<button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash" />
			</span>
		</article>);
	},

	renderForm: function () {
		return (<article className="note">
			<textarea defaultValue={this.props.children} className="form-control"></textarea>
			<img src="assets/rabduck.gif" alt="an optical illusion appearing to be either a rabbit or a duck" className="illusion"/>
			<span>
				<button onClick={this.save} className="btn btn-primary glyphicon glyphicon-floppy-disk" />
			</span>
		</article>);		
	},

	// render now decides between two sub-functions doing special rendering
	// depending on editing state
	render: function () {
		if (this.state.editing) {
			return this.renderForm();
		} else {
			return this.renderDisplay();
		}
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