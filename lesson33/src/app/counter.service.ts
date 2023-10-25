import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private counter: number = 0;

  constructor() { }

  setCounter(value: number) {
    this.counter = value;
  }

  getCounter() {
    return this.counter;
  }

  increment() {
    this.counter++
  }
}
