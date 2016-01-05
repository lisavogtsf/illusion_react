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
		// onChange is an attribute of Note which calls this method
		// when there is a change in the textarea tagged with newText ref, send that
		// changed text and the index of the note somewhere
		this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
		this.setState({editing: false});
	},

	remove: function () {
		// onRemove attribute on each Note calls this function when removed
		this.props.onRemove(this.props.index);
		// this.setState({editing: false});
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
	// used to define properties not a function
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

	// return a list of notes, hard-coded
	// getInitialState makes populates properties of this.state
	getInitialState: function() {
		return {
			notes: [
				"Rabbit or Duck?",
				"Rabbit",
				"Duck",
				"Raduck"
			]
		};
	},

	// update stores the state of notes
	update: function (newText, i) {
		// get a copy of the current notes from the state
		var arr = this.state.notes;
		// use index to update correct note with new text
		arr[i] = newText;
		// sets this updated array back onto state 
		this.setState({notes:arr});
	},

	remove: function (i) {
		// get local copy of notes array from state
		var arr = this.state.notes;
		// use index to splice out that note
		arr.splice(i, 1);
		// set updated notes onto state
		this.setState({notes:arr});
	},

	// as displaying notes on board gets more complex
	// move all that here, instead of keeping in render 
	eachNote: function (note, i) {
		return (
			<Note key={i}
				index={i}
				onChange={this.update}
				onRemove={this.remove}
			>{note}</Note>
			);		
	},

	render: function () {
		// here map is the usual Javascript function
		// used to run all elements of an array through given function

		// access all notes in this.state.notes
		// take each individually and use the value to go in the Note
		// keep track of things with a key that comes from array indexes
		// heavy lifting has been moved to eachNote
		return (<section className="board">
			{this.state.notes.map(this.eachNote)}
		</section>);
	}
});


React.render(<Board count={10} />, 
	document.getElementById('react-container'));