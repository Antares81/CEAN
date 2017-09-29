"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UniversityLibrarian = (function () {
    function UniversityLibrarian() {
    }
    return UniversityLibrarian;
}());
exports.UniversityLibrarian = UniversityLibrarian;
var ReferencieItem = (function () {
    function ReferencieItem() {
        console.log("Activaci\u00F3n de la clase abstracta");
    }
    ReferencieItem.prototype.printInfo = function () {
        return "Informaci\u00F3n de la referencia de biblioteca";
    };
    return ReferencieItem;
}());
ReferencieItem.department = "I+D";
var Magazine = (function (_super) {
    __extends(Magazine, _super);
    function Magazine() {
        return _super.call(this) || this;
    }
    Magazine.prototype.printInfoAbstract = function () {
        return "Info desde Magazine";
    };
    Magazine.prototype.printInfo = function () {
        var info = _super.prototype.printInfo;
        return info + " ** Derivada **";
    };
    Magazine.prototype.metodoPrivado = function () {
    };
    return Magazine;
}(ReferencieItem));
exports.Magazine = Magazine;
//export {UniversityLibrarian, Magazine};
//# sourceMappingURL=classes.js.map