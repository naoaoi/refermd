'use strict';

class ForgetController {
  constructor(Auth, $state,$rootScope) {
    this.errors = {};
    this.submitted = false;
    this.forget={};
    this.Auth = Auth;
    this.$state = $state;
    $rootScope.$state = $state;
  }

  forgotPassword(form) {
    this.submitted = true;
    if (form.$valid) {
        this.Auth.sendForgetPwdMail(this.forget.email)        
        .then(() => {
          this.message = 'Mail sent successfully.';
          Materialize.toast('Mail sent successfully.', 2000, '', function() { });
        })
        .catch(() => {
          form.email.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect email';
          Materialize.toast('Incorrect email.', 2000, '', function() { });
          this.message = '';
        });
    }
  }
}

angular.module('eventx')
  .controller('ForgetCtrl', ForgetController);
