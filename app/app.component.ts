import { Component, OnInit } from '@angular/core';
import { DatePicker }  from './ng2-datepicker/datepicker.component';
import * as moment from "moment";

@Component({
  selector: 'my-app',
  template: `<h1>My First Angular 2 App</h1>
  	<datepicker></datepicker>
  `,
  directives:[DatePicker]
})
export class AppComponent implements OnInit {
	date:any;

	constructor(){
		
	}

	ngOnInit(){
		this.date = moment();
		this.drawCalendar(this.date);
	}

	drawCalendar(date: any){
		date;
	}
}
