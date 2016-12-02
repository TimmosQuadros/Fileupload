/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myApp = angular.module('myApp', []);



myApp.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

myApp.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);

            $http({
                method: 'POST',
                url: uploadUrl, // The URL to Post.
                headers: {'Content-Type': undefined}, // Set the Content-Type to undefined always.
                data: fd,
                transformRequest: function (data, headersGetterFunction) {
                    return data;
                }
            })
                    .success(function (data, status) {
                        console.log("succes");
                    })
                    .error(function (data, status) {
                        
                    });
//               $http.post(uploadUrl, fd, {
//                  transformRequest: angular.identity,
//                  headers: {'Content-Type': undefined}
//               })
//            
//               .success(function(){
//               })
//            
//               .error(function(){
//               });
        };
    }]);

myApp.controller('myCtrl', ['$scope', 'fileUpload', function ($scope, fileUpload) {
        $scope.uploadFile = function () {
            var file = $scope.myFile;

            console.log('file is ');
            console.dir(file);

            var uploadUrl = "upload";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };
    }]);