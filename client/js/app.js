/*
    Main class.
*/
var React = require('react');

var Item = React.createClass({
    // An image.
    getInitialState: function() {
        return {
            selected: false
        };
    },
    toggleSelected: function() {
        this.setState({'selected': !this.state.selected});
        this.props.itemUpdated(this);
    },
    render: function() {
        return <li className="item" onClick={this.toggleSelected}
                   data-item--selected={this.state.selected}>
          <img src={this.props.src}/>
        </li>;
    },
});

var Set = React.createClass({
    // A set of images with a set of selected images.
    getInitialState: function() {
        return {
            items: [
                'http://i.imgur.com/kIFBaf6b.jpg',
                'http://i.imgur.com/OjnUGdFb.jpg',
                'http://i.imgur.com/SFxc1TRb.jpg'
            ],
        };
    },
    itemUpdated: function(item) {
        // Callback for when an item is selected.
        console.log(item.state.selected);
    },
    createItem: function(item, i) {
        // Create item with a callback (itemUpdated) when it is selected.
        return <Item src={item} key={i} itemUpdated={this.itemUpdated}/>
    },
    render: function() {
        return <ul className="set">
          <h1 className="set--title">{this.props.title}</h1>
          {this.state.items.map(this.createItem)}
        </ul>;
    },
});

React.render(<Set title="Chairman Meow"/>, document.querySelector('main'));

module.exports = {};
