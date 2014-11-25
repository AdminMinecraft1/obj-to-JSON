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
    if ((this.surfaces.last().faces.length / 3) >= this.surfaces.last().MAX_INDICES) {
        this.addSurface(new Surface(this.surfaces.last().name));
    }
    this.surfaces.last().addFace(a);
}

Mesh.prototype.initVBOs = function (a) {

    this.surfaces.map(function (surface) {
        surface.initVBOs(this);
    }.bind(this));

    this.GC();

}

Mesh.prototype.validate = function (a) {
    var surfaces = [];

    this.surfaces.map(function (surface) {

        surface.validate().map(function (v) {
            surfaces.push(v);
        });

    }.bind(this));

    this.surfaces = surfaces;


}

Mesh.prototype.GC = function () {

    this.surfaces.map(function (surface) {
        surface.GC();
    }.bind(this));

    delete this.v;
    delete this.vt;
    delete this.vn;
}


module.exports = Mesh;