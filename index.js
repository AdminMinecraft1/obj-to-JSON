/* obj-to-JSON - v1.0
 * https://github.com/sfiluyk/obgToJSON
 * Copyright (c) 2014  Sergey Filuyk Licensed GPL */
var fs = require('fs');

var Mesh = function Mesh() {
    this.name = '';
    this.src = '';
    this.v = [];
    this.vn = [];
    this.vt = [];
    this.f = [];
    this.vertices = [];

    return this
}

Mesh.prototype.get = function(a) {
    if (!a) {
        throw console.error('None such property')
    }
    return this[a];
}

Mesh.prototype.set = function(a, b) {
    if (!a) {
        throw console.error('None such property')
    }
    this[a] = b;
}

var main = function(src) {

    var path = src.match(new RegExp('\/[^\/]*$', 'g'))[0],
            name = path.replace('/', '').match(new RegExp('[^\.]\\w*'))[0],
            type = path.replace('/', '').match(new RegExp('[^\.]\\w*$', 'g'))[0],
            mesh = new Mesh(),
            stream = fs.createReadStream(src),
            format = function(array, reg) {

                array.map(function(v0, i0) {
                    array[i0] = v0.match(reg);
                });

                return array;
            },
            add = function(string, name, model) {
                var reg = new RegExp(name + '\\s.*\\r{0,1}\\n{0,1}', 'g');
                var array = string.match(reg);
                if (array !== null)
                {
                    model[name] = model[name]
                            .concat(format(
                                    array,
                                    new RegExp('[^' + name + '\\s*]+[\\w\/][^\\s]*', 'g')
                                    ));
                }
            };




    stream.on('data', function(line) {
        line = line.toString();

        add(line, 'v', mesh);
        add(line, 'vt', mesh);
        add(line, 'vn', mesh);
        add(line, 'f', mesh);


    })

    mesh.get('v').map(function(v0, i0) {
        v0.map(function(v1, i1) {
            if (v1.length) {
                mesh.get('vertices').push(parseFloat(v1));
            }
        })
    });



    mesh.set('name', name);
    mesh.set('src', src.replace(path, '') + '/' + name + '.json');


    stream.on('end', function() {
        fs.writeFile(mesh.get('src'), JSON.stringify(mesh), function() {

        })
    })

}


module.exports = {
    export: main
};