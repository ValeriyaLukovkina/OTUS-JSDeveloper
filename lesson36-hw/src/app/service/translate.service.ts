import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITranslate } from '../models/Translate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private http: HttpClient) {}

  getTranslate(word: string, language: string): Observable<ITranslate> {
    debugger;
    return this.http.get<ITranslate>(
      `https://api.mymemory.translated.net/get?q=${word}&langpair=${language}`
    );
  }
}
