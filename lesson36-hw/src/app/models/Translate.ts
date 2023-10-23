export interface ITranslateData {
  translatedText: string;
  match: number;
}

export interface ITranslateMatches {
  id: string;
  segment: string;
  translation: string;
  source: string;
  target: string;
  quality: number;
  reference: null;
  subject: string;
  match: number;
}

export interface ITranslate {
  responseData: ITranslateData;
  quotaFinished: boolean;
  mtLangSupported: null;
  responseDetails: string;
  responseStatus: number;
  responderId: null;
  exception_code: null;
  matches: ITranslateMatches[];
}

export type TLanguage = 'ru' | 'en'

export type TLanguagePair = 'ru|en' | 'en|ru'
