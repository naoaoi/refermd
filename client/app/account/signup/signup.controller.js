'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $rootScope) {
    this.Auth = Auth;
    this.$state = $state;
    $rootScope.$state = $state;
    //$('select').material_select();
  }

  register(form) {
    this.submitted = true;
    console.log(form.$valid)
    if (form.$valid) {
      this.Auth.createUser({
        first_name: this.user.firstname,
        last_name: this.user.lastname,
        email: this.user.email,
        // gender: 'male',
        // mobile: '1234567890',
        // age: 15,
        password: this.user.password,
        role: this.user.role,
        npi: this.user.npi,
        location: this.user.location,
        addresss1: this.user.addresss1,
        addresss2: this.user.addresss2,
        state: this.user.state,
        zip: this.user.zip,
        country: this.user.country
      })
        .then(() => {
          // Account created, redirect to home
          if (this.user.role && (this.user.role === "physician" || this.user.role === "admin")) {
            this.$state.go('dashboard');
          }
          else {
            this.$state.go('main');
          }

        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}

angular.module('eventx')
  .controller('SignupController', SignupController);
