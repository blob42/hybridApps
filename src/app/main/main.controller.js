'use strict';

angular.module('hybridApps')
  .controller('MainCtrl', function ($scope, hotkeys, $state, $mdSidenav, $timeout) {

      var self = this;

      function nextSlide() {
          $state.go('slides.slide', {
              slideId: Number($state.params.slideId) + 1
          })
      }

      function previousSlide() {
          if (Number($state.params.slideId) > 1) {
              $state.go('slides.slide', {
                  slideId: Number($state.params.slideId) - 1
              })
          }
      }

    hotkeys.add({
        combo: 'space',
        description: 'Next slide',
        callback: function() {
            nextSlide();
        }
      });

    hotkeys.add({
        combo: 'right',
        description: 'Next slide',
        callback: function() {
            nextSlide();
        }
      });

    hotkeys.add({
        combo: 'left',
        description: 'Previous slide',
        callback: function() {
            previousSlide();
        }
      });


      hotkeys.add({
          combo: 'ctrl+right',
          description: 'Open side nav',
          callback: function() {
              $mdSidenav('nav').toggle();

          }
      });

      hotkeys.add({
          combo: 'ctrl+left',
          description: 'Open side nav',
          callback: function() {
              $mdSidenav('nav-left').toggle();
              $timeout(function(){
                  $(document).trigger('resize');
              }, 300)

          }
      })
  })
  .controller('navCtrl', function($scope, $mdSidenav) {
    $scope.close = function () {
          $mdSidenav('nav').close()
            .then(function () {
              //$log.debug("close RIGHT is done");
            });
        };
      })
  .controller('navCtrlLeft', function($scope, $mdSidenav) {

      $scope.slide4 = {
          framerate: 5,
          processing: false,
          fibonacci: 2000
      };

      $scope.toggleProcessing = function() {
          $scope.slide4.processing = !$scope.slide4.processing;
      }

      $scope.$watch('slide4.framerate', function(newVal){
          if (newVal) {
              $scope.interval = parseInt(1000 / Number(newVal)) ;
          }
      })

    $scope.close = function () {
          $mdSidenav('nav-left').close()
            .then(function () {
              //$log.debug("close LEFT is done");
            });
        };
      })
  ;
