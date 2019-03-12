(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./projects/angular-resize-element/src/lib/angular-resize-element.directive.ts":
/*!*************************************************************************************!*\
  !*** ./projects/angular-resize-element/src/lib/angular-resize-element.directive.ts ***!
  \*************************************************************************************/
/*! exports provided: AngularResizeElementDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularResizeElementDirective", function() { return AngularResizeElementDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./angular-resize-element.enum */ "./projects/angular-resize-element/src/lib/angular-resize-element.enum.ts");



// @ts-ignore
var AngularResizeElementDirective = /** @class */ (function () {
    function AngularResizeElementDirective(elementRef, renderer2) {
        this.elementRef = elementRef;
        this.renderer2 = renderer2;
        this.applyClass = 'resizes';
        this.resizeStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.resize = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.resizeEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    AngularResizeElementDirective.prototype.onMouseDown = function (evt) {
        var _this = this;
        evt.preventDefault();
        this.setOriginalData(evt);
        this.resizeStart.emit(this.generateValuesForEvent(evt));
        this.mouseUpListener = this.renderer2.listen('document', 'mouseup', function (event) { return _this.onMouseUp(event); });
        this.mouseMoveListener = this.renderer2.listen('document', 'mousemove', function (event) { return _this.onMouseMove(event); });
        this.renderer2.addClass(this.elementRef.nativeElement, 'resizes');
    };
    AngularResizeElementDirective.prototype.onMouseUp = function (evt) {
        this.resize.emit(this.generateValuesForEvent(evt));
        this.mouseMoveListener();
        this.mouseUpListener();
        this.renderer2.removeClass(this.elementRef.nativeElement, this.applyClass);
    };
    AngularResizeElementDirective.prototype.onMouseMove = function (evt) {
        this.resize.emit(this.generateValuesForEvent(evt));
    };
    AngularResizeElementDirective.prototype.setOriginalData = function (originalEvent) {
        this.originalEvent = originalEvent;
        if (this.targetElement) {
            if (this.targetElement instanceof _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]) {
                this.targetElementWidthValue = this.targetElement.nativeElement.offsetWidth;
                this.targetElementHeightValue = this.targetElement.nativeElement.offsetHeight;
            }
            else {
                this.targetElementWidthValue = this.targetElement.offsetWidth;
                this.targetElementHeightValue = this.targetElement.offsetHeight;
            }
        }
        else {
            this.targetElementWidthValue = 0;
            this.targetElementHeightValue = 0;
        }
    };
    AngularResizeElementDirective.prototype.generateValuesForEvent = function (evt) {
        var originalXValue = this.originalEvent.clientX;
        var originalYValue = this.originalEvent.clientY;
        var currentWidthValue = evt.clientX - originalXValue;
        var currentHeightValue = evt.clientY - originalYValue;
        switch (this.direction) {
            case _angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirection"].TOP: {
                currentHeightValue *= -1;
                break;
            }
            case _angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirection"].TOP_RIGHT: {
                currentHeightValue *= -1;
                break;
            }
            case _angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirection"].RIGHT: {
                break;
            }
            case _angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirection"].BOTTOM_RIGHT: {
                break;
            }
            case _angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirection"].BOTTOM: {
                break;
            }
            case _angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirection"].BOTTOM_LEFT: {
                currentWidthValue *= -1;
                break;
            }
            case _angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirection"].LEFT: {
                currentWidthValue *= -1;
                break;
            }
            case _angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirection"].TOP_LEFT: {
                currentHeightValue *= -1;
                currentWidthValue *= -1;
                break;
            }
        }
        currentWidthValue += this.targetElementWidthValue;
        currentHeightValue += this.targetElementHeightValue;
        if (this.proportionalResize) {
            if (currentWidthValue > currentHeightValue) {
                currentWidthValue = currentHeightValue;
            }
            else {
                currentHeightValue = currentWidthValue;
            }
        }
        return {
            originalEvent: this.originalEvent,
            currentWidthValue: currentWidthValue,
            currentHeightValue: currentHeightValue,
            originalWidthValue: this.targetElementWidthValue,
            originalHeightValue: this.targetElementHeightValue,
            differenceWidthValue: this.targetElementWidthValue - currentWidthValue,
            differenceHeightValue: this.targetElementHeightValue - currentHeightValue,
        };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], AngularResizeElementDirective.prototype, "targetElement", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], AngularResizeElementDirective.prototype, "direction", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], AngularResizeElementDirective.prototype, "proportionalResize", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], AngularResizeElementDirective.prototype, "applyClass", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], AngularResizeElementDirective.prototype, "resizeStart", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], AngularResizeElementDirective.prototype, "resize", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], AngularResizeElementDirective.prototype, "resizeEnd", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('mousedown', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [MouseEvent]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], AngularResizeElementDirective.prototype, "onMouseDown", null);
    AngularResizeElementDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[resize], [resizeStart], [resizeEnd]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], AngularResizeElementDirective);
    return AngularResizeElementDirective;
}());



