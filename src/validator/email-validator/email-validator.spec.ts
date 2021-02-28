import { EmailValidator } from './email-validator';

describe('Length Validator', () => {
  let results: Array<{ value: string; res: boolean }> = [
    { value: 'ok', res: false },
    { value: '', res: false },
    { value: 'ansariymahdio', res: false },
    { value: 'ansariymahdio@gmail', res: false },
    { value: 'ansariymahdio@gmail.c', res: false },
    { value: 'ansariymahdi@gmail.com', res: true },
  ];

  results.forEach(i =>
    it(`Should return ${i.res} for ${i.value} with`, () => {
      expect(EmailValidator.validate(i.value)).toEqual(i.res);
    }),
  );
});
