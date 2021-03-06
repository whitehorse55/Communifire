webpackJsonp([25],{

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskEditPageModule", function() { return TaskEditPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_task__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_mobiscroll_js_mobiscroll_angular_min__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_mobiscroll_js_mobiscroll_angular_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__lib_mobiscroll_js_mobiscroll_angular_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__task_edit__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var TaskEditPageModule = /** @class */ (function () {
    function TaskEditPageModule() {
    }
    TaskEditPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__task_edit__["a" /* TaskEditPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_7__task_edit__["a" /* TaskEditPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__lib_mobiscroll_js_mobiscroll_angular_min__["MbscModule"],
                __WEBPACK_IMPORTED_MODULE_8__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__providers_task__["a" /* TaskProvider */],
                __WEBPACK_IMPORTED_MODULE_5__providers_spaces__["a" /* SpacesProvider */]
            ]
        })
    ], TaskEditPageModule);
    return TaskEditPageModule;
}());

//# sourceMappingURL=task-edit.module.js.map

/***/ }),

/***/ 758:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_task__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_people__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TaskEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TaskEditPage = /** @class */ (function () {
    function TaskEditPage(navCtrl, taskProvider, peopleProvider, viewCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.taskProvider = taskProvider;
        this.peopleProvider = peopleProvider;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.isLoading = false;
        this.d_assigntos = [];
        this.attachFiles = [];
        this.task = this.navParams.get('task');
        console.log(this.task);
        this.spaceid = this.task.SpaceID;
        this.tasklistid = this.task.TaskListID;
        this.taskTitle = this.task.TaskName;
        this.taskSummary = this.task.TaskDescription;
        this.task.dueDate = this.task.TaskDueDate;
        this.assignedToUserID = this.task.AssignedToUserID;
    }
    TaskEditPage.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.peopleProvider.getSpaceMembers(this.spaceid, '', 1)
            .finally(function () {
        })
            .subscribe(function (res) {
            var assigntos = res.ResponseData;
            for (var i = 0; i < assigntos.length; i++) {
                _this.d_assigntos.push({
                    value: assigntos[i].UserID,
                    name: assigntos[i].UserInfoDisplayName,
                    default: assigntos[i].UserID == _this.assignedToUserID
                });
            }
        });
    };
    TaskEditPage.prototype.setAssignTo = function (usr) {
        this.assignedToUserID = usr.value;
    };
    //Attach File
    TaskEditPage.prototype.setFiles = function (files) {
        this.attachFiles = files;
    };
    TaskEditPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    TaskEditPage.prototype.save = function () {
        var _this = this;
        var body = {
            'TaskName': this.taskTitle,
            'TaskDescription': this.taskSummary,
            'TaskListID': this.tasklistid,
            'SpaceID': this.spaceid,
            'AssignedToUserID': this.assignedToUserID,
            'TaskDueDate': '2018-03-30T06:59:55'
        };
        console.log(body);
        this.taskProvider.createTask(JSON.stringify(body))
            .finally(function () {
        })
            .subscribe(function (res) {
            console.log(res);
            if (res.IsError == false) {
                _this.viewCtrl.dismiss();
            }
        });
    };
    TaskEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-task-edit',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/tasks/task-edit/task-edit.html"*/'<!--\n\n  Generated template for the TaskEditPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="blue">\n\n    <ion-title>Edit Task</ion-title>\n\n  </ion-navbar>  \n\n</ion-header>\n\n\n\n<ion-content no-margin>\n\n  <ion-card>\n\n    <div class=\'pb-10\'>\n\n      <ion-label>Task name</ion-label>\n\n      <ion-input placeholder=\'Task title\' [(ngModel)]=\'taskTitle\' [ngClass]=\'titleClass\'></ion-input>\n\n    </div>\n\n    <div class=\'pb-10\'>\n\n      <ion-label>Description</ion-label>\n\n      <ion-textarea placeholder=\'Description\' [(ngModel)]=\'taskSummary\' [ngClass]=\'summaryClass\'></ion-textarea>\n\n    </div>\n\n    <div>\n\n      <ion-label>Due Date</ion-label>\n\n      <ion-input [(ngModel)]="dueDate" mbsc-date></ion-input>\n\n    </div>\n\n    <div class=\'pb-10\'>\n\n      <drop-down-select [entity]=\'{allItems: d_assigntos, label: "Assign to", isRequired: 0}\' (select)=\'setAssignTo($event)\'></drop-down-select>\n\n    </div>\n\n    <div class=\'pt-10\'>\n\n      <attach-files (files)="setFiles($event)"></attach-files>    \n\n    </div>\n\n    <div class=\'pt-10\'>\n\n      <button ion-button class=\'btn-cancel\' color="light" (click)=\'cancel()\'>Cancel</button>\n\n      <button ion-button class=\'btn-save\' color="secondary" (click)=\'save()\'>Save</button>    \n\n    </div>\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/tasks/task-edit/task-edit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_task__["a" /* TaskProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_people__["a" /* PeopleProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], TaskEditPage);
    return TaskEditPage;
}());

//# sourceMappingURL=task-edit.js.map

/***/ })

});
//# sourceMappingURL=25.js.map