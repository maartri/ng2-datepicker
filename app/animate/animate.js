"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var MyExpandoCmp = (function () {
    function MyExpandoCmp() {
    }
    MyExpandoCmp.prototype.close = function (event) {
        if (!this.hasClassClosed(event.target.classList)) {
            event.target.classList.add("closed");
        }
        else {
            event.target.classList.remove("closed");
            event.target.classList.add("opened");
        }
    };
    MyExpandoCmp.prototype.hasClassClosed = function (props) {
        var ifFound = false;
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var properties = props_1[_i];
            if (properties === "closed")
                ifFound = true;
        }
        if (ifFound)
            return true;
        else
            return false;
    };
    MyExpandoCmp = __decorate([
        core_1.Component({
            selector: 'my-expando',
            styles: ["\n    .slider {\n      overflow-y: hidden;\n      max-height: 500px;\n      height:600px;\n      width:20%;\n      background-color:gray;\n      transition-property: all;\n      transition-duration: .5s;\n      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);\n    }\n\n    .slider.closed {\n      max-height: 20px;\n    }\n\n    .slider.opened {\n      height:600px;\n    }\n  "],
            template: "\n     <div class=\"slider\" (click)=\"close($event)\">Some content here....</div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MyExpandoCmp);
    return MyExpandoCmp;
}());
exports.MyExpandoCmp = MyExpandoCmp;
//# sourceMappingURL=animate.js.map