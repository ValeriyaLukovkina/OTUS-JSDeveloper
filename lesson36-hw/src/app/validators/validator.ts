import { ValidatorFn } from '@angular/forms';

export const correctAnswer = (rightAnswer: string | null): ValidatorFn => {
  return (value) => {
    debugger
    const correct = value.value === rightAnswer;
    if (correct) {
      return { answer: null };
    } else {
      return null;
    }
  };
};
