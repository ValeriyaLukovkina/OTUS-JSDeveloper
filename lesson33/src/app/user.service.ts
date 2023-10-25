import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(@Inject('userName') private readonly userName: string) {}

  getName() {
    return 'Lera';
  }

  getUserName() {
    return this.userName;
  }
}
