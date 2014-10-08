'use strict';

var fs = require('fs');

var Mesh = function Mesh() {
    this.name = '';
    this.src = '';
    this.v = [];
    this.vn = [];
    this.vt = [];
    this.f = [];
    this.origin = [];
    this.VBOs = {
        vertexBuffer: [],
        vertexNormalBuffer: [],
        vertexTextureBuffer: [],
        vertexIndicesBuffer: [],
        textureIndicesBuffer: [],
        normalIndicesBuffer: []
    }

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
        createBuffer = function(mesh, array, buffer) {

            var length = mesh[array].length;

            for (var i = 0; i < length; i++) {
                mesh.VBOs[buffer] =
                    mesh
                    .VBOs[buffer]
                    .concat(mesh[array][i]);
            };

            mesh.VBOs[buffer] =
                mesh
                .VBOs[buffer]
                .map(function(v, i) {
                    return parseFloat(v);
                })


        };

    fs.readFile(src, function(error, data) {
        data = data.toString();

        add(data, 'v', mesh);
        add(data, 'vt', mesh);
        add(data, 'vn', mesh);
        add(data, 'f', mesh);

        mesh.f.map(function(f0, i0) {
            var length = f0.length < 3 ? f0.length : 3,
                vidx = mesh.VBOs.vertexIndicesBuffer,
                vnidx = mesh.VBOs.normalIndicesBuffer,
                vtidx = mesh.VBOs.textureIndicesBuffer,
                indices;

            for (var i = 0; i < length; i++) {
                indices = f0[i] ? f0[i].split('/') : [];
                indices[0] && vidx.push(parseInt(indices[0]));
                indices[1] && vtidx.push(parseInt(indices[1]));
                indices[2] && vnidx.push(parseInt(indices[2]));
            }

        });

        createBuffer(mesh, 'v', 'vertexBuffer');
        createBuffer(mesh, 'vn', 'vertexNormalBuffer');
        createBuffer(mesh, 'vt', 'vertexTextureBuffer');

        mesh.name = name;
        mesh.src = src.replace(path, '') + '/' + name + '.json';

        fs.writeFile(mesh.src, JSON.stringify(mesh), function() {});
    });


}


module.exports = {
    export: main
};