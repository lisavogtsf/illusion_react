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
			<article className="note draggable"
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

	// runs immediately after component is mounted
	componentDidMount: function () {
		$(function (){
			$(".draggable").draggable();
		});
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