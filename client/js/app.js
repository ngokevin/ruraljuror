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
        this.setState({'selected': !this.state.selected}, function() {
            this.props.itemUpdated(this);
        });
    },
    render: function() {
        return <li className="item" onClick={this.toggleSelected}
                   data-item--selected={this.state.selected}>
          <img src={this.props.src}/>
        </li>;
    },
});

var SelectedSet = React.createClass({
    // A set of images that were selected from the set of images.
    selectedSetUpdated: function() {

    },
    createSelectedItem: function(selectedItem) {
        return <li className="selected-item" key={selectedItem.props.id}>
          <img src={selectedItem.props.src}/>
        </li>
    },
    render: function() {
        return <ul className="selected-set">
          <h1 className="selected-set--title">Selected Set</h1>
          {this.props.selectedItems.map(this.createSelectedItem)}
        </ul>
    }
});

var Set = React.createClass({
    // A set of images to select from.
    getInitialState: function() {
        return {
            items: [
                {id: 0, src: 'http://i.imgur.com/kIFBaf6b.jpg'},
                {id: 1, src: 'http://i.imgur.com/OjnUGdFb.jpg'},
                {id: 2, src: 'http://i.imgur.com/SFxc1TRb.jpg'},
                {id: 3, src: 'http://i.imgur.com/PuLsUZIb.jpg'},
                {id: 4, src: 'http://i.imgur.com/LPsxLQEb.jpg'},
                {id: 5, src: 'http://i.imgur.com/3NEapy2b.jpg'}
            ],
            selectedItems: []
        };
    },
    itemUpdated: function(item) {
        // Callback for when an item is selected. Update the selected array.
        var selectedItems = this.state.selectedItems.slice();
        if (item.state.selected) {
            // Add to array if toggled on.
            selectedItems.push(item);
        } else {
            // Remove from array if toggled off.
            var matchingIndex;
            selectedItems.forEach(function(selectedItem, i) {
                if (selectedItem.props.id == item.props.id) {
                    matchingIndex = i;
                }
            });
            selectedItems.splice(matchingIndex, 1);
        }
        this.setState({selectedItems: selectedItems});
    },
    createItem: function(item, i) {
        // Create item with a callback (itemUpdated) when it is selected.
        return <Item src={item.src} id={item.id} key={item.id}
                     itemUpdated={this.itemUpdated}/>
    },
    createSelectedItem: function(item, i) {
        // Similar to createItem, but item will be <Item>s, not JS objects.
        return <li key={item.props.id}>
          <img src={item.props.src}/>
        </li>
    },
    render: function() {
        return <div className="set-wrapper">
          <ul className="set">
            <h1 className="set--title">{this.props.title}</h1>
            {this.state.items.map(this.createItem)}
          </ul>
          <SelectedSet selectedItems={this.state.selectedItems}/>
        </div>
    },
});

React.render(<Set title="Chairman Meow"/>, document.querySelector('main'));

module.exports = {};
