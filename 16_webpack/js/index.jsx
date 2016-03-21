var React = require('react');
var Hello = require('./hello');

module.exports = React.createClass({
    render: function () {
        var names = ['baili', 'radishj', 'test react hot loader'];
        var nodes = [];
        names.map(function(name) {
            nodes.push(<Hello key={name} name={name}/>)
        });

        return (
            <div>{nodes}</div>
        );
    }
});
