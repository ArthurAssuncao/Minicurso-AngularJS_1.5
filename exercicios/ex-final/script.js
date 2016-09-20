var app = angular.module('TaskApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngAria']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('light-green')
    .accentPalette('yellow');
});

app.config(['$routeProvider', function($routerProvider){
	$routerProvider
		.when('/novatarefas', {
			controller: "TarefaController",
			templateUrl: 'templates/novatarefa.html'
		})
		.when('/', {
			controller: "TudoController",
			templateUrl: 'templates/lista.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

app.controller('TudoController', function($rootScope, $scope){
    $scope.novaTarefa = {};
    if (typeof $rootScope.tarefas == "undefined"){
    	$rootScope.tarefas = [];
    }
    $scope.tarefas = $rootScope.tarefas;
    console.log($rootScope.tarefas);
});

app.controller('TarefaController', function($rootScope, $scope, toastService){
    $scope.submitNovaTarefa = function(){
    	$scope.novaTarefa.feito = false;
        console.log($scope.novaTarefa);
        
        toastService.showSimpleToast('Tarefa ' + $scope.novaTarefa.nome + ' criada com sucesso');
        $rootScope.tarefas.push($scope.novaTarefa);
        $scope.novaTarefa = {'nome': "", 'feito': false};
    }
});

app.service('toastService', function($rootScope, $mdToast){
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $rootScope.toastPosition = angular.extend({},last);
        $rootScope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($rootScope.toastPosition)
            .filter(function(pos) { return $rootScope.toastPosition[pos]; })
            .join(' ');
    };
    function sanitizePosition() {
        var current = $rootScope.toastPosition;
        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;
        last = angular.extend({},current);
    }
    this.showSimpleToast = function(msg) {
        $mdToast.show(
          $mdToast.simple()
            .content(msg)
            .position($rootScope.getToastPosition())
            .hideDelay(3000)
        );
    };
});