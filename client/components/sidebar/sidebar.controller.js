'use strict';

class SidebarController {
  constructor(Auth,$state,$rootScope,$timeout) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    $rootScope.$state = $state;
    console.log(this.isAdmin());
    $timeout(function() {
      $('.event-collapse').sideNav('hide');
      $(".sidebar-collapse").sideNav();
    });
  }
}

angular.module('eventx')
  .controller('SidebarController', SidebarController);
