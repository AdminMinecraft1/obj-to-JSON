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
        textureBuffer: [],
        normalBuffer: [],
        vertexIndicesBuffer: [],
    };
    this.polygons = [];


    return this;
}

var main = function (src) {

    var path = src.match(new RegExp('\/[^\/]*$', 'g'))[0],
        name = path.replace('/', '').match(new RegExp('[^\.]\\w*'))[0],
        type = path.replace('/', '').match(new RegExp('[^\.]\\w*$', 'g'))[0],
        mesh = new Mesh(),
        format = function (array, reg) {

            array.map(function (v0, i0) {
                array[i0] = v0
                    .match(reg)[0]
                    .split(/\s/g);

            });

            return array;
        },
        add = function (string, name, model) {
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
        createBuffers = function () {


        },
        clearMemory = function () {
            delete mesh.f;
            delete mesh.v;
            delete mesh.vt;
            delete mesh.vn;
            delete mesh.polygons;
        },
        sampleBuffers = function () {
            var idx = 0,
                keys = {},
                uv = null,
                u = null,
                v = null,
                key = null;

            mesh.f.map(function (v0, i0) {

                v0.map(function (v1, i1) {
                    uv = v1.split(/\/[^\/]*$/)[0].split('/');
                    v = mesh.v[uv[0] - 1].join();
                    u = mesh.vt[uv[1] - 1].join();
                    key = u + v;

                    if (!(key in keys)) {
                        keys[key] = idx;
                        mesh.VBOs.vertexIndicesBuffer.push(idx);

                        mesh.v[uv[0] - 1].map(function (v2) {
                            mesh.VBOs.vertexBuffer.push(parseFloat(v2));
                        });

                        mesh.vt[uv[1] - 1].map(function (v1) {
                            mesh.VBOs.textureBuffer.push(parseFloat(v1));
                        });

                        mesh.vn[v1.split('/')[2] - 1].map(function (v2) {
                            mesh.VBOs.normalBuffer.push(parseFloat(v2));
                        });

                        idx++;
                    } else {
                        mesh.VBOs.vertexIndicesBuffer.push(keys[key]);
                    }
                })

            });

            mesh.vItemSize = 3;
            mesh.vtItemSize = 2;
            mesh.vnItemSize = 3;

        }

    fs.readFile(src, function (error, data) {

        data = data.toString();

        add(data, 'v', mesh);
        add(data, 'vt', mesh);
        add(data, 'vn', mesh);
        add(data, 'f', mesh);

        sampleBuffers();
        createBuffers();
        clearMemory();


        mesh.name = name;
        mesh.src = src.replace(path, '') + '/' + name + '.json';


        fs.writeFile(mesh.src, JSON.stringify(mesh), function () {
        });

        console.log('Mesh exported to ' + mesh.src);

    });


}


module.exports = {
    export: main
};