'use strict';

angular.module('hybridApps')
  .controller('slideCtrl', function ($scope) {


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

  });
