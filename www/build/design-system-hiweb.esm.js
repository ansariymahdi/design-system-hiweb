import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-e28bd8b0.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.4.0 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find(s => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) || s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-fb6a473e.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], { type: 'application/javascript' }));
                mod = new Promise(resolve => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["form-hiweb",[[0,"form-hiweb",{"formProp":[16],"resetForm":[4,"reset-form"],"checkInputs":[32],"form":[32],"forceRender":[32]}]]],["table-hiweb",[[0,"table-hiweb",{"dataProp":[16],"dataStringProp":[1,"datastring"],"checkbox":[4],"page":[2],"range":[16],"numberOfRows":[2,"number-of-rows"],"totalDocuments":[2,"total-documents"],"orderBy":[16],"info":[16],"data":[32],"options":[32],"allSelected":[32],"tableBodyHeight":[32],"shadowLeft":[32],"shadowRight":[32],"mousePosition":[32]},[[9,"resize","onWindowResize"],[9,"mouseover","onMouseMove"]]]]],["nav-top-hiweb",[[1,"nav-top-hiweb",{"items":[16],"user":[16],"searchOpen":[32]}]]],["alert-hiweb",[[1,"alert-hiweb",{"type":[8],"timer":[8],"title":[1],"width":[32],"progressBarDone":[32],"theme":[32]}]]],["button-error-hiweb",[[1,"button-error-hiweb",{"title":[1]}]]],["button-info-hiweb",[[1,"button-info-hiweb",{"title":[1]}]]],["button-outline-hiweb",[[1,"button-outline-hiweb",{"title":[1]}]]],["card-accordion-hiweb",[[1,"card-accordion-hiweb",{"label":[1],"open":[4],"toggle":[32]}]]],["card-button-hiweb",[[1,"card-button-hiweb",{"title":[1],"body":[1],"iconColor":[16],"callback":[1],"hover":[4],"icon":[1]}]]],["card-news-hiweb",[[1,"card-news-hiweb",{"backgroundUrl":[1,"background-url"],"titleNews":[1,"title-news"],"descriptionNews":[1,"description-news"],"btnText":[1,"btn-text"]}]]],["counter-input-hiweb",[[1,"counter-input-hiweb",{"value":[32]}]]],["datetime-picker-hiweb",[[1,"datetime-picker-hiweb",{"randomNumber":[32],"inputValue":[32],"openCalendar":[32],"year":[32],"month":[32],"dayOfTheMonth":[32],"dayOfTheWeek":[32],"hour":[32],"minute":[32],"daysBefore":[32],"daysAfter":[32],"daysOfMonth":[32],"years":[32]},[[16,"click","onClick"]]]]],["error-hiweb",[[1,"error-hiweb",{"error":[16]}]]],["modal-hiweb",[[0,"modal-hiweb",{"data":[16]}]]],["multiselect-dropdown-hiweb",[[1,"multiselect-dropdown-hiweb",{"items":[1040],"api":[16],"loading":[32],"isOpen":[32],"selectedItems":[32],"searchValue":[32]},[[8,"click","handleWindowClick"]]]]],["nav-right-hiweb",[[1,"nav-right-hiweb",{"array":[8],"arrayString":[1,"array-string"],"userIcon":[16],"isDarkTheme":[4,"is-dark-theme"],"open":[32],"items":[32],"switch":[32]}]]],["nav-right-hiweb-2",[[1,"nav-right-hiweb-2",{"items":[16],"open":[32],"searchValue":[32]}]]],["progress-loader-hiweb",[[1,"progress-loader-hiweb"]]],["sidebar-admin-hiweb",[[1,"sidebar-admin-hiweb",{"open":[4],"itemsStringProp":[1,"itemsstring"],"itemsProp":[8,"items"],"contentcolor":[8],"headercolor":[8],"textcolor":[8],"isDarkTheme":[4,"is-dark-theme"],"hover":[32],"items":[32],"switch":[32]}]]],["stepper-hiweb",[[1,"stepper-hiweb",{"totalSteps":[2,"total-steps"],"step":[2],"stepState":[32]}]]],["survey-hiweb",[[1,"survey-hiweb",{"title":[1],"subtitle":[1],"options":[16],"check":[4],"selected":[32]}]]],["textarea-hiweb",[[1,"textarea-hiweb"]]],["button-hiweb",[[1,"button-hiweb",{"title":[1]}]]],["checkbox-hiweb",[[1,"checkbox-hiweb",{"value":[4],"color":[1],"valueState":[32]}]]],["date-picker-hiweb",[[1,"date-picker-hiweb",{"label":[1],"value":[1],"color":[1],"randomNumber":[32],"inputValue":[32],"openCalendar":[32],"year":[32],"month":[32],"dayOfTheMonth":[32],"dayOfTheWeek":[32],"daysBefore":[32],"daysAfter":[32],"daysOfMonth":[32],"years":[32]},[[16,"click","onClick"]]]]],["dropdown-hiweb",[[1,"dropdown-hiweb",{"icon":[1],"items":[16],"hasSpaceDown":[32],"isOpen":[32]},[[9,"scroll","onScroll"],[9,"resize","onResize"],[16,"click","onClick"]]]]],["input-select-hiweb",[[1,"input-select-hiweb",{"title":[1],"placeHolder":[1,"place-holder"],"selectedValue":[16],"options":[16],"color":[1],"checkInput":[4,"check-input"],"error":[32],"valueState":[32]}]]],["time-picker-hiweb",[[1,"time-picker-hiweb",{"label":[1],"value":[1],"color":[1],"randomNumber":[32],"inputValue":[32],"openSelector":[32],"hour":[32],"minute":[32],"am":[32]},[[16,"click","onClick"]]]]],["input-hiweb",[[1,"input-hiweb",{"label":[1],"title":[1],"color":[1],"valueProp":[1025,"value-prop"],"placeHolder":[1,"place-holder"],"type":[1],"checkInput":[4,"check-input"],"disable":[4],"error":[1],"valid":[1028],"validatorProp":[1,"validator"],"value":[32],"validator":[32],"isChanged":[32],"inputFocused":[32],"validate":[64]}]]]], options);
});
