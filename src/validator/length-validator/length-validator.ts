import { Validator } from './../validator';

export function getLengthValidator(min: number, max: number): Validator<string> {
  return {
    validate: (value: string) => {
      value = value || '';
      min = min || 0;
      max = max || 0;
      if (min && max) {
        return min <= value.length && value.length <= max;
      }
      if (min) {
        return min <= value.length;
      }
      if (max) {
        return value.length <= max;
      }
      return true;
    },
    errorMessage:
      min && max
        ? `You must enter between ${min} and ${max} characters`
        : min
        ? `You must enter at least ${min} characters`
        : max
        ? `You must enter less than ${max} characters`
        : '',
  };
}

const mystring: string = '5';
getLengthValidator(2, 4).validate(mystring);
