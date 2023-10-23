import {
  DictionaryService,
  TDictionaryObject,
} from './../service/dictionary.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ILang, SettingService } from '../service/setting.service';

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.scss'],
  providers: [DictionaryService],
})
export class GoComponent implements OnInit {
  time: number | undefined;
  countWord: number | undefined;
  lang: ILang = { languageStart: 'ru', languageEnd: 'en' };
  dictionary: TDictionaryObject[] = [];
  askWord: string | undefined;
  rightAnswer: string | undefined;
  isGame: boolean = false;
  isWrong: boolean = false;
  isFinish: boolean = false;
  countRightAnswer: number = 0;

  constructor(
    private SettingService: SettingService,
    private DictionaryService: DictionaryService
  ) {}

  answer = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.time = this.SettingService.getTime() * 60;
    this.countWord = this.SettingService.getCountWord();
    this.lang = this.SettingService.getLang();
    this.dictionary = this.DictionaryService.getDictionary().slice(0, this.countWord);
    this.randomWord();
  }

  startTimer() {
    this.isGame = true;
    setInterval(() => {
      if (this.time! > 0) {
        this.time!--;
      } else {
        console.log('finish');
        this.isGame = false;
        this.isFinish = true;
      }
    }, 1000);
  }

  randomWord() {
    this.answer.setValue('');
    const index = Math.floor(Math.random() * this.dictionary.length);
    const word = this.dictionary[index];
    this.askWord = word[this.lang.languageStart];
    this.rightAnswer = word[this.lang.languageEnd].toLowerCase();
    this.dictionary.splice(index, 1);
  }

  check() {
    if (this.dictionary.length > 0) {
      if (this.answer.value.toLowerCase() === this.rightAnswer) {
        this.isWrong = false;
        this.countRightAnswer++;
        this.randomWord();
      } else {
        this.isWrong = true;
      }
    } else {
      this.isFinish = true;
    }
  }

  skip() {
    if (this.dictionary.length > 0) {
      this.isWrong = false;
      this.randomWord();
    } else {
      this.isFinish = true;
    }
  }
}
