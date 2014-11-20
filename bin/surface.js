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
}

Surface.prototype.addFace = function (a) {
    this.faces.push(a);
}

Surface.prototype.initVBOs = function (mesh) {
    var keys = {};
    var i = 0;

    this.faces.map(function (face, index) {

        var face = face.split(/\s/).map(function (v0) {

            return v0.split('/').map(function (int) {
                return parseInt(int)
            });

        });

        this.faces[index] = face;

        face.map(function (v) {

            var key = v.join('/');

            if (!(key in keys)) {

                keys[key] = i;

                this.VBOs.vertexIndicesBuffer.push(i);

                mesh.v[v[0] - 1].map(function (float) {
                    this.VBOs.vertexBuffer.push(float);
                }.bind(this));

                mesh.vt[v[1] - 1].map(function (float) {
                    this.VBOs.textureBuffer.push(float);
                }.bind(this));

                mesh.vn[v[2] - 1].map(function (float) {
                    this.VBOs.normalBuffer.push(float);
                }.bind(this));

                i++;

            } else {

                this.VBOs.vertexIndicesBuffer.push(keys[key]);

            }

        }.bind(this))
    }.bind(this));
}

Surface.prototype.getVerticesTexture = function (a) {
    this.faces.push(a);
}

Surface.prototype.getVerticesNormal = function (a) {
    this.faces.push(a);
}

module.exports = Surface;