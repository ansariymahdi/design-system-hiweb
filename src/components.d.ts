/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AlertHiweb {
        "timer": any;
        "title": string;
        "type": any;
    }
    interface ButtonErrorHiweb {
        "title": string;
    }
    interface ButtonHiweb {
        "title": string;
    }
    interface ButtonInfoHiweb {
        "title": string;
    }
    interface ButtonOutlineHiweb {
        "title": string;
    }
    interface CardAccordionHiweb {
        "label": string;
        "open": boolean;
    }
    interface CardButtonHiweb {
        "body": string;
        "callback": string;
        "hover": boolean;
        "icon": string;
        "iconColor": {background: string, shadow: string};
        "title": string;
    }
    interface CardNewsHiweb {
        "backgroundUrl": string;
        "btnText": string;
        "descriptionNews": string;
        "titleNews": string;
    }
    interface CheckboxHiweb {
        "value": boolean;
    }
    interface CounterInputHiweb {
    }
    interface DatetimePickerHiweb {
    }
    interface DropdownHiweb {
        "icon": string;
        "items": {icon: string, text: string}[];
    }
    interface ErrorHiweb {
        "error": { statusCode: number, message: string, buttonMessage: string, path: string};
    }
    interface InputHiweb {
        "checkInput": boolean;
        "disable": boolean;
        "error": string;
        "label": string;
        "placeHolder": string;
        "title": string;
        "type": string;
        "valid": boolean;
        "validate": () => Promise<void>;
        "validatorProp": string;
        "valueProp": string;
    }
    interface ModalHiweb {
        "data": {icon: string, text: string, buttonLeft: {text: string, callback: string},buttonRight: {text: string, callback: string}};
    }
    interface NavRightHiweb {
        "array": any;
        "arrayString": string;
        "isDarkTheme": boolean;
        "userIcon": {title: string,icon: string, path: string};
    }
    interface NavRightHiweb2 {
        "items": { title: string, subItems: { icon: string, title: string, path: string, active: boolean }[] }[];
    }
    interface NavTopHiweb {
        "items": {icon: string, notification: number, path: string}[];
        "user": {fullName: string, info: string, imageUrl};
    }
    interface ProgressLoaderHiweb {
    }
    interface SidebarAdminHiweb {
        "contentcolor": any;
        "headercolor": any;
        "isDarkTheme": boolean;
        "itemsProp": any;
        "itemsStringProp": string;
        "open": boolean;
        "textcolor": any;
    }
    interface StepperHiweb {
        "step": number;
        "totalSteps": number;
    }
    interface SurveyHiweb {
        "check": boolean;
        "options": string[];
        "subtitle": string;
        "title": string;
    }
    interface TableHiweb {
        "checkbox": boolean;
        "dataProp": { head: { title: string, options: string[], colspan: number }[], body: { type: string, data: any }[][] };
        "dataStringProp": string;
        "info": { title: string, content: string }[];
        "numberOfRows": number;
        "orderBy": { order: string, options: string[] };
        "page": number;
        "range": number[];
        "totalDocuments": number;
    }
    interface TextareaHiweb {
    }
}
declare global {
    interface HTMLAlertHiwebElement extends Components.AlertHiweb, HTMLStencilElement {
    }
    var HTMLAlertHiwebElement: {
        prototype: HTMLAlertHiwebElement;
        new (): HTMLAlertHiwebElement;
    };
    interface HTMLButtonErrorHiwebElement extends Components.ButtonErrorHiweb, HTMLStencilElement {
    }
    var HTMLButtonErrorHiwebElement: {
        prototype: HTMLButtonErrorHiwebElement;
        new (): HTMLButtonErrorHiwebElement;
    };
    interface HTMLButtonHiwebElement extends Components.ButtonHiweb, HTMLStencilElement {
    }
    var HTMLButtonHiwebElement: {
        prototype: HTMLButtonHiwebElement;
        new (): HTMLButtonHiwebElement;
    };
    interface HTMLButtonInfoHiwebElement extends Components.ButtonInfoHiweb, HTMLStencilElement {
    }
    var HTMLButtonInfoHiwebElement: {
        prototype: HTMLButtonInfoHiwebElement;
        new (): HTMLButtonInfoHiwebElement;
    };
    interface HTMLButtonOutlineHiwebElement extends Components.ButtonOutlineHiweb, HTMLStencilElement {
    }
    var HTMLButtonOutlineHiwebElement: {
        prototype: HTMLButtonOutlineHiwebElement;
        new (): HTMLButtonOutlineHiwebElement;
    };
    interface HTMLCardAccordionHiwebElement extends Components.CardAccordionHiweb, HTMLStencilElement {
    }
    var HTMLCardAccordionHiwebElement: {
        prototype: HTMLCardAccordionHiwebElement;
        new (): HTMLCardAccordionHiwebElement;
    };
    interface HTMLCardButtonHiwebElement extends Components.CardButtonHiweb, HTMLStencilElement {
    }
    var HTMLCardButtonHiwebElement: {
        prototype: HTMLCardButtonHiwebElement;
        new (): HTMLCardButtonHiwebElement;
    };
    interface HTMLCardNewsHiwebElement extends Components.CardNewsHiweb, HTMLStencilElement {
    }
    var HTMLCardNewsHiwebElement: {
        prototype: HTMLCardNewsHiwebElement;
        new (): HTMLCardNewsHiwebElement;
    };
    interface HTMLCheckboxHiwebElement extends Components.CheckboxHiweb, HTMLStencilElement {
    }
    var HTMLCheckboxHiwebElement: {
        prototype: HTMLCheckboxHiwebElement;
        new (): HTMLCheckboxHiwebElement;
    };
    interface HTMLCounterInputHiwebElement extends Components.CounterInputHiweb, HTMLStencilElement {
    }
    var HTMLCounterInputHiwebElement: {
        prototype: HTMLCounterInputHiwebElement;
        new (): HTMLCounterInputHiwebElement;
    };
    interface HTMLDatetimePickerHiwebElement extends Components.DatetimePickerHiweb, HTMLStencilElement {
    }
    var HTMLDatetimePickerHiwebElement: {
        prototype: HTMLDatetimePickerHiwebElement;
        new (): HTMLDatetimePickerHiwebElement;
    };
    interface HTMLDropdownHiwebElement extends Components.DropdownHiweb, HTMLStencilElement {
    }
    var HTMLDropdownHiwebElement: {
        prototype: HTMLDropdownHiwebElement;
        new (): HTMLDropdownHiwebElement;
    };
    interface HTMLErrorHiwebElement extends Components.ErrorHiweb, HTMLStencilElement {
    }
    var HTMLErrorHiwebElement: {
        prototype: HTMLErrorHiwebElement;
        new (): HTMLErrorHiwebElement;
    };
    interface HTMLInputHiwebElement extends Components.InputHiweb, HTMLStencilElement {
    }
    var HTMLInputHiwebElement: {
        prototype: HTMLInputHiwebElement;
        new (): HTMLInputHiwebElement;
    };
    interface HTMLModalHiwebElement extends Components.ModalHiweb, HTMLStencilElement {
    }
    var HTMLModalHiwebElement: {
        prototype: HTMLModalHiwebElement;
        new (): HTMLModalHiwebElement;
    };
    interface HTMLNavRightHiwebElement extends Components.NavRightHiweb, HTMLStencilElement {
    }
    var HTMLNavRightHiwebElement: {
        prototype: HTMLNavRightHiwebElement;
        new (): HTMLNavRightHiwebElement;
    };
    interface HTMLNavRightHiweb2Element extends Components.NavRightHiweb2, HTMLStencilElement {
    }
    var HTMLNavRightHiweb2Element: {
        prototype: HTMLNavRightHiweb2Element;
        new (): HTMLNavRightHiweb2Element;
    };
    interface HTMLNavTopHiwebElement extends Components.NavTopHiweb, HTMLStencilElement {
    }
    var HTMLNavTopHiwebElement: {
        prototype: HTMLNavTopHiwebElement;
        new (): HTMLNavTopHiwebElement;
    };
    interface HTMLProgressLoaderHiwebElement extends Components.ProgressLoaderHiweb, HTMLStencilElement {
    }
    var HTMLProgressLoaderHiwebElement: {
        prototype: HTMLProgressLoaderHiwebElement;
        new (): HTMLProgressLoaderHiwebElement;
    };
    interface HTMLSidebarAdminHiwebElement extends Components.SidebarAdminHiweb, HTMLStencilElement {
    }
    var HTMLSidebarAdminHiwebElement: {
        prototype: HTMLSidebarAdminHiwebElement;
        new (): HTMLSidebarAdminHiwebElement;
    };
    interface HTMLStepperHiwebElement extends Components.StepperHiweb, HTMLStencilElement {
    }
    var HTMLStepperHiwebElement: {
        prototype: HTMLStepperHiwebElement;
        new (): HTMLStepperHiwebElement;
    };
    interface HTMLSurveyHiwebElement extends Components.SurveyHiweb, HTMLStencilElement {
    }
    var HTMLSurveyHiwebElement: {
        prototype: HTMLSurveyHiwebElement;
        new (): HTMLSurveyHiwebElement;
    };
    interface HTMLTableHiwebElement extends Components.TableHiweb, HTMLStencilElement {
    }
    var HTMLTableHiwebElement: {
        prototype: HTMLTableHiwebElement;
        new (): HTMLTableHiwebElement;
    };
    interface HTMLTextareaHiwebElement extends Components.TextareaHiweb, HTMLStencilElement {
    }
    var HTMLTextareaHiwebElement: {
        prototype: HTMLTextareaHiwebElement;
        new (): HTMLTextareaHiwebElement;
    };
    interface HTMLElementTagNameMap {
        "alert-hiweb": HTMLAlertHiwebElement;
        "button-error-hiweb": HTMLButtonErrorHiwebElement;
        "button-hiweb": HTMLButtonHiwebElement;
        "button-info-hiweb": HTMLButtonInfoHiwebElement;
        "button-outline-hiweb": HTMLButtonOutlineHiwebElement;
        "card-accordion-hiweb": HTMLCardAccordionHiwebElement;
        "card-button-hiweb": HTMLCardButtonHiwebElement;
        "card-news-hiweb": HTMLCardNewsHiwebElement;
        "checkbox-hiweb": HTMLCheckboxHiwebElement;
        "counter-input-hiweb": HTMLCounterInputHiwebElement;
        "datetime-picker-hiweb": HTMLDatetimePickerHiwebElement;
        "dropdown-hiweb": HTMLDropdownHiwebElement;
        "error-hiweb": HTMLErrorHiwebElement;
        "input-hiweb": HTMLInputHiwebElement;
        "modal-hiweb": HTMLModalHiwebElement;
        "nav-right-hiweb": HTMLNavRightHiwebElement;
        "nav-right-hiweb-2": HTMLNavRightHiweb2Element;
        "nav-top-hiweb": HTMLNavTopHiwebElement;
        "progress-loader-hiweb": HTMLProgressLoaderHiwebElement;
        "sidebar-admin-hiweb": HTMLSidebarAdminHiwebElement;
        "stepper-hiweb": HTMLStepperHiwebElement;
        "survey-hiweb": HTMLSurveyHiwebElement;
        "table-hiweb": HTMLTableHiwebElement;
        "textarea-hiweb": HTMLTextareaHiwebElement;
    }
}
declare namespace LocalJSX {
    interface AlertHiweb {
        "onOnClick"?: (event: CustomEvent<any>) => void;
        "timer"?: any;
        "title"?: string;
        "type"?: any;
    }
    interface ButtonErrorHiweb {
        "title"?: string;
    }
    interface ButtonHiweb {
        "onOnClick"?: (event: CustomEvent<any>) => void;
        "title"?: string;
    }
    interface ButtonInfoHiweb {
        "title"?: string;
    }
    interface ButtonOutlineHiweb {
        "title"?: string;
    }
    interface CardAccordionHiweb {
        "label"?: string;
        "onOnToggle"?: (event: CustomEvent<any>) => void;
        "open"?: boolean;
    }
    interface CardButtonHiweb {
        "body"?: string;
        "callback"?: string;
        "hover"?: boolean;
        "icon"?: string;
        "iconColor"?: {background: string, shadow: string};
        "onHandleClick"?: (event: CustomEvent<any>) => void;
        "title"?: string;
    }
    interface CardNewsHiweb {
        "backgroundUrl"?: string;
        "btnText"?: string;
        "descriptionNews"?: string;
        "onClicked"?: (event: CustomEvent<any>) => void;
        "titleNews"?: string;
    }
    interface CheckboxHiweb {
        "onOnChange"?: (event: CustomEvent<boolean>) => void;
        "value"?: boolean;
    }
    interface CounterInputHiweb {
        "onValueChanged"?: (event: CustomEvent<number>) => void;
    }
    interface DatetimePickerHiweb {
    }
    interface DropdownHiweb {
        "icon"?: string;
        "items"?: {icon: string, text: string}[];
        "onClicked"?: (event: CustomEvent<string>) => void;
    }
    interface ErrorHiweb {
        "error"?: { statusCode: number, message: string, buttonMessage: string, path: string};
        "onOnClick"?: (event: CustomEvent<any>) => void;
    }
    interface InputHiweb {
        "checkInput"?: boolean;
        "disable"?: boolean;
        "error"?: string;
        "label"?: string;
        "onChanged"?: (event: CustomEvent<{title: string, value: string, isValid: boolean}>) => void;
        "placeHolder"?: string;
        "title"?: string;
        "type"?: string;
        "valid"?: boolean;
        "validatorProp"?: string;
        "valueProp"?: string;
    }
    interface ModalHiweb {
        "data"?: {icon: string, text: string, buttonLeft: {text: string, callback: string},buttonRight: {text: string, callback: string}};
        "onOnClick"?: (event: CustomEvent<any>) => void;
    }
    interface NavRightHiweb {
        "array"?: any;
        "arrayString"?: string;
        "isDarkTheme"?: boolean;
        "onOnClick"?: (event: CustomEvent<any>) => void;
        "onToggleTheme"?: (event: CustomEvent<any>) => void;
        "userIcon"?: {title: string,icon: string, path: string};
    }
    interface NavRightHiweb2 {
        "items"?: { title: string, subItems: { icon: string, title: string, path: string, active: boolean }[] }[];
        "onIsOpen"?: (event: CustomEvent<boolean>) => void;
        "onOnClick"?: (event: CustomEvent<any>) => void;
    }
    interface NavTopHiweb {
        "items"?: {icon: string, notification: number, path: string}[];
        "onOnClick"?: (event: CustomEvent<any>) => void;
        "onSearch"?: (event: CustomEvent<any>) => void;
        "user"?: {fullName: string, info: string, imageUrl};
    }
    interface ProgressLoaderHiweb {
    }
    interface SidebarAdminHiweb {
        "contentcolor"?: any;
        "headercolor"?: any;
        "isDarkTheme"?: boolean;
        "itemsProp"?: any;
        "itemsStringProp"?: string;
        "onIsOpen"?: (event: CustomEvent<boolean>) => void;
        "onOnClick"?: (event: CustomEvent<any>) => void;
        "onToggleTheme"?: (event: CustomEvent<any>) => void;
        "open"?: boolean;
        "textcolor"?: any;
    }
    interface StepperHiweb {
        "step"?: number;
        "totalSteps"?: number;
    }
    interface SurveyHiweb {
        "check"?: boolean;
        "onOptionSelected"?: (event: CustomEvent<any>) => void;
        "options"?: string[];
        "subtitle"?: string;
        "title"?: string;
    }
    interface TableHiweb {
        "checkbox"?: boolean;
        "dataProp"?: { head: { title: string, options: string[], colspan: number }[], body: { type: string, data: any }[][] };
        "dataStringProp"?: string;
        "info"?: { title: string, content: string }[];
        "numberOfRows"?: number;
        "onButtonClicked"?: (event: CustomEvent<string|{text: string,detail: string}>) => void;
        "onHandleCheckbox"?: (event: CustomEvent<{ index: number, checked: boolean } | { allSelected: boolean }>) => void;
        "onOrderChanged"?: (event: CustomEvent<string>) => void;
        "onPageChanged"?: (event: CustomEvent<number>) => void;
        "onRowNumChanged"?: (event: CustomEvent<number>) => void;
        "onSearchInputChanged"?: (event: CustomEvent<{ title: string, value: string, isValid: boolean }>) => void;
        "orderBy"?: { order: string, options: string[] };
        "page"?: number;
        "range"?: number[];
        "totalDocuments"?: number;
    }
    interface TextareaHiweb {
    }
    interface IntrinsicElements {
        "alert-hiweb": AlertHiweb;
        "button-error-hiweb": ButtonErrorHiweb;
        "button-hiweb": ButtonHiweb;
        "button-info-hiweb": ButtonInfoHiweb;
        "button-outline-hiweb": ButtonOutlineHiweb;
        "card-accordion-hiweb": CardAccordionHiweb;
        "card-button-hiweb": CardButtonHiweb;
        "card-news-hiweb": CardNewsHiweb;
        "checkbox-hiweb": CheckboxHiweb;
        "counter-input-hiweb": CounterInputHiweb;
        "datetime-picker-hiweb": DatetimePickerHiweb;
        "dropdown-hiweb": DropdownHiweb;
        "error-hiweb": ErrorHiweb;
        "input-hiweb": InputHiweb;
        "modal-hiweb": ModalHiweb;
        "nav-right-hiweb": NavRightHiweb;
        "nav-right-hiweb-2": NavRightHiweb2;
        "nav-top-hiweb": NavTopHiweb;
        "progress-loader-hiweb": ProgressLoaderHiweb;
        "sidebar-admin-hiweb": SidebarAdminHiweb;
        "stepper-hiweb": StepperHiweb;
        "survey-hiweb": SurveyHiweb;
        "table-hiweb": TableHiweb;
        "textarea-hiweb": TextareaHiweb;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "alert-hiweb": LocalJSX.AlertHiweb & JSXBase.HTMLAttributes<HTMLAlertHiwebElement>;
            "button-error-hiweb": LocalJSX.ButtonErrorHiweb & JSXBase.HTMLAttributes<HTMLButtonErrorHiwebElement>;
            "button-hiweb": LocalJSX.ButtonHiweb & JSXBase.HTMLAttributes<HTMLButtonHiwebElement>;
            "button-info-hiweb": LocalJSX.ButtonInfoHiweb & JSXBase.HTMLAttributes<HTMLButtonInfoHiwebElement>;
            "button-outline-hiweb": LocalJSX.ButtonOutlineHiweb & JSXBase.HTMLAttributes<HTMLButtonOutlineHiwebElement>;
            "card-accordion-hiweb": LocalJSX.CardAccordionHiweb & JSXBase.HTMLAttributes<HTMLCardAccordionHiwebElement>;
            "card-button-hiweb": LocalJSX.CardButtonHiweb & JSXBase.HTMLAttributes<HTMLCardButtonHiwebElement>;
            "card-news-hiweb": LocalJSX.CardNewsHiweb & JSXBase.HTMLAttributes<HTMLCardNewsHiwebElement>;
            "checkbox-hiweb": LocalJSX.CheckboxHiweb & JSXBase.HTMLAttributes<HTMLCheckboxHiwebElement>;
            "counter-input-hiweb": LocalJSX.CounterInputHiweb & JSXBase.HTMLAttributes<HTMLCounterInputHiwebElement>;
            "datetime-picker-hiweb": LocalJSX.DatetimePickerHiweb & JSXBase.HTMLAttributes<HTMLDatetimePickerHiwebElement>;
            "dropdown-hiweb": LocalJSX.DropdownHiweb & JSXBase.HTMLAttributes<HTMLDropdownHiwebElement>;
            "error-hiweb": LocalJSX.ErrorHiweb & JSXBase.HTMLAttributes<HTMLErrorHiwebElement>;
            "input-hiweb": LocalJSX.InputHiweb & JSXBase.HTMLAttributes<HTMLInputHiwebElement>;
            "modal-hiweb": LocalJSX.ModalHiweb & JSXBase.HTMLAttributes<HTMLModalHiwebElement>;
            "nav-right-hiweb": LocalJSX.NavRightHiweb & JSXBase.HTMLAttributes<HTMLNavRightHiwebElement>;
            "nav-right-hiweb-2": LocalJSX.NavRightHiweb2 & JSXBase.HTMLAttributes<HTMLNavRightHiweb2Element>;
            "nav-top-hiweb": LocalJSX.NavTopHiweb & JSXBase.HTMLAttributes<HTMLNavTopHiwebElement>;
            "progress-loader-hiweb": LocalJSX.ProgressLoaderHiweb & JSXBase.HTMLAttributes<HTMLProgressLoaderHiwebElement>;
            "sidebar-admin-hiweb": LocalJSX.SidebarAdminHiweb & JSXBase.HTMLAttributes<HTMLSidebarAdminHiwebElement>;
            "stepper-hiweb": LocalJSX.StepperHiweb & JSXBase.HTMLAttributes<HTMLStepperHiwebElement>;
            "survey-hiweb": LocalJSX.SurveyHiweb & JSXBase.HTMLAttributes<HTMLSurveyHiwebElement>;
            "table-hiweb": LocalJSX.TableHiweb & JSXBase.HTMLAttributes<HTMLTableHiwebElement>;
            "textarea-hiweb": LocalJSX.TextareaHiweb & JSXBase.HTMLAttributes<HTMLTextareaHiwebElement>;
        }
    }
}
