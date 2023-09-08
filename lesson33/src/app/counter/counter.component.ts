import { CounterService } from './../counter.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  constructor(public readonly counterCounterService: CounterService) {
  }//на уровне сервиса

  @Input()
  set counter(value: number) {
    this.counterCounterService.setCounter(value); //на уровне сервиса
  }
  // counter: number = 0; //на уровне компоненты

  @Output()
  counterChanged = new EventEmitter<number>();

  onIncrementClick() {
    // this.counter = this.counter + 1; //на уровне компоненты
    // this.counterChanged.emit(this.counter) //на уровне компоненты
    this.counterCounterService.increment(); //на уровне сервиса
    this.counterChanged.emit(this.counterCounterService.getCounter()) //на уровне сервиса
  }
}
