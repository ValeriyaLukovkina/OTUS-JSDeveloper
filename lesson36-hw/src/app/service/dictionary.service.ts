import { Injectable, OnInit } from '@angular/core';
import { TLanguage, TLanguagePair } from '../models/Translate';

export type TDictionaryObject = {
  en: string;
  ru: string;
};

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor() {}

  // dictionary: TDictionaryObject[] ;

  getDictionary(): TDictionaryObject[] {
    const dict = localStorage.getItem('dictionary');
    if (dict) {
      return JSON.parse(dict);
    }
    return [];
  }

  setDictionary(word: string, relatedWord: string, lang: TLanguagePair) {
    const dictionary = this.getDictionary();
    let dict;
    if (lang === 'ru|en') {
      dict = {en: relatedWord.toLowerCase(), ru: word}
    } else {
      dict = {en: word, ru: relatedWord.toLowerCase()}
    }
    if (dictionary) {
      localStorage.setItem(
        'dictionary',
        JSON.stringify([
          ...dictionary,
          dict
        ])
      );
    }
    if (!dictionary) {
      localStorage.setItem(
        'dictionary',
        JSON.stringify([dict])
      );
    }

    // this.dictionary = JSON.parse(localStorage.getItem('dictionary') || '')
  }

  addInDictionary() {}
}
