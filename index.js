'use strict';
require('./bin/utilities.js');


var fs = require('fs');
var Mesh = require('./bin/mesh.js');

var mesh = new Mesh();

var main = function (src) {

    var path = src.match(new RegExp('\/[^\/]*$', 'g'))[0],
        name = path.replace('/', '').match(new RegExp('[^\.]\\w*'))[0];

    fs.readFile(src, function (error, data) {

        var lines = data.toString().split(/\n/);


        var last = function (a) {
            return a[a.length - 1];
        };

        lines.map(function (line, i) {


            if (line.isObject()) {
                mesh.name = line.split(/o\s/)[1];
            }

            if (line.isMaterial()) {
                mesh.addSurface(line.split(/usemtl\s/)[1]);
            }

            if (line.isFace()) {
                mesh.addFace(line.split(/f\s/)[1]);
            }

            if (line.isVertex()) {
                mesh.addVertex(line.split(/v\s/)[1]
                    .split(/\s/)
                    .map(function (float) {
                        return parseFloat(float)
                    }));
            }

            if (line.isTexture()) {
                mesh.addVertexTexture(line.split(/vt\s/)[1]
                    .split(/\s/)
                    .map(function (float) {
                        return parseFloat(float)
                    }))
            }

            if (line.isNormal()) {
                mesh.addVertexNormal(line.split(/vn\s/)[1]
                    .split(/\s/)
                    .map(function (float) {
                        return parseFloat(float)
                    }))
            }
        })

        mesh.initVBOs();
        mesh.validate();


        mesh.file_name = name + '.json';
        mesh.src = src.replace(path, '') + '/' + name + '.json';


        fs.writeFile(mesh.src, JSON.stringify(mesh), function () {
        });

        console.log('Mesh exported to ' + mesh.src);

    });


}


module.exports = {
    export: main
};