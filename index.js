'use strict';

var fs = require('fs');

var Mesh = function Mesh() {
    this.name = '';
    this.src = '';
    this.v = [];
    this.vn = [];
    this.vt = [];
    this.f = [];
    this.vertices = [];
    this.indices = {
        v: [],
        vn: [],
        vt: []
    }

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
                    if(v0.match(reg) === null){
                        //console.log(v0)
                    }
                    array[i0] = v0.match(reg);
                });

                return array;
            },
            add = function(string, name, model) {
                var reg = new RegExp(name + '{1}\\s+[-]?\\d{1,}.*\\r{0,}\\n{0,}', 'g');
                var array = string.match(reg);
               
                if (array !== null)
                {
                    console.log(array)
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





    mesh.set('name', name);
    mesh.set('src', src.replace(path, '') + '/' + name + '.json');


    stream.on('end', function() {

        mesh.get('v').map(function(v0, i0) {
            v0.map(function(v1, i1) {
                if (v1.length) {
                    mesh.get('vertices').push(parseFloat(v1));
                }
            });
        });


        mesh.get('f').map(function(p0, i0) {
            var length = 3,
                    vidx = mesh.get('indices').v,
                    vnidx = mesh.get('indices').vn,
                    vtidx = mesh.get('indices').vt,
                    indices;

            if (p0.length < length)
            {
                length = p0.length;
            }

            for (var i = 0; i < length; i++)
            {
                indices = p0[i] ? p0[i].split('/') : [];

                indices[0] && vidx.push(parseInt(indices[0]));
                indices[1] && vtidx.push(parseInt(indices[1]));
                indices[2] && vnidx.push(parseInt(indices[2]));
            }





        })

        fs.writeFile(mesh.get('src'), JSON.stringify(mesh), function() {

        })
    })

}


module.exports = {
    export: main
};