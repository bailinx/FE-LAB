var React = require('react');
var Hello = require('./hello.jsx');

module.exports = React.createClass({
    render: function () {
        var names = ['smith', 'baili', 'radishj'];
        var nodes = [];
        names.map(function(name) {
            nodes.push(<Hello key={name} name={name}/>)
        });
        return (
            <div>{nodes}</div>
        );
    }
});
