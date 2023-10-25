import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, map, Observable, switchMap } from 'rxjs';

const getRolesFromServer = async (role: string) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(['admin', 'user', 'customer'].filter((item) => item.includes(role)));
    }, 2000);
  });
};

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements AfterViewInit {
  @ViewChild('inputElement')
  inputElement: ElementRef | undefined;

  public roles$!: Observable<any>;

  ngAfterViewInit(): void {
    this.roles$ = fromEvent(this.inputElement!.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        switchMap((value) => getRolesFromServer(value))
      )
      // .subscribe((e) => {
      //   console.log(e);
      // });
  }
}
