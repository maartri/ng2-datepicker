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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var moment = require("moment");
var months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
var weeks = [
    "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
];
var noop = function () { };
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return DatePicker; }),
    multi: true
});
var DatePicker = (function () {
    function DatePicker(elem) {
        var _this = this;
        this.elem = elem;
        this.weeks = weeks;
        var html = document.getElementsByTagName('html')[0];
        html.addEventListener('click', function (event) {
            if (_this.show && event.target && _this.elem.nativeElement !== event.target && !_this.elem.nativeElement.contains(event.target)) {
                _this.show = false;
            }
        }, false);
    }
    DatePicker.prototype.ngOnInit = function () {
        this.date = moment();
        this.drawCalendar(this.date);
    };
    Object.defineProperty(DatePicker.prototype, "value", {
        get: function () {
            return moment(this._value).format('MM/DD/YYYY');
        },
        enumerable: true,
        configurable: true
    });
    DatePicker.prototype.drawCalendar = function (date) {
        var num_days_per_month = date.clone().endOf('month').date();
        var num_days_before_firstday = date.set('date', 1).day();
        var day_counter = 1;
        var currDate = moment().format('DD/MM/YYYY');
        this.days_calendar = [];
        while (num_days_before_firstday) {
            this.days_calendar.push({ moment_value: null, day: null, current_date: null });
            num_days_before_firstday--;
        }
        while (day_counter <= num_days_per_month) {
            var _date = date.set('date', day_counter);
            this.days_calendar.push({ moment_value: _date.format(), day: day_counter, current_date: (currDate == _date.format('DD/MM/YYYY')) ? true : false });
            day_counter++;
        }
        this.getMonth = months[parseInt(date.format('MM')) - 1];
        this.getYear = date.format('YYYY');
    };
    DatePicker.prototype.nextMonth = function () {
        this.date.add(1, 'M');
        this.drawCalendar(this.date);
    };
    DatePicker.prototype.prevMonth = function () {
        this.date.subtract(1, 'M');
        this.drawCalendar(this.date);
    };
    DatePicker.prototype.setDate = function (moment_value) {
        this._value = moment_value;
    };
    DatePicker.prototype.writeValue = function (obj) {
        this._value = obj;
    };
    DatePicker.prototype.registerOnChange = function (fn) {
    };
    DatePicker.prototype.registerOnTouched = function (fn) {
    };
    DatePicker = __decorate([
        core_1.Component({
            selector: 'datepicker',
            template: "\n\t\t<div class=\"col-md-2\">\n\t\t\t<div class=\"dp-container\">\n\t\t\t\t<div class=\"dp-input\">\n\t\t\t\t\t<input type=\"text\"\n\t\t\t\t\t\t   readonly\n\t\t\t\t\t\t   (click)=\"show = !show\"\n\t\t\t\t\t\t   [(ngModel)]=\"value\"\n\n\t\t\t\t    />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"dp-calendar\" *ngIf=\"days_calendar && show\">\n\t\t\t\t\t<div class=\"date-control\">\n\t\t\t\t\t\t<i class=\"fa fa-angle-left\" aria-hidden=\"true\" (click)=\"prevMonth()\"></i>\n\t\t\t\t\t\t<span>{{ getMonth }} {{ getYear }}</span>\n\t\t\t\t\t\t<i class=\"fa fa-angle-right\" aria-hidden=\"true\" (click)=\"nextMonth()\"></i>\n\t\t\t\t\t</div> \n\t\t\t\t\t<span class=\"weeks\" *ngFor=\"let week of weeks\">{{ week }}</span>\n\t\t\t\t\t<div class=\"dp-calendar-container\" *ngFor=\"let day of days_calendar\" [ngClass]=\"{ currdate: day.current_date }\" (click)=\"setDate(day.moment_value)\">\n\t\t\t\t\t\t<span *ngIf=\"day.day!=null\">{{ day.day }}</span>\n\t\t\t\t\t\t<span *ngIf=\"day.day==null\"></span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t",
            styles: ["\n\t\tdiv.date-control { text-align: center; margin-bottom:10px; font-weight:bold;}\n\t\tdiv.date-control i { font-size:2em; position:absolute; }\n\t\tdiv.date-control i:hover{ cursor: pointer; color: #818181;}\n\t\tdiv.date-control i:first-child { left:5px; top:3px}\n\t\tdiv.date-control i:last-child { right:5px; top:3px }\n\t\tdiv.dp-container { width: 100%; position:relative; }\n\n\t\tdiv.dp-container div.dp-input input[type=\"text\"] { width: 100%; }\n\n\t\tdiv.dp-container div.dp-calendar { \n\t\t\twidth: 19em;\n\t\t    position: absolute;\n\t\t    right: 0;\n\t\t    margin-top: 2px;\n\t\t    border: 1px solid #a9a9a9;\n\t\t    border-radius:4px;\n\t\t    padding: 0.5em;\n\t\t}\n\t \tspan.weeks { font-weight: bolder; }\n\t\tdiv.dp-container div.dp-calendar div.dp-calendar-container, span.weeks {     \n\t\t\tdisplay: inline-block;\n\t\t    width: 14%;\n\t\t    text-align: center;\n\t\t    padding: 0.2em;\n\t\t}\n\t\tdiv.dp-calendar-container:hover { cursor:pointer; }\n\t\t.currdate { background-color: rgb(90, 182, 78); border-radius: 4px; }\n\t"],
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DatePicker);
    return DatePicker;
}());
exports.DatePicker = DatePicker;
//# sourceMappingURL=datepicker.component.js.map