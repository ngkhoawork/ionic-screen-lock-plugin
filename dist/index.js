"use strict";var lockScreenService=function(o){return{show:function(n){o.$broadcast("ionic-lock-screen:show",{touchId:n.touchId||!1,ACDelbuttons:n.ACDelbuttons||!1,passcode:n.code||null,onCorrect:n.onCorrect||null,onWrong:n.onWrong||null,onBottomButton:n.onBottomButton||null,bottomButton:n.bottomButton||!1,abovePasscodeLabel:n.abovePasscodeLabel||null,passcodeLabel:n.passcodeLabel||"Enter Passcode",touchLabel:n.touchLabel,bottomButtonLabel:n.bottomButtonLabel||"Cancel",backgroundColor:n.backgroundColor||"#F1F1F1",textColor:n.textColor||"#464646",buttonColor:n.buttonColor||"#F8F8F8",buttonTextColor:n.buttonTextColor||"#464646",buttonPressed:n.buttonPressed||"#E0E0E0",buttonACColor:n.buttonACColor||"#F8F8F8",buttonACTextColor:n.buttonACTextColor||"#464646",buttonDelColor:n.buttonDelColor||"#F8F8F8",buttonDelTextColor:n.buttonDelTextColor||"#464646",maxAttempts:n.maxAttempts||null})}}};lockScreenService.$inject=["$rootScope"];var lockScreenDirective=function(o){return{restrict:"E",scope:{},link:function(n){var t=0;n.enteredPasscode="",n.$on("ionic-lock-screen:show",function(t,e){n._showLockScreen=!0,n.ACDelbuttons=e.ACDelbuttons,n.passcode=e.passcode,n.onCorrect=e.onCorrect,n.onWrong=e.onWrong,n.onBottomButton=e.onBottomButton,n.bottomButton=e.bottomButton,n.abovePasscodeLabel=e.abovePasscodeLabel,n.passcodeLabel=e.passcodeLabel,n.touchLabel=e.touchLabel,n.bottomButtonLabel=e.bottomButtonLabel,n.backgroundColor=e.backgroundColor,n.textColor=e.textColor,n.buttonColor=e.buttonColor,n.buttonTextColor=e.buttonTextColor,n.buttonPressed=e.buttonPressed,n.buttonACColor=e.buttonACColor,n.buttonACTextColor=e.buttonACTextColor,n.buttonDelColor=e.buttonDelColor,n.buttonDelTextColor=e.buttonDelTextColor,n.maxAttempts=e.maxAttempts,o(function(){e.touchId&&window.touchid&&window.touchid.checkSupport(function(){window.touchid.authenticate(function(){n.$apply(function(){n._showLockScreen=!1}),n.onCorrect&&n.onCorrect()},function(){},n.touchLabel)},function(){console.info("touch id is not supported on your device")})},50)}),n.all_clear=function(){n.enteredPasscode=""},n["delete"]=function(){n.enteredPasscode=n.enteredPasscode.slice(0,-1)},n.BottomButtonAction=function(){n.onBottomButton&&n.onBottomButton(),n._showLockScreen=!1},n.digit=function(e){n.selected=+e,n.passcodeWrong||(n.enteredPasscode+=""+e,n.enteredPasscode.length>=4&&(null!=n.passcode?n.enteredPasscode===""+n.passcode?(n.enteredPasscode="",t=0,n.onCorrect&&n.onCorrect(),n._showLockScreen=!1):(n.passcodeWrong=!0,t++,null!=n.maxAttempts&&t>=n.maxAttempts?(n.onWrong&&n.onWrong(t),n._showLockScreen=!1):null==n.maxAttempts&&n.onWrong&&n.onWrong(t),o(function(){n.enteredPasscode="",n.passcodeWrong=!1},800)):(n.onCorrect&&n.onCorrect(n.enteredPasscode),n.enteredPasscode="",t=0,n._showLockScreen=!1)))}},template:'\n      <style>\n          /* Animations*/\n          @keyframes ILS_shake {\n            from, to {\n              transform: translate3d(0, 0, 0);\n            }\n            10%, 30%, 50%, 70%, 90% {\n              transform: translate3d(-10px, 0, 0);\n            }\n            20%, 40%, 60%, 80% {\n              transform: translate3d(10px, 0, 0);\n            }\n          }\n          @keyframes ILS_buttonPress {\n            0% {\n              background-color: {{buttonPressed}};\n            }\n            100% {\n              background-color: {{buttonColor}};\n            }\n          }\n          /* Lock Screen Layout*/\n          .ILS_lock {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            z-index: 999;\n            background-color: {{backgroundColor}};\n          }\n          .ILS_lock-hidden {\n            display: none;\n          }\n          .ILS_label-row {\n            height: 50px;\n            width: 100%;\n            text-align: center;\n            font-size: 23px;\n            padding-top: 10px;\n            color: {{textColor}};\n          }\n          .ILS_circles-row {\n            display: flex;\n            flex-direction: row;\n            justify-content: center;\n            width: 100%;\n            height: 60px;\n          }\n          .ILS_circle {\n            background-color: {{backgroundColor}}!important;\n            border-radius: 50%;\n            width: 10px;\n            height: 10px;\n            border:solid 1px {{textColor}};\n            margin: 0 15px;\n          }\n          .ILS_numbers-row {\n            display: flex;\n            flex-direction: row;\n            justify-content: center;\n            width: 100%;\n            height: 100px;\n          }\n          .ILS_digit {\n            margin: 0 14px;\n            width: 80px;\n            border-radius: 10%;\n            height: 80px;\n            text-align: center;\n            padding-top: 29px;\n            font-size: 21px;\n            color: {{buttonTextColor}};\n            background-color: {{buttonColor}};\n          }\n          .ILS_digit.activated {\n            -webkit-animation-name: ILS_buttonPress;\n            animation-name: ILS_buttonPress;\n            -webkit-animation-duration: 0.3;\n            animation-duration: 0.3s;\n          }\n          .ILS_ac {\n            color: {{buttonACTextColor}};\n            background-color: {{buttonACColor}};\n            }\n          .ILS_del {\n            color: {{buttonDelTextColor}};\n            background-color: {{buttonDelColor}};\n            }\n          .ILS_full {\n            background-color:{{textColor}}!important;\n          }\n          .ILS_shake {\n            -webkit-animation-name: ILS_shake;\n            animation-name: ILS_shake;\n            -webkit-animation-duration: 0.5;\n            animation-duration: 0.5s;\n            -webkit-animation-fill-mode: both;\n            animation-fill-mode: both;\n          }\n      </style>\n      <div class="ILS_lock" ng-class="!_showLockScreen ?  \'ILS_lock-hidden\' : \'\'">\n        <div style="text-align: center;">\n          {{abovePasscodeLabel}}\n        </div>\n        <div class="ILS_label-row">\n          {{passcodeLabel}}\n        </div>\n        <div class="ILS_circles-row" ng-class="passcodeWrong ?  \'ILS_shake\' : \'\'">\n          <div class="ILS_circle" ng-class=" enteredPasscode.length>0 ? \'ILS_full\' : \'\'"></div>\n          <div class="ILS_circle" ng-class=" enteredPasscode.length>1 ? \'ILS_full\' : \'\'"></div>\n          <div class="ILS_circle" ng-class=" enteredPasscode.length>2 ? \'ILS_full\' : \'\'"></div>\n          <div class="ILS_circle" ng-class=" enteredPasscode.length>3 ? \'ILS_full\' : \'\'"></div>\n        </div>\n        <div class="ILS_numbers-row">\n          <div ng-click="digit(1)" class="ILS_digit">1</div>\n          <div ng-click="digit(2)" class="ILS_digit">2</div>\n          <div ng-click="digit(3)" class="ILS_digit">3</div>\n        </div>\n        <div class="ILS_numbers-row">\n          <div ng-click="digit(4)" class="ILS_digit">4</div>\n          <div ng-click="digit(5)" class="ILS_digit">5</div>\n          <div ng-click="digit(6)" class="ILS_digit">6</div>\n        </div>\n        <div class="ILS_numbers-row">\n          <div ng-click="digit(7)" class="ILS_digit">7</div>\n          <div ng-click="digit(8)" class="ILS_digit">8</div>\n          <div ng-click="digit(9)" class="ILS_digit">9</div>\n        </div>\n        <div class="ILS_numbers-row">\n          <div ng-show="ACDelbuttons" ng-click="all_clear()" class="ILS_digit ILS_ac">AC</div>\n          <div ng-click="digit(0)" class="ILS_digit">0</div>\n          <div ng-show="ACDelbuttons" ng-click="delete()" class="ILS_digit ILS_del">DEL</div>\n        </div>\n        <button class="button button-small button-assertive" ng-click="BottomButtonAction()" ng-if="bottomButton">\n            {{bottomButtonLabel}}\n        </button>\n      </div>\n    '}};lockScreenDirective.$inject=["$timeout"],angular.module("ionic-lock-screen",[]),angular.module("ionic-lock-screen").directive("lockScreen",lockScreenDirective),angular.module("ionic-lock-screen").service("$lockScreen",lockScreenService);