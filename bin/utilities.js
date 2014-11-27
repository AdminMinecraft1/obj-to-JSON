String.prototype.isObject = function () {
    return this.indexOf('o ') === 0;
}

String.prototype.isFace = function () {
    return this.indexOf('f ') === 0;
}

String.prototype.isVertex = function () {
    return this.indexOf('v ') === 0;
}

String.prototype.isTexture = function () {
    return this.indexOf('vt ') === 0;
}

String.prototype.isNormal = function () {
    return this.indexOf('vn ') === 0;
}

String.prototype.isMaterial = function () {
    return this.indexOf('usemtl ') === 0;
}

String.prototype.isMaterialFile = function () {
    return this.indexOf('mtllib ') === 0;
}

String.prototype.isNewMaterial = function () {
    return this.indexOf('newmtl ') === 0;
}

String.prototype.isKa = function () {
    return this.indexOf('Ka ') === 0;
}

String.prototype.isKd = function () {
    return this.indexOf('Kd ') === 0;
}

String.prototype.isKs = function () {
    return this.indexOf('Ks ') === 0;
}

String.prototype.isNs = function () {
    return this.indexOf('Ns ') === 0;
}

String.prototype.isNi = function () {
    return this.indexOf('Ni ') === 0;
}

String.prototype.isd = function () {
    return this.indexOf('d ') === 0;
}

Array.prototype.last = function () {
    return this[this.length - 1];
}

Array.prototype.max = function () {
    return Math.max.apply(this,this);
}
