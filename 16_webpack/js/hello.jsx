var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            name: 'xx'
        }
    },
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    render: function () {
        return (
            <div>{this.props.name}</div>
        );
    }
});
