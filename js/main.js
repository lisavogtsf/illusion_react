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
		// React's getDOMNode has been deprecated, however it is the solution used in the tutorial
		var val = this.refs.newText.getDOMNode().value;
		console.log("Next step will be to actually save this value: ", this.refs.newText.getDOMNode().value);
		this.setState({editing: false});
	},

	remove: function () {
		this.setState({editing: false});
	},

	// shown when not in editing state
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

	// shown during editing state
	renderForm: function () {
		return (<article className="note">
			<textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
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

	// propTypes comes from React, helps with validation
	propTypes: {
		count: function(props, propName) {
			if (typeof props[propName] !== "number") {
				console.log("count property  must be a number!")
			}
			if (props[propName] > 100) {
				console.log("Creating " + props[propName] + " notes is ridiculous!");
			}
		}
	},

	render: function () {
		return (<section className="board">
			{this.props.count}
			<Note/>
		</section>);
	}
});


React.render(<Board count={10} />, 
	document.getElementById('react-container'));