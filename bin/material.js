var Material = function Material(name) {
    this.name = name || 'Simple Material';
    this.Ka = 0;
    this.Kd = 0;
    this.Ks = 0;
    this.Ni = 0;
    this.Ns = 0;
    this.d = 0;
}

Material.prototype.setKa = function (a) {
    this.Ka = a.split(/\s/).map(function (float) {
        return parseFloat(float)
    });
}

Material.prototype.setKd = function (a) {
    this.Kd = a.split(/\s/).map(function (float) {
        return parseFloat(float)
    });
}

Material.prototype.setKs = function (a) {
    this.Ks = a.split(/\s/).map(function (float) {
        return parseFloat(float)
    });
}

Material.prototype.setNi = function (a) {
    this.Ni = parseFloat(a);
}

Material.prototype.setNs = function (a) {
    this.Ns = parseFloat(a);
}

Material.prototype.setd = function (a) {
    this.d = parseFloat(a);
}

module.exports = Material;