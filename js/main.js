// main.js
console.log("running main");

var Board = React.createClass({

	render: function () {
		return <div className="board"></div>;
	}

});

React.render(<Board />, 
	document.getElementById('react-container'));