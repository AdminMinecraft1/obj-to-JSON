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

Array.prototype.last = function () {
    return this[this.length - 1];
}
