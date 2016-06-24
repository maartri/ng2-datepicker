import { Component, OnInit, ElementRef, Provider, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/common";
import * as moment from "moment";

const months: Array<string> = [
	"January","February","March","April","May","June","July",
	"August","September","October","November","December"
];

const weeks: Array<string> = [
	"Su","Mo","Tu","We","Th","Fr","Sa"
];

const noop = () => { };

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => DatePicker),
        multi: true
    });

interface Calendar{
	moment_value : string,
	day: number,
	current_date: boolean
}

@Component({
	selector: 'datepicker',
	template: `
		<div class="col-md-2">
			<div class="dp-container">
				<div class="dp-input">
					<input type="text"
						   readonly
						   (click)="show = !show"
						   [(ngModel)]="value"

				    />
				</div>
				<div class="dp-calendar" *ngIf="days_calendar && show">
					<div class="date-control">
						<i class="fa fa-angle-left" aria-hidden="true" (click)="prevMonth()"></i>
						<span>{{ getMonth }} {{ getYear }}</span>
						<i class="fa fa-angle-right" aria-hidden="true" (click)="nextMonth()"></i>
					</div> 
					<span class="weeks" *ngFor="let week of weeks">{{ week }}</span>
					<div class="dp-calendar-container" *ngFor="let day of days_calendar" [ngClass]="{ currdate: day.current_date }" (click)="setDate(day.moment_value)">
						<span *ngIf="day.day!=null">{{ day.day }}</span>
						<span *ngIf="day.day==null"></span>
					</div>
					<div class="calendar-icon"><i class="fa fa-calendar" aria-hidden="true"></i></div>
				</div>
			</div>
		</div>
	`,
	styles: [`
		div.date-control { text-align: center; margin-bottom:10px; font-weight:bold;}
		div.date-control i { font-size:2em; position:absolute; }
		div.date-control i:hover{ cursor: pointer; color: #818181;}
		div.date-control i:first-child { left:5px; top:3px}
		div.date-control i:last-child { right:5px; top:3px }
		div.dp-container { width: 100%; position:relative; }
		div.calendar-icon {
		    margin-top: 1em;
		    padding: 0.5em 0 0.5em 0;
		    border-top: 1px solid black;
		    border-bottom: 1px solid black;
		    text-align: center;
		}
		div.dp-container div.dp-input input[type="text"] { width: 100%; }

		div.dp-container div.dp-calendar { 
			width: 19em;
		    position: absolute;
		    right: 0;
		    margin-top: 2px;
		    border: 1px solid #a9a9a9;
		    border-radius:4px;
		    padding: 0.5em;
		}
	 	span.weeks { font-weight: bolder; }
		div.dp-container div.dp-calendar div.dp-calendar-container, span.weeks {     
			display: inline-block;
		    width: 14%;
		    text-align: center;
		    padding: 0.2em;
		}
		div.dp-calendar-container:hover { cursor:pointer; }
		.currdate { background-color: rgb(90, 182, 78); border-radius: 4px; }
	`],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]	
})

export class DatePicker implements OnInit, ControlValueAccessor {
	date: any;
	days_calendar: Array<Calendar>;
	weeks = weeks;
	getMonth: string;
	getYear: string;
	show: boolean;

	_value: any;
	constructor(public elem: ElementRef){
	   let html = document.getElementsByTagName('html')[0];
	   html.addEventListener('click', (event) => {
            if (this.show && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                this.show = false;
            }
        }, false);
	}

	ngOnInit(){
		this.date = moment();
		this.drawCalendar(this.date); 
	}

	get value() 
	{
		return moment(this._value).format('MM/DD/YYYY');
	}

	drawCalendar(date: any){
		let num_days_per_month = date.clone().endOf('month').date();
		let num_days_before_firstday = date.set('date',1).day();
		let day_counter = 1;
		let currDate = moment().format('DD/MM/YYYY');

		this.days_calendar = [];
		while( num_days_before_firstday )
		{
			this.days_calendar.push({ moment_value: null, day: null, current_date: null });
			num_days_before_firstday--;
		}

		while( day_counter <=  num_days_per_month )
		{
			let _date = date.set('date', day_counter);
			this.days_calendar.push({ moment_value: _date.format(), day: day_counter, current_date: (currDate == _date.format('DD/MM/YYYY')) ? true : false });
			day_counter++;
		}

		this.getMonth = months[parseInt(date.format('MM'))-1];
		this.getYear = date.format('YYYY');
	}

	nextMonth()
	{
		this.date.add(1,'M');
		this.drawCalendar(this.date);
	}

	prevMonth()
	{
		this.date.subtract(1,'M');
		this.drawCalendar(this.date);
	}

	setDate(moment_value: any)
	{
		this._value = moment_value;
	}

	writeValue(obj: any)
	{
		this._value = obj;
	}

	registerOnChange(fn: any)
	{

	}

	registerOnTouched(fn: any)
	{

	}
}