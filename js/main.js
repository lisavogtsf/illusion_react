// main.js

/**
 * Note component
 * 
 */
var Note = React.createClass({

	getInitialState: function () {
		return {editing: false};
	},

	// used to set the default style of each Note
	// this can then be used with style = this.props
	getDefaultProps: function () {
		return {
			height: "200px",
			width: "200px",
			margin: "10px",
			padding: "10px",
			position: "absolute",
			backgroundColor: "#ffff99",
			float: "left",
			boxShadow: "3px 3px 5px 0 black"
		};
	},

	// React function that runs just before React components are rendered
	// it picks up the default props and then adds the randomized styles
	// separates more basic style from more complicated
	componentWillMount: function () {
		console.log("Note componentWillMount, location and rotation randomized");
		this.style = this.props;
		this.style.right = this.randomBetween(0, window.innerWidth - 200) + 'px';
		this.style.top = this.randomBetween(0, window.innerHeight - 200) + 'px';
		this.style.transform = 'rotate(' + this.randomBetween(-35, 35) + 'deg)';
	},

	// generate a random number betwen min and max
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

	// render a static note, this is shown when not in editing state
	renderDisplay: function () {
		return (
			<article className="note"
				style={this.style}>
				<p>{this.props.children}</p>
				<img src="assets/rabduck.gif" alt="an optical illusion appearing to be either a rabbit or a duck" className="illusion"/>
				<span className="button-bar">
					<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil" />
					<button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash" />
				</span>
			</article>
		);
	},

	// render the form for changing a note, shown during editing state
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

	componentDidMount: function () {
		console.log("a React Note components was mounted");
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

	componentDidMount: function() {
		console.log("React component 'Board' has been mounted");
	},

	// render the entire board
	// simplified with helper function eachNote
	render: function () {
		// bind adds placeholder text
		return (<section className="board">
			{this.state.notes.map(this.eachNote)}
			<button onClick={this.create.bind(null, "Rabbit or Duck?")}
				className="btn btn-success glyphicon glyphicon-plus"></button>
		</section>);
	}
});

React.render(<Board count={10} />, 
	document.getElementById('react-container'));