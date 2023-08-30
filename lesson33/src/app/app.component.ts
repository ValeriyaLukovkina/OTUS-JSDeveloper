import { UserService } from './user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lesson33';

  text: string | undefined

  classes = {'red': false, 'blue': false};

  appInputValue = 0;

  hide = true;

  constructor(public userService: UserService) {
  }

  onToggle() {
    this.hide = !this.hide;
  }

  onClick() {
    console.log(this.text)
  }

  onIncrement() {
    this.appInputValue++;
  }

  onChangeColor(color: 'red' | 'blue') {
    if (color === 'blue') {
      this.classes[color] = true;
      this.classes['red'] = false;
    }

    if (color === 'red') {
      this.classes[color] = true;
      this.classes['blue'] = false;
    }
  }
}
