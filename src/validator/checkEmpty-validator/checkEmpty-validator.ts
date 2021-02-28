import { Validator } from './../validator';

export const CheckEmptyValidator: Validator<string> = {
  validate: (value: string) => {
    value = value || '';
    return value?.trim().length === 0 || typeof value == 'undefined' ? false : true;
  },
  errorMessage: 'input is required',
};

const mystring: string = 'asljfasokjf';
CheckEmptyValidator.validate(mystring);
