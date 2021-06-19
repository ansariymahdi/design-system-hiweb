import { Validator } from './../validator';
const regex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+,.~#?&//=]*)/;

export const URLValidator: Validator<string> = {
  validate: (value: string) => {
    value = value || '';
    if (!value) {
      return false;
    }
    return regex.test(value) ? true : false;
  },
  errorMessage: 'not a url',
};
