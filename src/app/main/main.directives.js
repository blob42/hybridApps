'use strict';

angular.module('hybridApps')
  .directive('render', ['$timeout', function($timeout){
      return {
          restrict: 'EA',
          scope: {
              framerate: '=framerate',
              processing: '=processing',
              fibonacci: '=',
              delay: '='
          },
          link: function($scope, $elm, $attr) {

              var render = $elm;
              var object = $('.object');

              $scope.r_w = render[0].clientWidth;
              $scope.r_h = render[0].clientHeight;

              $scope.o_w = object[0].clientWidth;
              $scope.o_h = object[0].clientHeight;


              window.onresize = function(event) {
                  $scope.$apply(function(){
                      var render = $elm;
                      var object = $('.object');
                      $scope.r_w = render[0].clientWidth;
                      $scope.r_h = render[0].clientHeight;

                      $scope.o_w = object[0].clientWidth;
                      $scope.o_h = object[0].clientHeight;
                  })

              }

              $scope.fps = Number($scope.framerate);
              $scope.$watch('framerate', function(newVal){
                  $scope.fps = Number(newVal);
                  $scope.interval = 1000/$scope.fps;
                  console.log('interval is ', $scope.interval);
              })
              $scope.fib = Number($scope.fibonacci);

              $scope.$watch('fibonacci', function(newVal){
                  if(newVal) {
                      $scope.fib = Number(newVal);
                  }
              })

              $scope.bootstrap = false;

              var now;
              var then = Date.now();
              $scope.interval = 1000/$scope.fps;
              var delta;
              var reverse = false;

              var render_with_gpu = function(time) {
                  requestAnimationFrame(render_with_gpu);
                  now = Date.now();
                  delta = now - then;

                  if (delta > $scope.interval) {
                      then = now - (delta % $scope.interval);

                      // Drwaing here

                      var pos = $(object).position();
                      var translate = Number(window.getComputedStyle(object[0]).transform.split(',')[4]);
                      console.log(pos.left);

                      if (pos.left >= r_w - o_w - 5) {
                          reverse = true;
                      }
                      if (pos.left <= 0) {
                          reverse = false;
                      }
                      if (reverse) {
                          // Move left to 10 px
                          object[0].style.transform = 'translateX(' + ( translate - 10) + 'px)';
                          //$(object).css({
                              //left: pos.left - 10
                          //});
                      } else {
                          object[0].style.transform = 'translateX(' + (pos.left + 10) + 'px)';
                          //$(object).css({
                              //left: pos.left + 10
                          //});
                      }


                  }
              }

              var render = function(time) {

                  requestAnimationFrame(render);
                  now = Date.now();
                  delta = now - then;
                  function draw() {
                      then = now - (delta % $scope.interval);

                      // Drwaing here
                      if ($scope.processing) {
                          for (var j=0; j<$scope.fib;j++) {
                            var i;
                            var fib = []; //Initialize array!

                            fib[0] = 0;
                            fib[1] = 1;
                            for(i=2; i<=j; i++)
                            {
                                // Next fibonacci number = previous + one before previous
                                // Translated to JavaScript:
                                fib[i] = fib[i-2] + fib[i-1];
                            }
                          }
                      }


                      var pos = $(object).position();

                      if (pos.left >= $scope.r_w - $scope.o_w - 5) {
                          reverse = true;
                      }
                      if (pos.left <= 0) {
                          reverse = false;
                      }
                      if (reverse) {
                          $(object).css({
                              left: pos.left - 10
                          });
                      } else {
                          $(object).css({
                              left: pos.left + 10
                          });
                      }


                  }

                  if (delta > $scope.interval) {
                      draw();
                  }

                  if (!$scope.bootstrap) {
                      draw();
                      $scope.bootstrap = true;
                  }
              };
              if (Number($scope.delay)) {
                  console.log('starting render in ', Number($scope.delay) )

                  $timeout(function(){
                    render();
                  }, Number($scope.delay));
              } else {
                  render();
              }
              //render_with_gpu();

          }
      }
  }]);
