'use strict';

var fs = require('fs');

var Mesh = function Mesh() {
    this.name = '';
    this.src = '';
    this.v = [];
    this.vn = [];
    this.vt = [];
    this.f = [];
    this.VBOs = {
        vertexBuffer: [],
        texBuffer:[],
        normalBuffer:[],
        vertexIndicesBuffer: [],
    };
    this.polygons = [];


    return this;
}

var main = function(src) {

    var path = src.match(new RegExp('\/[^\/]*$', 'g'))[0],
        name = path.replace('/', '').match(new RegExp('[^\.]\\w*'))[0],
        type = path.replace('/', '').match(new RegExp('[^\.]\\w*$', 'g'))[0],
        mesh = new Mesh(),
        format = function(array, reg) {

            array.map(function(v0, i0) {
                array[i0] = v0
                    .match(reg)[0]
                    .split(/\s/g);

            });

            return array;
        },
        add = function(string, name, model) {
            var reg = new RegExp(name + '{1}\\s+[-]?\\d{1,}.*\\r{0,}\\n{0,}', 'g');
            var array = string.match(reg);

            if (array !== null) {
                model[name] = model[name]
                    .concat(format(
                        array,
                        new RegExp('[^' + name + '\\s*][-]?.*[^\\s*]', 'g')
                    ));
            }
        },
        createBuffers = function() {
            mesh.polygons.map(function(v0) {
                var idx = v0.split('/').map(function(v1,i1){
                    return parseInt(v1);
                });

                mesh.v[idx[0]-1].map(function(v1) {
                    mesh.VBOs.vertexBuffer.push(parseFloat(v1));
                })

                mesh.vt[idx[1]-1].map(function(v1,i1) {
                    mesh.VBOs.texBuffer.push(parseFloat(v1));
                })

                mesh.vn[idx[2]-1].map(function(v1) {
                    mesh.VBOs.normalBuffer.push(parseFloat(v1));
                })

            })
        },
        sampleBuffers = function() {
            var idx = 0,
                keys = {},
                idx = 0;

            mesh.f.map(function(v0, i0) {
                v0.map(function(v1, i1) {
                    if (!keys[v1]) {
                        keys[v1] = idx;
                        idx++;
                    }
                })
            });


            mesh.f.map(function(v0, i0) {
                v0.map(function(v1, i1) {
                    mesh.VBOs.vertexIndicesBuffer.push(keys[v1]-1);
                });
            });

            for (var key in keys) {
                mesh.polygons.push(key);
            }
        }

    fs.readFile(src, function(error, data) {

        data = data.toString();

        add(data, 'v', mesh);
        add(data, 'vt', mesh);
        add(data, 'vn', mesh);
        add(data, 'f', mesh);

        sampleBuffers();
        createBuffers();


        mesh.name = name;
        mesh.src = src.replace(path, '') + '/' + name + '.json';


        fs.writeFile(mesh.src, JSON.stringify(mesh), function() {});

        console.log('Mesh exported to ' + mesh.src);

    });


}


module.exports = {
    export: main
};