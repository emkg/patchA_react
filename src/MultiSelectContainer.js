import React from 'react';


/*
constructor(props) {
  super(props);
  this.state = { data: " " };
}

componentDidMount() {
  this.getAssets();
}

async getAssets() {
 const req = await fetch('/api/getServers.php');
 if (!req.ok) {
   throw req;
 }

 const data = await req.json();
 console.log(data);
 this.setState({ data });

}
*/


var e = React.createElement;

var MultiSelect = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        options: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string,
            id: React.PropTypes.string
        }))
    },

    getInitialState: function () {
        return {
            selected: []
        };
    },

    attachAvailableRef: function (x) {
        this.available = x;
    },

    attachSelectedRef: function (x) {
        this.selected = x;
    },

    onAdd: function () {
        var options = this.props.options;
        var selected = this.state.selected;

        if (this.available) {
            var toAdd = Array.from(this.available.selectedOptions).map(
                function (x) { return options.find(function (o) { return o.id === x.value; }); }
            );
            this.setState({
                selected: ([].concat(selected).concat(toAdd)).filter(Boolean)
            });
        }
    },

    onRemove: function () {
        var selected = this.state.selected;

        if (this.selected) {
            var toRemove = Array.from(this.selected.selectedOptions).map(
                function (x) { return selected.find(function (o) {return o.id === x.value;}); }
            );
            this.setState({
                selected: selected.filter(function (x) { return x && !toRemove.includes(x);})
            });
        }
    },

    render: function () {
        var name = this.props.name;
        var options = this.props.options;
        var selected = this.state.selected;

        var available = options.filter(function (x) { return !selected.includes(x);});

        return e('div', {},
            e('select', {multiple: true, ref: this.attachAvailableRef},
                available.map(function (x) { return e('option', {key: x.id, value: x.id}, x.name); })),


            e('select', {id: 'added' , name: 'servers[]', multiple: true, selected: true, ref: this.attachSelectedRef},
                selected.map(function (x) { return e('option', {key: x.id, value: x.id, name: 'server'}, x.name); })),
            e('div', {id: 'add', onClick: this.onAdd}, 'add'),
            e('div', {id: 'rm', onClick: this.onRemove},'remove'),


            selected.map(function (x) {
                return e('input', {type:'hidden', key: x.id, value: x.id, name: 'server[]'});
            })
        );
    }
});

<?php
    $options = "[ ";
    $servers = array();

    $servers = $result ? explode(" ", $result['servers']) : $server_list;

    foreach($server_list as $s) {
        $options .= " { name: '".strtolower($s)."', id: '".strtolower($s)."' },";
    }

    $options .= " ]";
?>
var options = <?php echo( $options ) ?>

ReactDOM.render(e(MultiSelect, { options: options }), document.getElementById('multi-select-container'));
