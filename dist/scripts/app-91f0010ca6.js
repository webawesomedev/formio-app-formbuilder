!function(){"use strict";angular.module("formioApp",["ngSanitize","ui.router","ui.bootstrap","ui.bootstrap.accordion","ui.bootstrap.alert","ngFormioHelper","ngFormBuilder","bgf.paginateAnything","formio","ngMap"])}(),function(){"use strict";angular.module("formioApp").provider("UserResource",function(){return{$get:function(){return null},base:"users."}})}(),function(){"use strict";angular.module("formioApp").config(["formioComponentsProvider",function(o){o.register("icons",{title:"Icons",template:"formio/components/icons.html",controller:["$scope",function(o){o.setValue=function(e){o.data[o.component.key]=e}}],group:"custom",icon:"fa fa-smile-o",settings:{input:!0,icons:[{value:5,icon:"fa fa-thumbs-o-up"},{value:4,icon:"fa fa-smile-o"},{value:3,icon:"fa fa-meh-o"},{value:2,icon:"fa fa-frown-o"},{value:1,icon:"fa fa-thumbs-o-down"}],fontSize:"2em",activeColor:"green",multiple:!1,"protected":!1,persistent:!0,tableView:!1},views:[{name:"Display",template:"formio/components/icons/display.html"},{name:"Validation",template:"formio/components/icons/validate.html"},{name:"API",template:"formio/components/common/api.html"},{name:"Layout",template:"formio/components/common/layout.html"},{name:"Conditional",template:"formio/components/common/conditional.html"}]})}]).run(["$templateCache","FormioUtils",function(o,e){o.put("formio/components/icons.html",e.fieldWrap('<i ng-repeat="icon in component.icons" ng-style="{ color: (data[component.key] == icon.value ? component.activeColor : \'\'), \'font-size\': component.fontSize }" ng-click="setValue(icon.value)" class="{{icon.icon}}" aria-hidden="true"></i>')),o.put("formio/components/icons/display.html",'<ng-form>  <form-builder-option property="label"></form-builder-option>  <value-builder data="component.icons" label-label="Icon" label-property="icon"></value-builder>  <form-builder-option property="fontSize" label="Font Size"></form-builder-option>  <form-builder-option property="activeColor" label="Active Color"></form-builder-option>  <form-builder-option property="customClass"></form-builder-option>  <form-builder-option property="protected"></form-builder-option>  <form-builder-option property="persistent"></form-builder-option>  <form-builder-option property="tableView"></form-builder-option></ng-form>'),o.put("formio/components/icons/validate.html",'<ng-form><form-builder-option property="validate.required"></form-builder-option></ng-form>')}])}(),function(){"use strict";angular.module("formioApp").run(["$rootScope","AppConfig","FormioAuth",function(o,e,t){t.init(),angular.forEach(e.forms,function(e,t){o[t]=e})}])}(),function(){"use strict";function o(o,e,t,n,i,r){o.state("home",{url:"/",templateUrl:"views/main.html",controller:["$scope",function(o){o.forms=[],o.formsUrl=n.appUrl+"/form?type=form&tags=common",o.formsPerPage=5}]}).state("createForm",{url:"/create/:formType",templateUrl:"views/form/create.html",controller:"FormController"}).state("form",{"abstract":!0,url:"/form/:formId",templateUrl:"views/form/form.html",controller:"FormController"}).state("users",{"abstract":!0,url:"/users",templateUrl:"views/users.html"}).state("form.view",{url:"/",parent:"form",templateUrl:"views/form/view.html"}).state("form.edit",{url:"/edit",parent:"form",templateUrl:"views/form/edit.html"}).state("form.delete",{url:"/delete",parent:"form",templateUrl:"views/form/delete.html"}),angular.forEach(n.resources,function(o,e){i.register(e,o.form,t.get(o.resource+"Provider"))}),r.register("userform",n.appUrl,{});var s={};s["form.submission"]={path:"/submission",id:"subId",controller:"FormSubmissionController"},s["form.action"]={path:"/action",id:"actionId",controller:"FormActionController"},angular.forEach(s,function(e,t){o.state(t,{"abstract":!0,url:e.path,parent:"form",template:"<div ui-view></div>"}).state(t+".index",{url:"",parent:t,templateUrl:"views/form"+e.path+"/index.html",controller:e.controller}).state(t+".item",{"abstract":!0,url:"/:"+e.id,parent:t,controller:e.controller,templateUrl:"views/form"+e.path+"/item.html"}).state(t+".item.view",{url:"",parent:t+".item",templateUrl:"views/form"+e.path+"/view.html"}).state(t+".item.edit",{url:"/edit",parent:t+".item",templateUrl:"views/form"+e.path+"/edit.html"}).state(t+".item.delete",{url:"/delete",parent:t+".item",templateUrl:"views/form"+e.path+"/delete.html"})}),o.state("form.action.add",{url:"/add/:actionName",parent:"form.action",templateUrl:"views/form/action/add.html",controller:"FormActionController",params:{actionInfo:null}}),o.state("form.permission",{url:"/permission",parent:"form",templateUrl:"views/form/permission/index.html",controller:"RoleController"}),e.otherwise("/")}o.$inject=["$stateProvider","$urlRouterProvider","$injector","AppConfig","FormioResourceProvider","FormioFormsProvider"],angular.module("formioApp").constant("SubmissionAccessLabels",{read_all:{label:"Read All Submissions",tooltip:"The Read All Submissions permission will allow a user, with one of the given Roles, to read a Submission, regardless of who owns the Submission."},update_all:{label:"Update All Submissions",tooltip:"The Update All Submissions permission will allow a user, with one of the given Roles, to update a Submission, regardless of who owns the Submission. Additionally with this permission, a user can change the owner of a Submission."},delete_all:{label:"Delete All Submissions",tooltip:"The Delete All Submissions permission will allow a user, with one of the given Roles, to delete a Submission, regardless of who owns the Submission."},create_own:{label:"Create Own Submissions",tooltip:"The Create Own Submissions permission will allow a user, with one of the given Roles, to create a Submission. Upon creating the Submission, the user will be defined as its owner."},read_own:{label:"Read Own Submissions",tooltip:"The Read Own Submissions permission will allow a user, with one of the given Roles, to read a Submission. A user can only read a Submission if they are defined as its owner."},update_own:{label:"Update Own Submissions",tooltip:"The Update Own Submissions permission will allow a user, with one of the given Roles, to update a Submission. A user can only update a Submission if they are defined as its owner."},delete_own:{label:"Delete Own Submissions",tooltip:"The Delete Own Submissions permission will allow a user, with one of the given Roles, to delete a Submission. A user can only delete a Submission if they are defined as its owner."}}).directive("permissionEditor",["$q","SubmissionAccessLabels",function(o,e){var t=["create_all","read_all","update_all","delete_all","create_own","read_own","update_own","delete_own"];return{scope:{roles:"=",permissions:"=",waitFor:"="},restrict:"E",templateUrl:"views/form/permission/editor.html",link:function(n){(n.waitFor||o.when()).then(function(){var o=[];_.each(t,function(e){var t=_.find(n.permissions,{type:e});o.push(t||{type:e,roles:[]})}),n.permissions.splice.apply(n.permissions,[0,n.permissions.length].concat(o))}),n.getPermissionsToShow=function(){return n.permissions.filter(n.shouldShowPermission)},n.shouldShowPermission=function(o){return!!e[o.type]},n.getPermissionLabel=function(o){return e[o.type].label},n.getPermissionTooltip=function(o){return e[o.type].tooltip}}}}]).controller("RoleController",["$scope","AppConfig","$http",function(o,e,t){t.get(e.appUrl+"/role").then(function(e){o.roles=e.data})}]).controller("FormController",["$scope","$stateParams","$state","Formio","AppConfig","FormioAlerts",function(o,e,t,n,i,r){o.loading=!0,o.formId=e.formId,o.formUrl=i.appUrl+"/form",o.appUrl=i.appUrl,o.formUrl+=e.formId?"/"+e.formId:"",o.form={components:[],type:e.formType?e.formType:"form",tags:["common"]},o.formio=new n(o.formUrl),e.formId?o.formio.loadForm().then(function(e){o.form=e},r.onError.bind(r)):o.form.submissionAccess||n.makeStaticRequest(n.getAppUrl()+"/role").then(function(e){angular.forEach(e,function(e){e.admin||e["default"]||(o.form.submissionAccess=[{type:"create_own",roles:[e._id]},{type:"read_own",roles:[e._id]},{type:"update_own",roles:[e._id]},{type:"delete_own",roles:[e._id]}])})}),o.titleChange=function(e){o.form.name&&o.form.name!==_.camelCase(e)||(o.form.name=_.camelCase(o.form.title))},o.$on("formSubmission",function(o,e){r.addAlert({type:"success",message:"New submission added!"}),e._id&&t.go("form.submission.item.view",{subId:e._id})}),o.$on("pagination:error",function(){o.loading=!1}),o.$on("pagination:loadPage",function(){o.loading=!1}),o.$on("formUpdate",function(e,t){o.form.components=t.components}),o.$on("formError",function(o,e){r.onError(e)}),o.$on("delete",function(){r.addAlert({type:"success",message:"Form was deleted."}),t.go("home")}),o.$on("cancel",function(){t.go("form.view")}),o.saveForm=function(){o.formio.saveForm(angular.copy(o.form)).then(function(o){var n=e.formId?"updated":"created";r.addAlert({type:"success",message:"Successfully "+n+" form!"}),t.go("form.view",{formId:o._id})},r.onError.bind(r))}}]).controller("FormActionController",["$scope","$stateParams","$state","Formio","AppConfig","FormioAlerts","FormioUtils","$q",function(o,e,t,n,i,r,s,a){o.actionUrl="",o.actionInfo=e.actionInfo||{settingsForm:{}},o.action={data:{settings:{},condition:{}}},o.newAction={name:"",title:"Select an Action"},o.availableActions={},o.addAction=function(){o.newAction.name?t.go("form.action.add",{actionName:o.newAction.name}):r.onError({message:"You must select an action to add.",element:"action-select"})},o.formio.loadActions().then(function(e){o.actions=e},r.onError.bind(r)),o.formio.availableActions().then(function(e){e[0].name||e.shift(),e.unshift(o.newAction),o.availableActions=e});var l=function(e){return o.formio.actionInfo(e).then(function(e){return e?(o.actionInfo=_.merge(o.actionInfo,e),o.actionInfo):void 0})},m=function(e){e&&"sql"===e.name&&s.eachComponent(e.settingsForm.components,function(o){"settings[type]"===o.key&&0===JSON.parse(o.data.json).length&&r.warn('<i class="glyphicon glyphicon-exclamation-sign"></i> You do not have any SQL servers configured. You can add a SQL server in the config/default.json configuration.')}),e&&"email"===e.name&&s.eachComponent(e.settingsForm.components,function(o){"settings[transport]"===o.key&&JSON.parse(o.data.json).length<=1&&r.warn('<i class="glyphicon glyphicon-exclamation-sign"></i> You do not have any email transports configured. You need to add them in the config/default.json configuration.')}),e&&"auth"===e.name&&o.$watch("action.data.settings",function(o,t){o.hasOwnProperty("association")&&angular.element("#form-group-role").css("display","new"===o.association?"":"none"),o.hasOwnProperty("association")&&t.hasOwnProperty("association")&&o.association!==t.association&&(s.eachComponent(e.settingsForm.components,function(e){e.key&&"role"===e.key&&(e.validate=e.validate||{},e.validate.required="new"===o.association?!0:!1)}),o.role=o.role&&"new"===o.association||"")},!0),e&&"role"===e.name&&r.warn("<i class=\"glyphicon glyphicon-exclamation-sign\"></i> The Role Assignment Action requires a Resource Form component with the API key, 'submission', to modify existing Resource submissions.")},c=function(t){if(e.actionId){o.actionUrl=o.formio.formUrl+"/action/"+e.actionId;var i=new n(o.actionUrl);return i.loadAction().then(function(e){return o.action=_.merge(o.action,{data:e}),l(e.name)})}return o.action=_.merge(o.action,{data:t}),o.action.data.settings={},a.when(o.actionInfo)};!e.actionInfo&&e.actionName?l(e.actionName).then(function(o){c(o.defaults).then(m)}):c(o.actionInfo.defaults).then(m),o.$on("formSubmission",function(o){o.stopPropagation(),r.addAlert({type:"success",message:"Action was updated."}),t.go("form.action.index")}),o.$on("delete",function(o){o.stopPropagation(),r.addAlert({type:"success",message:"Action was deleted."}),t.go("form.action.index")}),o.$on("cancel",function(o){o.stopPropagation(),t.go("form.action.index")})}]).controller("FormSubmissionController",["$scope","$stateParams","$state","Formio","AppConfig","FormioAlerts",function(o,e,t,n,i,r){o.token=n.getToken(),o.submissionId=e.subId,o.submissionUrl=o.formUrl,o.submissionUrl+=e.subId?"/submission/"+e.subId:"",o.submissionData=n.submissionData,o.submission={},o.formio=new n(o.submissionUrl),o.formio.loadSubmission().then(function(e){o.submission=e}),o.$on("formSubmission",function(e,n){e.stopPropagation();var i="put"===n.method?"updated":"created";r.addAlert({type:"success",message:"Submission was "+i+"."}),t.go("form.submission.index",{formId:o.formId})}),o.$on("delete",function(o){o.stopPropagation(),r.addAlert({type:"success",message:"Submission was deleted."}),t.go("form.submission.index")}),o.$on("cancel",function(o){o.stopPropagation(),t.go("form.submission.item.view")}),o.$on("formError",function(o,e){o.stopPropagation(),r.onError(e)}),o.$on("submissionView",function(o,e){t.go("form.submission.item.view",{subId:e._id})}),o.$on("submissionEdit",function(o,e){t.go("form.submission.item.edit",{subId:e._id})}),o.$on("submissionDelete",function(o,e){t.go("form.submission.item.delete",{subId:e._id})})}]).config(o)}(),function(){"use strict";angular.module("formioApp").constant("moment",moment)}(),function(){"use strict";angular.module("formioApp").config(["AppConfig","FormioProvider","FormioAuthProvider","formioComponentsProvider",function(o,e,t,n){e.setAppUrl(o.appUrl),e.setBaseUrl(o.apiUrl),t.setForceAuth(!0),t.setStates("auth.login","home"),t.register("login","user","login"),n.addGroup("custom",{title:"Custom Components"})}])}();