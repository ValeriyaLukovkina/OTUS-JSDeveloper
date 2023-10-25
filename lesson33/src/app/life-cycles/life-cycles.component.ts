import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-life-cycles',
  templateUrl: './life-cycles.component.html',
  styleUrls: ['./life-cycles.component.scss'],
})
export class LifeCyclesComponent
  implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked
{
  @Input()
  inputValue: number | undefined;

  @ContentChild('variable')
  myContent: ElementRef | undefined;

  @ViewChild('viewHeader')
  myViewHeader: ElementRef | undefined;

  text: string | undefined;

  hide = true;

  onToggleHeader() {
    this.hide = !this.hide
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  ngOnInit(): void {
    this.text = localStorage.getItem('SOME_KEY')!;
    console.log('on init');
  }

  onChangeText() {
    localStorage.setItem('SOME_KEY', this.text!);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('content init', this.myContent);
  }

  ngAfterContentChecked(): void {
    console.log('content checked', this.myContent);
  }

  ngAfterViewInit(): void {
    console.log('view Init', this.myViewHeader);
  }

  ngAfterViewChecked(): void {
    console.log('view Checked', this.myViewHeader);
  }
}
