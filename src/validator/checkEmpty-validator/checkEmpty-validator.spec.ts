import { CheckEmptyValidator } from './checkEmpty-validator';

describe('Empty Validator', () => {
  let results: Array<{ value: string; res: boolean }> = [
    { value: 'ok', res: true },
    { value: '', res: false },
    { value: null, res: false },
    { value: undefined, res: false },
  ];

  results.forEach(i =>
    it(`Should return ${i.res} for ${i.value} with`, () => {
      expect(CheckEmptyValidator.validate(i.value)).toEqual(i.res);
    }),
  );
});
