var Material = function Material(name) {
    this.name = name || 'Simple Material';
    this.texture = '';
    this.Ka = 0;
    this.Kd = 0;
    this.Ks = 0;
    this.Ni = 0;
    this.Ns = 0;
}

Material.prototype.setKa = function (a) {
    this.Ka = a
}

Material.prototype.setKd = function (a) {
    this.Kd = a
}

Material.prototype.setKs = function (a) {
    this.Ks = a
}

Material.prototype.setNi = function (a) {
    this.Ni = a
}

Material.prototype.setNs = function (a) {
    this.Ns = a
}

Material.prototype.setTexture = function (a) {
    this.texture = a;
}

module.exports = Material;