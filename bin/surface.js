var Surface = function Surface(name) {
    this.name = name || 'Simple Surface';
    this.faces = [];
    this.VBOs = {
        vertexIndicesBuffer: [],
        vertexBuffer: [],
        textureBuffer: [],
        normalBuffer: []
    }
    this.VERTEX_SIZE = 3;
    this.VERTEX_TEXTURE_SIZE = 2;
    this.VERTEX_NORMAL_SIZE = 3;
    this.MAX_INDICES = 65535;
}

Surface.prototype.addFace = function(a) {
    this.faces.push(a);
}

Surface.prototype.initVBOs = function(mesh) {
    var keys = {};
    var i = 0;

    this.faces.map(function(face, index) {

        var face = face.split(/\s/).map(function(v0) {

            return v0.split('/').map(function(int) {
                return parseInt(int)
            });

        });

        this.faces[index] = face;

        face.map(function(v) {

            var key = v.join('/');

            if (!(key in keys)) {

                keys[key] = i;

                this.VBOs.vertexIndicesBuffer.push(i);

                mesh.v[v[0] - 1].map(function(float) {
                    this.VBOs.vertexBuffer.push(float);
                }.bind(this));

                mesh.vt[v[1] - 1].map(function(float) {
                    this.VBOs.textureBuffer.push(float);
                }.bind(this));

                mesh.vn[v[2] - 1].map(function(float) {
                    this.VBOs.normalBuffer.push(float);
                }.bind(this));

                i++;

            } else {

                this.VBOs.vertexIndicesBuffer.push(keys[key]);

            }

        }.bind(this))
    }.bind(this));
}

Surface.prototype.getVerticesTexture = function(a) {
    this.faces.push(a);
}

Surface.prototype.split = function() {

    var surfaces = [],
        length = this.VBOs.vertexIndicesBuffer.length,
        remain = length % this.MAX_INDICES,
        count = (length - remain) / this.MAX_INDICES;



    for (var i = 0; i < count; i += this.MAX_INDICES) {

        var surface = new Surface(this.name);



        for (var j = i * this.MAX_INDICES; j < ((i + 1) * this.MAX_INDICES); j++) {


            var old_i = this.VBOs.vertexIndicesBuffer[j];

            var new_i = this.MAX_INDICES < old_i ? old_i / count : old_i;


            surface.VBOs.vertexIndicesBuffer.push(new_i);

            for (var v = 0; v < this.VERTEX_SIZE; v++) {
                surface
                    .VBOs
                    .vertexBuffer[new_i * this.VERTEX_SIZE + v] = this.VBOs.vertexBuffer[old_i * this.VERTEX_SIZE + v];
            }

            for (var vt = 0; vt < this.VERTEX_TEXTURE_SIZE; vt++) {
                surface
                    .VBOs
                    .textureBuffer[new_i * this.VERTEX_TEXTURE_SIZE + vt] = this.VBOs.textureBuffer[old_i * this.VERTEX_TEXTURE_SIZE + vt];
            }

            for (var vn = 0; vn < this.VERTEX_NORMAL_SIZE; vn++) {
                surface
                    .VBOs
                    .normalBuffer[new_i * this.VERTEX_NORMAL_SIZE + vn] = this.VBOs.normalBuffer[old_i * this.VERTEX_NORMAL_SIZE + vn];
            }

        }

        surfaces.push(surface);
    }

    if (remain) {

        var surface = new Surface(this.name);



        for (var j = length - remain; j < length; j++) {


            var old_i = this.VBOs.vertexIndicesBuffer[j];

            var new_i = this.MAX_INDICES < old_i ? old_i / count : old_i;


            surface.VBOs.vertexIndicesBuffer.push(new_i);

            for (var v = 0; v < this.VERTEX_SIZE; v++) {
                surface
                    .VBOs
                    .vertexBuffer[new_i * this.VERTEX_SIZE + v] = this.VBOs.vertexBuffer[old_i * this.VERTEX_SIZE + v];
            }

            for (var vt = 0; vt < this.VERTEX_TEXTURE_SIZE; vt++) {
                surface
                    .VBOs
                    .textureBuffer[new_i * this.VERTEX_TEXTURE_SIZE + vt] = this.VBOs.textureBuffer[old_i * this.VERTEX_TEXTURE_SIZE + vt];
            }

            for (var vn = 0; vn < this.VERTEX_NORMAL_SIZE; vn++) {
                surface
                    .VBOs
                    .normalBuffer[new_i * this.VERTEX_NORMAL_SIZE + vn] = this.VBOs.normalBuffer[old_i * this.VERTEX_NORMAL_SIZE + vn];
            }

        }

        surfaces.push(surface);
    }

    return surfaces;
}

Surface.prototype.validate = function() {

    if (this.MAX_INDICES < this.VBOs.vertexBuffer.length) {
        return this.split();
    } else {
        return [this];
    }
}

Surface.prototype.getVerticesNormal = function(a) {
    this.faces.push(a);
}

Surface.prototype.GC = function(a) {
    delete this.faces;
}

module.exports = Surface;