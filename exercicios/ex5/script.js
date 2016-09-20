var app = angular.module("meuPrimeiroApp", ['ngRoute', 'ngMaterial']);
        
app.config( [ '$routeProvider' , function($routerProvider){
$routerProvider
  .when('/repos', {
    controller: "reposCtrl",
    templateUrl: 'repos.html'
  })
  .when('/seguidores', {
    controller: "seguidoresCtrl",
    templateUrl: 'seguidores.html'
  })
  .otherwise({
    redirectTo: ''
  });
}]);

app.controller('appCtrl', function($scope, $location) {
    $scope.clickRepos = function() {
        $location.url("/repos");
    }

    $scope.clickSeguidores = function() {
        $location.url("/seguidores");
    }
});

app.factory('FacSeg', function($http){
  return function(url, scope){
    return{
      url: url,
      scope: scope,
      get: function(){
        $http.get(url)
          .then(function successCallback(response) {
            scope.seguidores = response.data;
            console.log(scope.seguidores);
          }, function errorCallback(response) {
            console.log('Error: ' + response);
          });
      }
    }
  }
});

app.controller("seguidoresCtrl", function($scope, $http, FacSeg){
    $scope.seguidores = [];
    var seguidoresGithub = FacSeg("https://api.github.com/users/arthurassuncao/followers", $scope);
    seguidoresGithub.get();
});

app.directive("listaSeguidores", function(){
  return{
    restrict: "AEC",
    templateUrl: "seguidores.tmpl.html",
  }
});

app.factory('FacRepos', function($http){
  return function(url, scope){
    return{
      url: url,
      scope: scope,
      get: function(){
        $http.get(url)
          .then(function successCallback(response) {
            scope.repos = response.data;
            console.log(scope.repos);
          }, function errorCallback(response) {
            console.log('Error: ' + response);
          });
      }
    }
  }
});

app.controller("reposCtrl", function($scope, $http, FacRepos){
    $scope.repos = [];
    var reposGithub = FacRepos("https://api.github.com/users/arthurassuncao/repos", $scope);
    reposGithub.get();
});

app.directive("listaRepos", function(){
  return{
    restrict: "AEC",
    templateUrl: "repos.tmpl.html",
  }
});