'use strict';

var fs = require('fs');

var Mesh = function Mesh() {
    this.name = '';
    this.src = '';
    // this.v = [];
    // this.vn = [];
    // this.vt = [];
    // this.f = [];
    // this.VBOs = {
    //     vertexBuffer: [],
    //     textureBuffer: [],
    //     normalBuffer: [],
    //     vertexIndicesBuffer: [],
    // };
    // this.polygons = [];
}

var main = function(src) {

    var path = src.match(new RegExp('\/[^\/]*$', 'g'))[0],
        name = path.replace('/', '').match(new RegExp('[^\.]\\w*'))[0],
        type = path.replace('/', '').match(new RegExp('[^\.]\\w*$', 'g'))[0],
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


        },
        clearMemory = function() {
            delete mesh.f;
            delete mesh.v;
            delete mesh.vt;
            delete mesh.vn;
            delete mesh.polygons;
        },
        sampleBuffers = function() {
            var idx = 0,
                keys = {},
                uv = null,
                u = null,
                v = null,
                key = null;

            mesh.f.map(function(v0, i0) {

                v0.map(function(v1, i1) {
                    uv = v1.split(/\/[^\/]*$/)[0].split('/');
                    v = mesh.v[uv[0] - 1].join();
                    u = mesh.vt[uv[1] - 1].join();
                    key = u + v;

                    if (!(key in keys)) {
                        keys[key] = idx;
                        mesh.VBOs.vertexIndicesBuffer.push(idx);

                        mesh.v[uv[0] - 1].map(function(v2) {
                            mesh.VBOs.vertexBuffer.push(parseFloat(v2));
                        });

                        mesh.vt[uv[1] - 1].map(function(v1) {
                            mesh.VBOs.textureBuffer.push(parseFloat(v1));
                        });

                        mesh.vn[v1.split('/')[2] - 1].map(function(v2) {
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

    fs.readFile(src, function(error, data) {

        //data = data.toString();

        var lines = data.toString().split(/\n/);

        var mesh = new Mesh();

        var objects = [];
        var vertices = [];
        var textures = [];
        var normals = [];
        var faces = [];
        var materials = [];

        var last = function(a) {
            return a[a.length - 1];
        };

        var vertices = [];

        lines.map(function(line, i) {
             
            

            if (line.indexOf('o ') === 0) {
                objects.push({
                    name: line.split(/o\s/)[1],
                    type: 'object'
                });

                vertices.push([]);
                textures.push([]);
                normals.push([]);
            }

            if (line.indexOf('usemtl ') === 0) {
                materials.push({
                    name: line.split(/usemtl\s/)[1],
                    type: 'material'
                });
                faces.push([]);
            }

             if (line.indexOf('f ') === 0) {
                last(faces).push(
                    line.split(/f\s/)[1]
                )
            }

            if (line.indexOf('v ') === 0) {
                last(vertices).push(
                    line.split(/v\s/)[1]
                    .split(/\s/)
                    .map(function(float) {
                        return parseFloat(float)
                    })
                )
            }

            if (line.indexOf('vt ') === 0) {
                last(textures).push(
                    line.split(/vt\s/)[1]
                    .split(/\s/)
                    .map(function(float) {
                        return parseFloat(float)
                    })
                )
            }

            if (line.indexOf('vn ') === 0) {
                last(normals).push(
                    line.split(/vn\s/)[1]
                    .split(/\s/)
                    .map(function(float) {
                        return parseFloat(float)
                    })
                )
            }
        })

       

        // add(data, 'v', mesh);
        // add(data, 'vt', mesh);
        // add(data, 'vn', mesh);
        // add(data, 'f', mesh);

        // sampleBuffers();
        // createBuffers();
        // clearMemory();

        mesh.vertices = vertices;
        mesh.textures = textures;
        mesh.normals = normals;
        mesh.faces = faces;
        mesh.materials = materials;
        mesh.objects = objects;


        mesh.name = name;
        mesh.src = src.replace(path, '') + '/' + name + '.json';


        fs.writeFile(mesh.src, JSON.stringify(mesh), function() {});

        console.log('Mesh exported to ' + mesh.src);

    });


}


module.exports = {
    export: main
};