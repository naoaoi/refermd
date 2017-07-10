"use strict";

angular.module('eventx').directive('fullCalendar', function ($log, $timeout, $compile) {

  var lnk = function (scope, element) {
    var $calendar = $("#calendar");
    var calendar = null;
    scope.newEvent.icon = 'mdi-action-event';
    
    $('.event-collapse').sideNav({
      menuWidth: 450,
      edge: 'right'
    });

        
    $('.event-close-collapse').click(function () {
      $('.event-collapse').sideNav('hide');
    });
    
    var alertOnEventClick = function (date, jsEvent, view) {
      
      if (date.isHoliday) { return false; }
      if (date.url) { return false; }
      if (date.PatientId != scope.currentUser._id && scope.currentUser.role==='patient') {
        Materialize.toast("You can't view other's details.", 2000, '', function () { });
        return false;
      }
      
      $timeout(function () {
        $('.event-collapse').sideNav('show');
        scope.focus = true;
        scope.newEvent = angular.copy(date);
        scope.newEvent.className = date.className.join(' ');
        scope.newEvent.PatientId=date.PatientId.toString();
        console.log(scope.newEvent.PatientId,date.PatientId);  
        scope.eve = {
          name: date.title,
          start: moment(date.start).format('MMM, D dddd'),
          from: moment(date.start).format('h:mm A'),
          to: moment(date.end || date.start).format('h:mm A')

        };
      });
    };
    
    // var date = new Date();
    //  var d = date.getDate();
    //  var m = date.getMonth();
    //  var y = date.getFullYear();
 
    //  var monthSource = new Object();
    //  monthSource.title = 'I am vacation'; // this should be string
    //  monthSource.start = new Date(y, m, d, 9, 0); // this should be date object
    //  monthSource.end = new Date(y, m, d + 2, 9, 30);
    //  monthSource.className = 'red';
    //  monthSource.isHoliday = true;
 
    //  var month = new Array();
    //  month[0] = monthSource;
    
    function initCalendar() {
      calendar = $calendar.fullCalendar({
        lang: 'en',
        editable: true,
        draggable: true,
        selectable: true,
        selectHelper: true,
        unselectAuto: false,
        eventOverlap: false,
        disableResizing: true,
        droppable: true,
        eventLimit: true, // allow "more" link when too many events
        slotEventOverlap: false,
        header: {
          left: 'title', //,today
          center: 'prevYear,prev,next,nextYear, today',
          right: scope.view, //'agendaDay' //month,agendaWeek,
        },
        // contentHeight:'auto',
        minTime:"9:00",
        maxTime:"22:00",
        defaultView: 'agendaDay',
        eventClick: alertOnEventClick,
        selectConstraint: 'businessHours',
        eventConstraint: 'businessHours',
        firstDay: 1,
        handleWindowResize: true,
        weekends: false, // Hide weekends
        businessHours: scope.slots,
        allDaySlot: true,
        googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
        viewRender: function (view, element) {
          //console.log(element);
          if (view.name === "agendaDay") {
            $('#calendar').fullCalendar('option', 'contentHeight', 'auto');
          }
          else if (view.name === "month") {
            $('#calendar').fullCalendar('option', 'contentHeight', '');
          }
        },
        eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
          var defaultDuration = moment.duration($('#calendar').fullCalendar('option', 'defaultTimedEventDuration'));
          var end = event.end || event.start.clone().add(defaultDuration);
          //console.log('end is ' + end.format());
          scope.newEvent = angular.copy(event);
          scope.newEvent.className = event.className.join(' ');
          scope.draggedAppointment();
        },
        eventResize: function (event, delta, revertFunc) {
          // console.log(event._id);
          // console.log("Start time: " + event.start.format() + "end time: " + event.end.format());
          scope.newEvent = angular.copy(event);
          scope.newEvent.className = event.className.join(' ');
          scope.draggedAppointment();

        },
        select: function (start, end, allDay) {
          console.log(scope.newEvent);
          scope.newEvent = {};
          $("#filter_patient").select2("val", "");
          scope.newEvent.icon = 'mdi-action-event';
          $timeout(function () {
            $('.event-collapse').sideNav('show');
            $("#filter_patient").select2("val", "");
            scope.focus = true;
            scope.eve = {
              start: moment(start).format('MMM, D dddd'),
              from: moment(start).format('h:mm A'),
              to: moment(end || start).format('h:mm A')
            };
            scope.newEvent.start = start, //moment(start).format('DD MMM YYYY hh:mm a');
              scope.newEvent.end = end, //moment(end).format('DD MMM YYYY hh:mm a');
              scope.newEvent.allday = allDay;
          });
          console.log(scope.newEvent);
          calendar.fullCalendar('unselect');
        },
        eventSources: [
          {
            events: function (start, end, timezone, callback) {
              // console.log(scope.events);
              callback(scope.events);
            }
          },scope.holidays
          ],
        // events: scope.events,.fc-widget-content
        // events: function(start, end, timezone, callback) {
        // 	// console.log(scope.events);
        // 	callback(scope.events);
        // },
        eventRender: function (event, element, icon) {
          // if (event.description) {
          //   element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
          // }
          if (event.url) {
            element.find('.fc-day-grid-event').addClass('indigo')
            event.className.push('red')

          }

          if (event.icon !== "") {

            // <div my-tooltip-template="tooltiptmpl.html" my-tooltip-scope="prop">Some text...</div>
            element.find('.fc-title').append("<i class=' fc-icon-top-right " + event.icon + " '></i>");
          }
        }
      });

      $('.fc-header-right, .fc-header-center', $calendar).hide();


      var fscroll = $(".fc-scroller").height();
      $('.fc-scroller').height(fscroll).perfectScrollbar({
        suppressScrollX: true
      });

      var eve = $("#event-out").height();
      $('.events-side-navigation').height(eve).perfectScrollbar({
        suppressScrollX: true
      });


      $('#bdate').pickadate({
        container: 'body',
        onClose: function () {
          $(document.activeElement).blur()
        }
      });
      $('#input_starttime').pickatime({
        twelvehour: true,
        container: 'body'
      });
    }

    // Now events will be refetched every time events scope is updated in controller!!!
    scope.$watch("events", function (newValue, oldValue) {
      //$('#calendar').fullCalendar('addEventSource', month);
      $calendar.fullCalendar('refetchEvents');
    }, true);

    scope.$watch("slots", function (newValue, oldValue) {
      if (newValue != oldValue) {
        scope.view = scope.view;
        $('#calendar').fullCalendar('destroy');
        initCalendar();
      }
    }, true);
    
    
    scope.$watch("holidays", function (newValue, oldValue) {
      if (newValue != oldValue) {
         scope.holidays=scope.holidays;
         console.log(scope.holidays);
        $('#calendar').fullCalendar('destroy');
        initCalendar();
      }
    }, true);
    

    $timeout(function () {
      console.log(scope.slots);
      scope.slots = scope.slots;
      scope.view = scope.view;
      scope.holidays=scope.holidays;
      console.log(scope.holidays);
      initCalendar();
    });

  };

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'components/calendar/views/full-calendar.tpl.html',
    scope: {
      events: "=events",
      slots: "=slots",
      view:"=view",
      holidays:"=holidays"
    },
    controller: 'CalendarCtrl',
    link: lnk
  };
});