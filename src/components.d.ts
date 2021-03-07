/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
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
    }
    interface CardNewsHiweb {
        "backgroundUrl": string;
        "btnText": string;
        "descriptionNews": string;
        "titleNews": string;
    }
    interface ErrorHiweb {
        "error": { statusCode: number, message: string, buttonMessage: string, path: string};
    }
    interface InputHiweb {
        "label": string;
        "title": string;
        "valid": boolean;
        "validate": () => Promise<void>;
        "validatorProp": string;
        "value": string;
    }
    interface NavRightHiweb {
        "array": any;
        "arrayString": string;
        "isDarkTheme": boolean;
        "userIcon": {title: string,icon: string, path: string};
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
    interface TableHiweb {
        "dataProp": {head: {title: string, options: string[]}[], body: string[][]};
        "dataStringProp": string;
    }
    interface TextareaHiweb {
    }
}
declare global {
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
    interface HTMLCardNewsHiwebElement extends Components.CardNewsHiweb, HTMLStencilElement {
    }
    var HTMLCardNewsHiwebElement: {
        prototype: HTMLCardNewsHiwebElement;
        new (): HTMLCardNewsHiwebElement;
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
    interface HTMLNavRightHiwebElement extends Components.NavRightHiweb, HTMLStencilElement {
    }
    var HTMLNavRightHiwebElement: {
        prototype: HTMLNavRightHiwebElement;
        new (): HTMLNavRightHiwebElement;
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
        "button-error-hiweb": HTMLButtonErrorHiwebElement;
        "button-hiweb": HTMLButtonHiwebElement;
        "button-info-hiweb": HTMLButtonInfoHiwebElement;
        "button-outline-hiweb": HTMLButtonOutlineHiwebElement;
        "card-accordion-hiweb": HTMLCardAccordionHiwebElement;
        "card-news-hiweb": HTMLCardNewsHiwebElement;
        "error-hiweb": HTMLErrorHiwebElement;
        "input-hiweb": HTMLInputHiwebElement;
        "nav-right-hiweb": HTMLNavRightHiwebElement;
        "progress-loader-hiweb": HTMLProgressLoaderHiwebElement;
        "sidebar-admin-hiweb": HTMLSidebarAdminHiwebElement;
        "table-hiweb": HTMLTableHiwebElement;
        "textarea-hiweb": HTMLTextareaHiwebElement;
    }
}
declare namespace LocalJSX {
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
    }
    interface CardNewsHiweb {
        "backgroundUrl"?: string;
        "btnText"?: string;
        "descriptionNews"?: string;
        "onClicked"?: (event: CustomEvent<any>) => void;
        "titleNews"?: string;
    }
    interface ErrorHiweb {
        "error"?: { statusCode: number, message: string, buttonMessage: string, path: string};
        "onOnClick"?: (event: CustomEvent<any>) => void;
    }
    interface InputHiweb {
        "label"?: string;
        "onChanged"?: (event: CustomEvent<{title: string, value: string, isValid: boolean}>) => void;
        "title"?: string;
        "valid"?: boolean;
        "validatorProp"?: string;
        "value"?: string;
    }
    interface NavRightHiweb {
        "array"?: any;
        "arrayString"?: string;
        "isDarkTheme"?: boolean;
        "onOnClick"?: (event: CustomEvent<any>) => void;
        "onToggleTheme"?: (event: CustomEvent<any>) => void;
        "userIcon"?: {title: string,icon: string, path: string};
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
    interface TableHiweb {
        "dataProp"?: {head: {title: string, options: string[]}[], body: string[][]};
        "dataStringProp"?: string;
    }
    interface TextareaHiweb {
    }
    interface IntrinsicElements {
        "button-error-hiweb": ButtonErrorHiweb;
        "button-hiweb": ButtonHiweb;
        "button-info-hiweb": ButtonInfoHiweb;
        "button-outline-hiweb": ButtonOutlineHiweb;
        "card-accordion-hiweb": CardAccordionHiweb;
        "card-news-hiweb": CardNewsHiweb;
        "error-hiweb": ErrorHiweb;
        "input-hiweb": InputHiweb;
        "nav-right-hiweb": NavRightHiweb;
        "progress-loader-hiweb": ProgressLoaderHiweb;
        "sidebar-admin-hiweb": SidebarAdminHiweb;
        "table-hiweb": TableHiweb;
        "textarea-hiweb": TextareaHiweb;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "button-error-hiweb": LocalJSX.ButtonErrorHiweb & JSXBase.HTMLAttributes<HTMLButtonErrorHiwebElement>;
            "button-hiweb": LocalJSX.ButtonHiweb & JSXBase.HTMLAttributes<HTMLButtonHiwebElement>;
            "button-info-hiweb": LocalJSX.ButtonInfoHiweb & JSXBase.HTMLAttributes<HTMLButtonInfoHiwebElement>;
            "button-outline-hiweb": LocalJSX.ButtonOutlineHiweb & JSXBase.HTMLAttributes<HTMLButtonOutlineHiwebElement>;
            "card-accordion-hiweb": LocalJSX.CardAccordionHiweb & JSXBase.HTMLAttributes<HTMLCardAccordionHiwebElement>;
            "card-news-hiweb": LocalJSX.CardNewsHiweb & JSXBase.HTMLAttributes<HTMLCardNewsHiwebElement>;
            "error-hiweb": LocalJSX.ErrorHiweb & JSXBase.HTMLAttributes<HTMLErrorHiwebElement>;
            "input-hiweb": LocalJSX.InputHiweb & JSXBase.HTMLAttributes<HTMLInputHiwebElement>;
            "nav-right-hiweb": LocalJSX.NavRightHiweb & JSXBase.HTMLAttributes<HTMLNavRightHiwebElement>;
            "progress-loader-hiweb": LocalJSX.ProgressLoaderHiweb & JSXBase.HTMLAttributes<HTMLProgressLoaderHiwebElement>;
            "sidebar-admin-hiweb": LocalJSX.SidebarAdminHiweb & JSXBase.HTMLAttributes<HTMLSidebarAdminHiwebElement>;
            "table-hiweb": LocalJSX.TableHiweb & JSXBase.HTMLAttributes<HTMLTableHiwebElement>;
            "textarea-hiweb": LocalJSX.TextareaHiweb & JSXBase.HTMLAttributes<HTMLTextareaHiwebElement>;
        }
    }
}
