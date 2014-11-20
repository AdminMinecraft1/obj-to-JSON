require('./utilities.js');

var Surface = require('./surface.js');

var Mesh = function Mesh(name, src) {
    this.name = name || 'Simple Mesh';
    this.src = src || 'none';
    this.v = [];
    this.vt = [];
    this.vn = [];
    this.surfaces = [];
}

Mesh.prototype.addVertex = function (a) {
    this.v.push(a);
}

Mesh.prototype.addVertexTexture = function (a) {
    this.vt.push(a);
}

Mesh.prototype.addVertexNormal = function (a) {
    this.vn.push(a);
}

Mesh.prototype.addSurface = function (name) {
    this.surfaces.push(new Surface(name));
}

Mesh.prototype.addFace = function (a) {
    this.surfaces.last().addFace(a);
}

Mesh.prototype.initVBOs = function (a) {
    this.surfaces.map(function(surface){
        surface.initVBOs(this);
    }.bind(this));
}

module.exports = Mesh;