/***/ }),

/***/ "./projects/angular-resize-element/src/lib/angular-resize-element.enum.ts":
/*!********************************************************************************!*\
  !*** ./projects/angular-resize-element/src/lib/angular-resize-element.enum.ts ***!
  \********************************************************************************/
/*! exports provided: AngularResizeElementDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularResizeElementDirection", function() { return AngularResizeElementDirection; });
var AngularResizeElementDirection;
(function (AngularResizeElementDirection) {
    AngularResizeElementDirection["TOP"] = "top";
    AngularResizeElementDirection["TOP_RIGHT"] = "top-right";
    AngularResizeElementDirection["RIGHT"] = "right";
    AngularResizeElementDirection["BOTTOM_RIGHT"] = "bottom-right";
    AngularResizeElementDirection["BOTTOM"] = "bottom";
    AngularResizeElementDirection["BOTTOM_LEFT"] = "bottom-left";
    AngularResizeElementDirection["LEFT"] = "left";
    AngularResizeElementDirection["TOP_LEFT"] = "top-left";
})(AngularResizeElementDirection || (AngularResizeElementDirection = {}));


/***/ }),

/***/ "./projects/angular-resize-element/src/lib/angular-resize-element.module.ts":
/*!**********************************************************************************!*\
  !*** ./projects/angular-resize-element/src/lib/angular-resize-element.module.ts ***!
  \**********************************************************************************/
/*! exports provided: AngularResizeElementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularResizeElementModule", function() { return AngularResizeElementModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_resize_element_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./angular-resize-element.directive */ "./projects/angular-resize-element/src/lib/angular-resize-element.directive.ts");



var AngularResizeElementModule = /** @class */ (function () {
    function AngularResizeElementModule() {
    }
    AngularResizeElementModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_angular_resize_element_directive__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirective"]],
            imports: [],
            exports: [_angular_resize_element_directive__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirective"]]
        })
    ], AngularResizeElementModule);
    return AngularResizeElementModule;
}());



/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/angular-resize-element/angular-resize-element.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/angular-resize-element/angular-resize-element.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button (click)=\"toggle = !toggle\">toggle</button>\n\n<app-test class=\"resize-container\" #container [style.width.px]=\"data.width\" [style.height.px]=\"data.height\">\n    <div class=\"resize resize__right\"\n         (resize)=\"onResize($event)\"\n         [targetElement]=\"containerElement\"\n         [direction]=\"AngularResizeElementDirection.RIGHT\"\n    ></div>\n\n    <div class=\"resize resize__bottom--right\"\n         (resize)=\"onResize($event)\"\n         [targetElement]=\"containerElement\"\n         [direction]=\"AngularResizeElementDirection.BOTTOM_RIGHT\"\n    ></div>\n</app-test>\n"

/***/ }),

