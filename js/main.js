// main.js

/**
 * Note component
 * 
 */
var Note = React.createClass({

	getInitialState: function () {
		return {editing: false};
	},

	// React function that runs before React components are rendered
	// used here to randomize style
	componentWillMount: function () {
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 200) + 'px',
			top: this.randomBetween(0, window.innerHeight - 200) + 'px',
			transform: 'rotate(' + this.randomBetween(-35, 35) + 'deg)'
		}
	},

	randomBetween: function (min, max) {
		return (min + Math.ceil(Math.random() * max));
	},

	edit: function () {
		this.setState({editing: true});
	},

	save: function () {
		// React's getDOMNode has been deprecated, however it is the solution used in the tutorial
		this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
		this.setState({editing: false});
	},

	remove: function () {
		this.props.onRemove(this.props.index);
	},

	// shown when not in editing state
	renderDisplay: function () {
		return (
			<article className="note"
				style={this.style}>
				<p>{this.props.children}</p>
				<img src="assets/rabduck.gif" alt="an optical illusion appearing to be either a rabbit or a duck" className="illusion"/>
				<span>
					<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil" />
					<button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash" />
				</span>
			</article>
		);
	},

	// shown during editing state
	renderForm: function () {
		return (
			<article className="note"
				style={this.style}>
				<textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
				<img src="assets/rabduck.gif" alt="an optical illusion appearing to be either a rabbit or a duck" className="illusion"/>
				<span>
					<button onClick={this.save} className="btn btn-primary glyphicon glyphicon-floppy-disk" />
				</span>
			</article>
		);		
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
			notes: []
		};
	},

	// provide proper next id as Board adds notes
	nextId: function () {
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
	},

	// the Board creates new Notes, adds their text to notes array
	create: function (text) {
		var arr = this.state.notes;
		// notes are now objects not strings, with a note property
		arr.push({
			id: this.nextId(),
			note: text
		});
		this.setState({notes: arr});
	},

	// update stores the state of notes
	update: function (newText, i) {
		// get a copy of the current notes from the state
		var arr = this.state.notes;
		// use index to update correct note with new text
		arr[i].note = newText;
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
			>{note.note}</Note>
			);		
	},

	render: function () {
		// bind??
		return (<section className="board">
			{this.state.notes.map(this.eachNote)}
			<button onClick={this.create.bind(null, "Rabbit or Duck?")}
				className="btn btn-success glyphicon glyphicon-plus"></button>
		</section>);
	}
});

React.render(<Board count={10} />, 
	document.getElementById('react-container'));