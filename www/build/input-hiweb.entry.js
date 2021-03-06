import { r as registerInstance, e as createEvent, h } from './index-fd38af86.js';

const defaultValidator = {
  validate: (_x) => true,
};
function combineValidators(v1, v2) {
  let combined;
  combined = {
    validate: (x) => {
      const res1 = v1.validate(x);
      const res2 = v2.validate(x);
      if (!res1) {
        combined.errorMessage = v1.errorMessage;
      }
      else if (!res2) {
        combined.errorMessage = v2.errorMessage;
      }
      return res1 && res2;
    },
  };
  return combined;
}

function getLengthValidator(min, max) {
  return {
    validate: (value) => {
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
    errorMessage: min && max
      ? `You must enter between ${min} and ${max} characters`
      : min
        ? `You must enter at least ${min} characters`
        : max
          ? `You must enter less than ${max} characters`
          : '',
  };
}
const mystring = '5';
getLengthValidator(2, 4).validate(mystring);

const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EmailValidator = {
  validate: (value) => {
    value = value || '';
    if (!value) {
      return false;
    }
    return regex.test(value) ? true : false;
  },
  errorMessage: 'email not true',
};
const mystring$1 = 'asljfasokjf';
EmailValidator.validate(mystring$1);

const CheckEmptyValidator = {
  validate: (value) => {
    value = value || '';
    return (value === null || value === void 0 ? void 0 : value.trim().length) === 0 || typeof value == 'undefined' ? false : true;
  },
  errorMessage: 'input is required',
};
const mystring$2 = 'asljfasokjf';
CheckEmptyValidator.validate(mystring$2);

var ValidatorsName;
(function (ValidatorsName) {
  ValidatorsName["fruit"] = "fruit";
  ValidatorsName["length"] = "length";
  ValidatorsName["email"] = "email";
  ValidatorsName["required"] = "required";
})(ValidatorsName || (ValidatorsName = {}));
function getValidator(list) {
  return (list || [])
    .map(v => {
    if (typeof v === 'string') {
      return validatorFactory(v, null);
    }
    else if (v && v.name) {
      v = v;
      return validatorFactory(v.name, v.options);
    }
    else {
      return v;
    }
  })
    .reduce(combineValidators, defaultValidator);
}
function validatorFactory(name, options) {
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
    default:
      return defaultValidator;
  }
}

const inputHiwebCss = ":host{text-align:center;display:block;direction:rtl}:host .input-container{width:95%;margin:auto;position:relative;display:block;margin-bottom:5px}:host .input-container img{cursor:pointer;width:1.5rem;position:absolute;left:calc(.75rem + 1px);bottom:calc(.375rem + 1px);border-radius:50%}:host .input-container .control{position:absolute;left:3rem;bottom:calc(.375rem + 0.75rem - 0.25rem);width:0.5rem;height:0.5rem;border-radius:100%;transition:transform 300ms ease-in-out}:host label{text-align:right;font-size:1.25rem;margin-bottom:5px;display:block}:host input{padding:.375rem .75rem .375rem calc(.75rem  + 3rem);font-size:1rem;line-height:1.5rem;width:100%;box-sizing:border-box;display:block;border-width:1px;border-style:solid;border-radius:0}:host input:focus{outline-width:0}:host span{display:block;margin:auto;text-align:right;font-size:1.1rem;color:#B22222;width:95%}";

const inputHiweb = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.changed = createEvent(this, "changed", 7);
    this.isChanged = false;
    this.inputFocused = false;
    this._validator = defaultValidator;
    this.clearInput = () => {
      console.log(3);
      this.value = '';
      this.changed.emit(this.value);
    };
    this.checkFocus = () => {
      if (this.inputFocused) {
        return {};
      }
      return {};
    };
    this.borderColor = () => {
      if (!this.valid && this.isChanged) {
        return { borderColor: '#B22222' };
      }
      return { borderColor: 'black' };
    };
    this.moveValid = () => {
      if (!this.inputFocused || !this.value) {
        return { transform: "translateX(-1.75rem)" };
      }
      return;
    };
    this.getColor = () => {
      if (this.valid) {
        return { background: 'green' };
      }
      return { background: '#B22222' };
    };
  }
  componentWillLoad() {
    this.validator = JSON.parse(this.validatorProp);
    this._validator = getValidator(this.validator);
  }
  componentDidLoad() {
    const test = document.querySelector('#img');
    console.log(test);
  }
  componentWillUpdate() {
    console.log(2);
    this._validator = getValidator(this.validator);
  }
  handleChange(event) {
    this.value = event.target ? event.target.value : null;
    this.changed.emit(this.value);
    this.validate();
    this.isChanged = true;
  }
  validate() {
    this.valid = this._validator.validate(this.value);
  }
  render() {
    this.validate();
    return (h("div", null, h("div", { class: "input-container" }, h("label", null, this.label), this.isChanged
      ? h("div", { class: "control", style: Object.assign(Object.assign({}, this.moveValid()), this.getColor()) })
      : null, h("input", { style: this.borderColor(), value: this.value, onInput: event => this.handleChange(event), onFocus: () => this.inputFocused = true, onBlur: () => this.inputFocused = false }), this.value
      ? h("img", { src: "../../assets/x-mark.svg", alt: "App Name", style: this.checkFocus(), onClick: () => this.clearInput() })
      : null), !this.valid && this.isChanged
      ? h("span", null, this._validator.errorMessage)
      : null));
  }
};
inputHiweb.style = inputHiwebCss;

export { inputHiweb as input_hiweb };