/***/ "./src/app/angular-resize-element/angular-resize-element.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/angular-resize-element/angular-resize-element.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".resize-container {\n  height: 100px;\n  width: 100px;\n  background: red; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYW5ndWxhci1yZXNpemUtZWxlbWVudC9FOlxcYW5ndWxhci1saWJzL3NyY1xcYXBwXFxhbmd1bGFyLXJlc2l6ZS1lbGVtZW50XFxhbmd1bGFyLXJlc2l6ZS1lbGVtZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBYTtFQUNiLFlBQVk7RUFDWixlQUFlLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9hbmd1bGFyLXJlc2l6ZS1lbGVtZW50L2FuZ3VsYXItcmVzaXplLWVsZW1lbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVzaXplLWNvbnRhaW5lcntcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiByZWQ7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/angular-resize-element/angular-resize-element.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/angular-resize-element/angular-resize-element.component.ts ***!
  \****************************************************************************/
/*! exports provided: AngularResizeElementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularResizeElementComponent", function() { return AngularResizeElementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _projects_angular_resize_element_src_lib_angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../projects/angular-resize-element/src/lib/angular-resize-element.enum */ "./projects/angular-resize-element/src/lib/angular-resize-element.enum.ts");



var AngularResizeElementComponent = /** @class */ (function () {
    function AngularResizeElementComponent() {
        this.AngularResizeElementDirection = _projects_angular_resize_element_src_lib_angular_resize_element_enum__WEBPACK_IMPORTED_MODULE_2__["AngularResizeElementDirection"];
        this.data = {};
    }
    AngularResizeElementComponent.prototype.onResize = function (evt) {
        this.data.width = evt.currentWidthValue;
        this.data.height = evt.currentHeightValue;
    };
    AngularResizeElementComponent.prototype.ngOnInit = function () {
        console.log(this.containerElement);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('container', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], AngularResizeElementComponent.prototype, "containerElement", void 0);
    AngularResizeElementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-angular-resize-element',
            template: __webpack_require__(/*! ./angular-resize-element.component.html */ "./src/app/angular-resize-element/angular-resize-element.component.html"),
            styles: [__webpack_require__(/*! ./angular-resize-element.component.scss */ "./src/app/angular-resize-element/angular-resize-element.component.scss")]
        })
    ], AngularResizeElementComponent);
    return AngularResizeElementComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_constans__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/constans */ "./src/app/shared/constans/index.ts");
/* harmony import */ var _angular_resize_element_angular_resize_element_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./angular-resize-element/angular-resize-element.component */ "./src/app/angular-resize-element/angular-resize-element.component.ts");





var routes = [
    {
        path: _shared_constans__WEBPACK_IMPORTED_MODULE_3__["StaticRoutingContract"].RESIZE_ELEMENT,
        component: _angular_resize_element_angular_resize_element_component__WEBPACK_IMPORTED_MODULE_4__["AngularResizeElementComponent"]
    },
    {
        path: '**',
        redirectTo: _shared_constans__WEBPACK_IMPORTED_MODULE_3__["StaticRoutingContract"].RESIZE_ELEMENT,
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100vw;\n  height: 100vh;\n  position: relative; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvRTpcXGFuZ3VsYXItbGlicy9zcmNcXGFwcFxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBYztFQUNkLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'angular-libs';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_resize_element_angular_resize_element_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./angular-resize-element/angular-resize-element.component */ "./src/app/angular-resize-element/angular-resize-element.component.ts");
/* harmony import */ var _projects_angular_resize_element_src_lib_angular_resize_element_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../projects/angular-resize-element/src/lib/angular-resize-element.module */ "./projects/angular-resize-element/src/lib/angular-resize-element.module.ts");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./test/test.component */ "./src/app/test/test.component.ts");








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _angular_resize_element_angular_resize_element_component__WEBPACK_IMPORTED_MODULE_5__["AngularResizeElementComponent"],
                _test_test_component__WEBPACK_IMPORTED_MODULE_7__["TestComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _projects_angular_resize_element_src_lib_angular_resize_element_module__WEBPACK_IMPORTED_MODULE_6__["AngularResizeElementModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/shared/constans/index.ts":
/*!******************************************!*\
  !*** ./src/app/shared/constans/index.ts ***!
  \******************************************/
/*! exports provided: RoutingContract, StaticRoutingContract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _routing_contract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routing.contract */ "./src/app/shared/constans/routing.contract.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoutingContract", function() { return _routing_contract__WEBPACK_IMPORTED_MODULE_0__["RoutingContract"]; });

