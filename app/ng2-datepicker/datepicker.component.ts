import { Component, OnInit } from "@angular/core";


@Component({
	selector: 'datepicker',
	template: `
		<div class="dp-container">
			<div class="dp-input">
				<input type="text"
					   readonly
			    />
			</div>
			<div class="dp-calendar">

			</div>
		</div>
	`,
})

export class DatePicker implements OnInit { 
	constructor(){

	}
	ngOnInit(){
		moment;

	}
}