angular.module('eventx').directive("myTooltipTemplate", function($compile) {
	var contentContainer;
	return {
		restrict: "A",
		scope: {
			myTooltipScope: "="
		},
		link: function(scope, element, attrs, ctrl, linker) {
			//var templateUrl = attrs.myTooltipTemplate;

			// element.append("<div ng-include='components/calendar/views/tooltip.tpl.html'></div>");
			// var toolTipScope = scope.$new(true);
			// angular.extend(toolTipScope, scope.myTooltipScope);
			// $compile(element.contents())(toolTipScope);


			//var templateUrl = attrs.myTooltipTemplate;
			console.log('====================================');

			scope.hidden = true;

			var tooltipElement = angular.element("<div ng-hide='hidden'>");
			tooltipElement.append("<div ng-include='components/calendar/views/tooltip.tpl.html''></div>");

			element.parent().append(tooltipElement);
			element
				.on('mouseenter', function() {
					scope.hidden = false;
					scope.$digest();
				})
				.on('mouseleave', function() {
					scope.hidden = true;
					scope.$digest();
				});

			var toolTipScope = scope.$new(true);
			angular.extend(toolTipScope, scope.myTooltipScope);
			$compile(tooltipElement.contents())(toolTipScope);
			$compile(tooltipElement)(scope);

		}
	};

});