/* harmony import */ var _static_routing_contract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./static-routing.contract */ "./src/app/shared/constans/static-routing.contract.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticRoutingContract", function() { return _static_routing_contract__WEBPACK_IMPORTED_MODULE_1__["StaticRoutingContract"]; });





/***/ }),

/***/ "./src/app/shared/constans/routing.contract.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/constans/routing.contract.ts ***!
  \*****************************************************/
/*! exports provided: RoutingContract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutingContract", function() { return RoutingContract; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _shared_constans_static_routing_contract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/constans/static-routing.contract */ "./src/app/shared/constans/static-routing.contract.ts");


var SmartRoutingContract = /** @class */ (function () {
    function SmartRoutingContract(props) {
        this.root = this.cloneObject(props);
        this.setParents(this.root);
        this.setFromRootPath(this.root);
    }
    SmartRoutingContract.prototype.cloneObject = function (target) {
        var _this = this;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object.keys(target || {}).reduce(function (accumulator, key) {
            if (target[key] instanceof Object) {
                accumulator[key] = _this.cloneObject(target[key]);
            }
            else if (key !== 'ROOT') {
                accumulator[key] = {
                    ROOT: target[key]
                };
            }
            else {
                accumulator[key] = target[key];
            }
            return accumulator;
        }, {}));
    };
    SmartRoutingContract.prototype.setParents = function (props, parent) {
        var _this = this;
        if (!(props instanceof Object)) {
            return;
        }
        if (parent) {
            props['parent'] = parent;
        }
        Object.keys(props).forEach(function (item) {
            if (props[item] instanceof Object && item !== 'parent') {
                _this.setParents(props[item], props);
            }
        });
    };
    SmartRoutingContract.prototype.setFromRootPath = function (props) {
        var _this = this;
        if (!(props instanceof Object)) {
            return;
        }
        props.fromRoot = this.fromRoot.bind(props);
        Object.keys(props || {}).forEach(function (item) {
            if (item !== 'parent' && item !== 'fromRoot') {
                _this.setFromRootPath(props[item]);
            }
        });
    };
    SmartRoutingContract.prototype.fromRoot = function () {
        var self = this;
        if (self.parent && self.parent.fromRoot) {
            var parent_1 = self.parent.fromRoot();
            return (parent_1 && parent_1 !== '/' ? parent_1 + "/" : '/') + self.ROOT;
        }
        return self.ROOT;
    };
    return SmartRoutingContract;
}());
var RoutingContract = new SmartRoutingContract(_shared_constans_static_routing_contract__WEBPACK_IMPORTED_MODULE_1__["StaticRoutingContract"]);


/***/ }),

/***/ "./src/app/shared/constans/static-routing.contract.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/constans/static-routing.contract.ts ***!
  \************************************************************/
/*! exports provided: StaticRoutingContract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticRoutingContract", function() { return StaticRoutingContract; });
var StaticRoutingContract = {
    RESIZE_ELEMENT: 'resize-element'
};


/***/ }),

/***/ "./src/app/test/test.component.html":
/*!******************************************!*\
  !*** ./src/app/test/test.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-content></ng-content>\n"

/***/ }),

/***/ "./src/app/test/test.component.scss":
/*!******************************************!*\
  !*** ./src/app/test/test.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdC9FOlxcYW5ndWxhci1saWJzL3NyY1xcYXBwXFx0ZXN0XFx0ZXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBYyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvdGVzdC90ZXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3R7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/test/test.component.ts":
/*!****************************************!*\
  !*** ./src/app/test/test.component.ts ***!
  \****************************************/
/*! exports provided: TestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponent", function() { return TestComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TestComponent = /** @class */ (function () {
    function TestComponent() {
        this.offsetWidth = 100;
        this.offsetHeight = 100;
    }
    TestComponent.prototype.ngOnInit = function () {
    };
    TestComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-test',
            template: __webpack_require__(/*! ./test.component.html */ "./src/app/test/test.component.html"),
            styles: [__webpack_require__(/*! ./test.component.scss */ "./src/app/test/test.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TestComponent);
    return TestComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\angular-libs\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map