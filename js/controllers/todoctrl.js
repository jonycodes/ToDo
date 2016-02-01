(function(window) {
  "use strict";
  angular.module('todoapp')
    .controller('todoctrl', ["$scope", "$state", "storage", function($scope, $state, storage) {
      var storageService = storage;

      //Loads current user and updates its todolist
      $scope.user = storageService.getCurrentUser();

      //loads todos when logged in
      if ($scope.user !== null) {
        update($scope.user);
      }

      //Goes back to main menu
      $scope.back = function() {
        $state.go('todo.home');
      };

      //validates the user through the validate service
      //updates the Todo list from all users if Admin
      //updates the Todo list for each user if not admin
      $scope.validate = function(user) {
        var ifUser = storageService.findUser(user);
        if (ifUser) {
          $state.go('todo.app');
          storageService.setCurrentUser(user);
        } else {
          window.confirm("Wrong User Name or Password!");
        }
      };
      //register a new user
      $scope.register = function(user) {
        if (storageService.findUser(user)) {
          window.confirm("Username Name Taken");
        } else {
          storageService.addUser(user);
          storage.setCurrentUser(user);
          $state.go('todo.app');
        }
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

      //update todos
      function update(user) {
        var todosList = storageService.getTodos(user);
        if ($scope.user.name === "admin") {
          $scope.userTodos = todosList;
        } else {
          $scope.userTodos = todosList.map(function(currentUser) {
            if (user.name === currentUser.name) {
              return currentUser;
            }
          });
        }
      }

    }]);
})(window);
