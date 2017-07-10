'use strict';

class ResetController {
	constructor(Auth, $state, $rootScope, $stateParams) {
		this.errors = {};
		this.submitted = false;
		this.user = {};
		this.Auth = Auth;
		this.$state = $state;
		$rootScope.$state = $state;
		this.passwordResetToken = $stateParams.token;
		console.log(this.passwordResetToken);
	}



	resetPassword(form) {
		this.submitted = true;
		form.password.$setValidity('unknownMailAddress', true);
		if (form.$valid) {
			// $scope.pwdResetMailSend = true;
			this.Auth.sendResetPwdMail(this.user.password, this.passwordResetToken)
				.then(() => {
					this.message = 'Mail sent successfully.';
				})
				.catch(() => {
					form.password.$setValidity('mongoose', false);
					this.errors.other = 'Incorrect password';
					this.message = '';
				});
		}
	};
}

angular.module('eventx')
	.controller('ResetCtrl', ResetController);