import { TranslateService } from './../service/translate.service';
import {
  DictionaryService,
  TDictionaryObject,
} from './../service/dictionary.service';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { map, switchMap, Observable, fromEvent, debounceTime } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { TLanguage, TLanguagePair } from '../models/Translate';

interface ILanguageForm {
  language: FormControl<TLanguagePair>,
}

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
  providers: [DictionaryService, TranslateService],
})
export class RecentlyAddedComponent implements AfterViewInit, OnChanges, OnInit {
  relatedWords: string[] = [];

  newWord = new FormControl('');

  dictionary: TDictionaryObject[] | undefined;

  languageForm = new FormGroup<ILanguageForm>({ language: new FormControl('ru|en', {nonNullable: true}) });
  // public qqq$!: Observable<any>; //переменная для observable

  constructor(
    private TranslateService: TranslateService,
    private DictionaryService: DictionaryService
  ) {}

  @ViewChild('inputEl')
  inputEl: ElementRef | undefined;

  ngOnInit(): void {
    this.dictionary = this.DictionaryService.getDictionary();
  }

  ngOnChanges(): void {
    this.dictionary = this.DictionaryService.getDictionary();
  }

  ngAfterViewInit(): void {
    // this.qqq$ =
    fromEvent(this.inputEl?.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        map((e: any) => e.target.value),
        switchMap((value: string) =>
          this.TranslateService.getTranslate(
            value,
            this.languageForm.value.language!
          )
        )
      )
      .subscribe((e) => {
        this.relatedWords.length = 0;

        e.matches.map((match) => {
          this.relatedWords.push(match.translation);
        });
      });
  }

  onSubmit() {
    console.log(1);
  }

  resetNewWord() {
    this.newWord.setValue('');
  }
  addInDictionary(relatedWord: string) {

    this.DictionaryService.setDictionary(this.newWord.value!, relatedWord, this.languageForm.value.language!);
    this.resetNewWord();
    this.relatedWords.length = 0;
    this.dictionary = this.DictionaryService.getDictionary();
  }
}
