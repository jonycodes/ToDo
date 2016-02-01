(function(window) {
  "use strict";
  angular.module('todoapp')
    .controller('todoctrl', ["$scope", "$state", "validate", "storage", function($scope, $state, validate, storage) {
      var validationService = validate;
      var storageService = storage;

      //stores user credentials
      $scope.user = storageService.getCurrentUser();


      //Shows Loging Menu after user clicks continue
      //Goes back to main menu
      $scope.back = function() {
        $state.go('todo.home');
      };


      //validates the user through the validate service
      //updates the Todo list from all users if Admin
      //updates the Todo list for each user if not admin
      $scope.validate = function(user) {
        var ifAdmin = validationService.checkAdmin(user);
        var ifUser = validationService.checkUser(user);
        if (ifAdmin) {
          $state.go('todo.app');
          storageService.setCurrentUser(user);
          update(user);
        } else if (ifUser) {
          $state.go('todo.app');
          storageService.setCurrentUser(user);
          update(user);
        } else {
          window.confirm("Wrong User Name or Password!");
        }
      };
      //register a new user
      $scope.register = function(user) {
        storageService.addUser(user);
        $state.go('todo.app');
        storage.setCurrentUser(user);
      };
      //checks for "Enter" key press and adds a new todo
      //to the storage
      //updates the list
      $scope.enterKey = function($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13 && $scope.newtodo !== "") {
          storageService.addTodo($scope.user, $scope.newtodo);
          $scope.newtodo = "";
          update($scope.user);
        }
      };



      //removes todo and  updates the list
      $scope.removeTodo = function(user, todo) {
        storageService.removeTodo(user, todo);
        update(user);
      };

      //updates todo
      function update(user) {
        var usersList = storageService.getUserList();
        var todosList = storageService.getTodos(user);
        var temparray = usersList.map(function(currentUser) {
          currentUser.todos = [];
          todosList.map(function(todo) {
            if (currentUser.id === todo.id) {
              currentUser.todos.push(todo);
            }

          });
          return currentUser;
        });
        if ($scope.user.name === "admin") {
          $scope.userTodos = temparray;
        } else {
          $scope.userTodos = temparray.map(function(currentUser) {
            if (user.name === currentUser.name) {
              return currentUser;
            }
          });
        }
      }

    }]);
})(window);
