import { Component } from '@angular/core';
import { DatePicker }  from './ng2-datepicker/datepicker.component';


@Component({
  selector: 'my-app',
  template: `<h1>My First Angular 2 App</h1>
  	<div class="container-fluid">
  		<datepicker [(ngModel)]="date"></datepicker>
  	</div>
  `,
  directives:[DatePicker]
})
export class AppComponent {

	date: any;
	constructor() 
	{
		this.date = new Date();
	}
}
