import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../service/setting.service';
import { TLanguage } from '../models/Translate';
interface IForm {
  languageStart: FormControl<TLanguage>,
  languageEnd: FormControl<TLanguage>,
  countWord: FormControl<number>,
  time: FormControl<number>,
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [],
})
export class SettingsComponent implements OnInit {
  countWord: number = 10;
  time: number = 5;

  constructor(private SettingService: SettingService) {}

  ngOnInit(): void {
    this.countWord = this.SettingService.getCountWord();
    this.time = this.SettingService.getTime();
  }

  form = new FormGroup<IForm>({
    languageStart: new FormControl('ru', {nonNullable: true}),
    languageEnd: new FormControl('en', {nonNullable: true}),
    countWord: new FormControl(this.countWord, {nonNullable: true}),
    time: new FormControl(this.time, {nonNullable: true}),
  });

  onSubmit() {
    if (this.form.value.languageStart && this.form.value.languageEnd) {
      this.SettingService.setLang({
        languageStart: this.form.value.languageStart,
        languageEnd: this.form.value.languageEnd
      });
    }
    this.SettingService.setCountWord(this.form.value.countWord!);
    this.SettingService.setTime(this.form.value.time!);
  }
}
