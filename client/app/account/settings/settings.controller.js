'use strict';

class SettingsController {
  constructor(Auth, User, $cookies, $location) {
    this.errors = {};
    this.submittedPasswordform = false;
    this.submittedProfileform = false;
    this.Auth = Auth;
    this.User = User;

    if ($cookies.get('token') && $location.path() !== '/logout') {
      this.currentUser = User.get();
      this.user = this.currentUser;
      console.log(this.currentUser)
    }
  }

  changePassword(form) {
    this.submittedPasswordform = true;
    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then((res) => {
          Materialize.toast(res.data || "Password successfully changed.", 2000, '', function () { });
          this.submittedPasswordform = false;
          this.user = {};
        })
        .catch((res) => {
          Materialize.toast(res.data || "Incorrect Password.", 2000, '', function () { });
        });
    }
  }

  updateProfile(form) {
    this.submittedProfileform = true;
    if (form.$valid) {

      var user = {
        first_name: this.user.firstname,
        last_name: this.user.lastname,
        //gender: 'male',
        mobile: this.user.mobile,
        age: this.user.age,
        password: this.user.password,
        role: this.user.role,
        npi: this.user.npi,
        location: this.user.location,
        addresss1: this.user.addresss1,
        addresss2: this.user.addresss2,
        state: this.user.state,
        zip: this.user.zip,
        country: this.user.country
      };
      this.currentUser.$update()
      .then((res) => {
        this.submittedProfileform=false;
        Materialize.toast(res.data || "Profile updated successfully.", 2000, '', function () { });
      })
      .catch((res) => {
        Materialize.toast("Something went wrong!!.", 2000, '', function () { });
      });
    }
  }
}

angular.module('eventx')
  .controller('SettingsController', SettingsController);
