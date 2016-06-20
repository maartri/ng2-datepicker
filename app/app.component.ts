import { Component } from '@angular/core';
import { DatePicker }  from './ng2-datepicker/datepicker.component';

@Component({
  selector: 'my-app',
  template: `<h1>My First Angular 2 App</h1>
  	<datepicker></datepicker>
  `,
  directives:[DatePicker]
})
export class AppComponent { }
