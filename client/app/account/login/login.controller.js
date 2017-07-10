'use strict';

class LoginController {
  constructor(Auth, $state, $rootScope) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    // this.user.email = "admin@example.com";
    // this.user.password = "admin";
    $rootScope.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then((user) => {
          // Logged in, redirect to home
          if (user && (user.role === "physician" || user.role === "admin")) {
            this.$state.go('dashboard');
          }
          else { this.$state.go('appointment'); }
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('eventx')
  .controller('LoginController', LoginController);
