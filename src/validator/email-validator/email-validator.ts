import { Validator } from './../validator';
const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EmailValidator: Validator<string> = {
  validate: (value: string) => {
    value = value || '';
    if (!value) {
      return false;
    }
    return regex.test(value) ? true : false;
  },
  errorMessage: 'email not true',
};

const mystring: string = 'asljfasokjf';
EmailValidator.validate(mystring);
