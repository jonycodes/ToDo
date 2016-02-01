(function(window) {
  var angular = window.angular;
  var localStorage = window.localStorage;

  angular.module('todoapp', ['ui.router']).run(['$state',function($state) {
        $state.go('todo.home');
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');
      $urlRouterProvider.when();
      $stateProvider.state('todo', {
          abstract: true,
          template: '<div ui-view style="width: 600px">',
          controller: 'todoctrl'
        })
        .state('todo.home', {
          url: '/home',
          templateUrl: 'templates/home.html',
          controller: 'todoctrl',
        }).state('todo.login', {
          url: '/Login',
          templateUrl: 'templates/login.html',
          controller: 'todoctrl'
        }).state('todo.app',{
          url: '/ToDoList',
          templateUrl: 'templates/app.html',
          controller: 'todoctrl'
        });

    }]);


  var userList = [{
      id: 0,
      name: "admin",
      password: "todo"
    }

  ];

  var currentUser = {
      id: null,
      name: "",
      password: ""
    }
;

  localStorage.setItem('userList', JSON.stringify(userList));
  var todos = [];
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
})(window);
