var app = angular.module("meuPrimeiroApp", ['ngRoute']);

app.config( [ '$routeProvider' , function($routerProvider){
$routerProvider
  .when('/repositorios', {
    controller: "RepoCtrl",
    templateUrl: 'repos.html'
  })
  .when('/seguidores', {
    controller: "SegCtrl",
    templateUrl: 'seg.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

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

app.factory('FacSegs', function($http){
  return function(url, scope){
    return{
      url: url,
      scope: scope,
      get: function(){
        $http.get(url)
          .then(function successCallback(response) {
            scope.seguidores = response.data;
            console.log(scope.repos);
          }, function errorCallback(response) {
            console.log('Error: ' + response);
          });
      }
    }
  }
});

app.controller("RepoCtrl", function($scope, $http, FacRepos){
    $scope.repos = [];
    var reposGithub = FacRepos("https://api.github.com/users/arthurassuncao/repos", $scope);
    reposGithub.get();
});

app.controller("SegCtrl", function($scope, $http, FacSegs){
    $scope.seguidores = [];
    var reposGithub = FacSegs("https://api.github.com/users/arthurassuncao/followers", $scope);
    reposGithub.get();
});

app.controller("primeiroCtrl", function($scope){
   
});

app.directive("listaRepos", function(){
  return{
    restrict: "E",
    templateUrl: 'repo.tmpl.html'
  }
});

app.directive("listaSeg", function(){
  return{
    restrict: "E",
    templateUrl: 'seg.tmpl.html'
  }
});
