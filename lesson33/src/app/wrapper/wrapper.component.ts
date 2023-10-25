import { CounterComponent } from './../counter/counter.component';
import { Component, ContentChild } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  @ContentChild(CounterComponent)
  counterComponent: CounterComponent | null = null;

  onClick() {
    this.counterComponent?.onIncrementClick()
  }
}
