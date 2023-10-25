import { UserService } from './user.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LifeCyclesComponent } from './life-cycles/life-cycles.component';
import { RolesComponent } from './roles/roles.component';
import { CounterComponent } from './counter/counter.component';
import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LifeCyclesComponent,
    RolesComponent,
    CounterComponent,
    WrapperComponent,
  ],
  imports: [BrowserModule, FormsModule],
  // providers: [UserService],
  providers: [
    {
      provide: UserService,
      useClass: UserService,
    },
    {
      provide: 'userName',
      useValue: 'Den',
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
