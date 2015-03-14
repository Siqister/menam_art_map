var artist, i, id, key, nodes, text, value, _i, _len, _links, _nodes, _ref, _ref1, _ref2,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

id = 0;

this.artistNodes = [];

nodes = [];

_ref = this.collection.models;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  artist = _ref[_i];
  nodes.push(artist.attributes);
  this.artistNodes.push({
    'name': artist.attributes.source,
    'id': id,
    'group': artist.attributes.group
  });
  id = id + 1;
}

_links = nodes;

_links.sort(function(a, b) {
  if (a.source > b.source) {
    return 1;
  } else if (a.source < b.source) {
    return -1;
  } else {
    if (a.target > b.target) {
      return 1;
    }
    if (a.target < b.target) {
      return -1;
    } else {
      return 0;
    }
  }
});

console.log("_links", _links);

i = 0;

while (i < _links.length) {
  if (i !== 0 && _links[i].source === _links[i - 1].source && _links[i].target === _links[i - 1].target) {
    _links[i].linknum = _links[i - 1].linknum + 1;
  } else {
    _links[i].linknum = 1;
  }
  i++;
}

_nodes = {};

_links.forEach(function(link) {
  link.source = _nodes[link.source] || (_nodes[link.source] = {
    name: link.source,
    value: 1
  });
  link.target = _nodes[link.target] || (_nodes[link.target] = {
    name: link.target,
    group: link.group,
    lat: link.lat,
    long: link.long,
    value: 1
  });
});

d3.values(_nodes).forEach((function(_this) {
  return function(sourceNode) {
    _links.forEach(function(link) {
      if (link.source.name === sourceNode.name && link.target.name !== sourceNode.name) {
        link.target.value += 1;
      }
    });
  };
})(this));

console.log("_nodes1", _nodes);

this._nodes = _nodes;

text = [];

console.log("_nodes", this._nodes);

_ref1 = this._nodes;
for (key in _ref1) {
  value = _ref1[key];
  if (_ref2 = value.group, __indexOf.call([1, 2, 3, 4], _ref2) >= 0) {

  } else {
    text.push({
      name: value.name,
      id: value.index,
      group: value.group
    });
  }
}

// ---
// generated by coffee-script 1.9.0