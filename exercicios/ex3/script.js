var app = angular.module("meuPrimeiroApp", []);

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

app.controller("primeiroCtrl", function($scope, $http, FacRepos){
    $scope.repos = [];
    var reposGithub = FacRepos("https://api.github.com/users/arthurassuncao/repos", $scope);
    reposGithub.get();
});

app.directive("listaRepos", function(){
  return{
    restrict: "E",
    template: '<ul><li ng-repeat="repo in repos | filter:{name: termo}">{{ repo.name }}</li></ul>'
  }
});
