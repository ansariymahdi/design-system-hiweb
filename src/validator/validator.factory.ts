import { Validator, ValidatorEntry, defaultValidator, combineValidators } from './validator';
import { getLengthValidator } from './length-validator/length-validator';
import { EmailValidator } from './email-validator/email-validator';
import { CheckEmptyValidator } from './checkEmpty-validator/checkEmpty-validator';
import { URLValidator } from './url-validator/url-validator';

export enum ValidatorsName {
  fruit = 'fruit',
  length = 'length',
  email = 'email',
  required = 'required',
  url = 'url'
}

export function getValidator<A>(list: Array<string | ValidatorEntry | Validator<A>>): Validator<A> {
  return (list || [])
    .map(v => {
      if (typeof v === 'string') {
        return validatorFactory(v, null);
      } else if (v && (v as any).name) {
        v = v as ValidatorEntry;
        return validatorFactory(v.name, v.options);
      } else {
        return v as Validator<A>;
      }
    })
    .reduce(combineValidators, defaultValidator);
}

export function validatorFactory(name: string, options: any): Validator<any> {
  options = options || {};

  switch (name) {
    // case ValidatorsName.fruit:
    //   return FruitValidator;
    case ValidatorsName.length:
      return getLengthValidator(options.min, options.max);
    case ValidatorsName.email:
      return EmailValidator;
    case ValidatorsName.required:
      return CheckEmptyValidator;
    case ValidatorsName.url:
      return URLValidator;
    default:
      return defaultValidator;
  }
}
