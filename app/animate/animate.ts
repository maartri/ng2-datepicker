import {Component} from '@angular/core';

@Component({
  selector: 'my-expando',
  styles: [`
    .slider {
      overflow-y: hidden;
      max-height: 500px;
      height:600px;
      width:20%;
      background-color:gray;
      transition-property: all;
      transition-duration: .5s;
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .slider.closed {
      max-height: 20px;
    }

    .slider.opened {
      height:600px;
    }
  `],
  template: `
     <div class="slider" (click)="close($event)">Some content here....</div>
  `
})
export class MyExpandoCmp {
  close(event: any)
  {
    if(!this.hasClassClosed(event.target.classList))
    {
      event.target.classList.add("closed");
    }
    else
    {
      event.target.classList.remove("closed");
      event.target.classList.add("opened");
    }
    
  }

  hasClassClosed(props: Array<string>) : boolean 
  {
    let ifFound = false;
    for(var properties of props){
      if (properties === "closed")
        ifFound = true;
    }

    if(ifFound)
      return true;
    else 
      return false;
  }
}
