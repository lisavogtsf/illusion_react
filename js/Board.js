// Board.js
var Board = React.createClass({

	// propTypes comes from React, helps with validation
	// used to define properties not a function but contains functions
	propTypes: {
		count: function(props, propName) {
			if (typeof props[propName] !== "number") {
				console.log("count property  must be a number!")
			}
			if (props[propName] > 100) {
				console.log("Creating " + props[propName] + " notes is ridiculous!");
			}
			// track count, properties etc
			console.log("Board propTypes count, props, propName", props, propName);
		}
	},

	// return a list of notes, hard-coded
	// getInitialState makes populates properties of this.state
	getInitialState: function() {
		return {
			notes: []
		};
	},

	// provide proper, unique next id as Board adds notes
	nextId: function () {
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
	},

	// the Board creates new Notes, adds their text to notes array
	// passes in unique id when creating Note
	createNote: function (text) {
		var arr = this.state.notes;
		// notes are now objects not strings, with a note property
		arr.push({
			id: this.nextId(),
			noteText: text
		});
		this.setState({notes: arr});
	},

	// update stores the state of notes
	update: function (newText, i) {
		// get a copy of the current notes from the state
		var arr = this.state.notes;
		// use index to update correct note with new text
		arr[i].noteText = newText;
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
			<Note key={note.id}
				index={i}
				onChange={this.update}
				onRemove={this.remove}
			>{note.noteText}</Note>
			);		
	},

	componentDidMount: function() {
		console.log("React component 'Board' has been mounted");
	},

	// render the entire board
	// simplified with helper function eachNote
	render: function () {
		// bind adds placeholder text
		return (<section className="board">
			{this.state.notes.map(this.eachNote)}
			<button onClick={this.createNote.bind(null, "Rabbit or Duck?")}
				className="btn btn-success glyphicon glyphicon-plus"></button>
		</section>);
	}
});