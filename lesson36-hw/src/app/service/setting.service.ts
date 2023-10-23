import { Injectable } from '@angular/core';
import { TLanguage } from '../models/Translate';

export interface ILang {
  languageStart: TLanguage, 
  languageEnd: TLanguage;
}

@Injectable({
  providedIn: 'root'
})

export class SettingService {
  private lang: ILang = {languageStart: 'ru', languageEnd: 'en'};
  private countWord: number = 5;
  private time: number = 5;

  constructor() { }

  getLang() {
    return this.lang;
  }

  setLang(lang: ILang) {
    this.lang = lang
  }

  getCountWord() {
    return this.countWord;
  }

  setCountWord(count: number) {
    this.countWord = count;
  }

  getTime() {
    return this.time;
  }

  setTime(time: number) {
    this.time = time;
  }
}
