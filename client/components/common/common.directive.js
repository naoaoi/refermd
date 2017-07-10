var app = angular.module('eventx');
var INTEGER_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,50})$', 'i');
app.directive('cemail', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if (INTEGER_REGEXP.test(viewValue)) {
					// it is valid
					ctrl.$setValidity('cemail', true);
					return viewValue;
				} else {
					// it is invalid, return undefined (no model update)
					ctrl.$setValidity('cemail', false);
					return undefined;
				}
			});
		}
	};
});
app.directive('focus',
	function($timeout) {
		return {
			scope: {
				trigger: '@focus'
			},
			link: function(scope, element) {
				scope.$watch('trigger', function(value) {
					if (value === "true") {
						$timeout(function() {
							element[0].focus();
						});
					}
				});
			}
		};
	});
app.directive('numbersOnly', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				if (text) {
					var transformedInput = text.replace(/[^0-9]/g, '');

					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
					}
					return transformedInput;
				}
				return undefined;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
});

app.directive('pikDate', function() {
	return {
		// Restrict it to be an attribute in this case
		restrict: 'A',
		// responsible for registering DOM listeners as well as updating the DOM
		link: function(scope, element, attrs) {
			var picker = new Pikaday({
				field: document.getElementById(attrs.id)
			});
			//picker.gotoDate(new Date(2015, 11))
			picker.setDate(new Date());
		}
	};
})
app.directive('select2Custom', function() {
	return {
		// Restrict it to be an attribute in this case
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.select2({tags: true});

		}
	};
});
app.directive('compareTo', function () {
	return {
		require: "ngModel",
		scope: {
			otherModelValue: "=compareTo"
		},
		link: function (scope, element, attributes, ngModel) {
			//if(!scope.otherModelValue) return;
			ngModel.$validators.compareTo = function (modelValue) {
				//console.log("scope.otherModelValue"+scope.otherModelValue);
				//console.log("modelValue"+modelValue);
				return modelValue == scope.otherModelValue;
			};

			scope.$watch("otherModelValue", function () {
				ngModel.$validate();
			});
		}
	};
});
	app.directive('blink', function($timeout) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            function showElement() {
                $element.css("display", "inline");
                $timeout(hideElement, 1000);
            }

            function hideElement() {
                $element.css("display", "none");
                $timeout(showElement, 1000);
            }
            showElement();
        },
        template: '<span ng-transclude></span>',
        replace: true
    };
});