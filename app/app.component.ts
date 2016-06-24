import { Component } from '@angular/core';
import { DatePicker }  from './ng2-datepicker/datepicker.component';

import { MyExpandoCmp } from './animate/animate';

@Component({
  selector: 'my-app',
  template: `
  	<div class="container-fluid">
  		 <my-expando></my-expando>
  	</div>
  `,
  directives:[MyExpandoCmp,DatePicker]
})
export class AppComponent {

	date: any;
	constructor() 
	{
		this.date = new Date();
	}
}
