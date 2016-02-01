(function(window) {
  'use strict';
  var angular = window.angular;
  var localStorage = window.localStorage;

  angular.module('todoapp') //valitades the user
    //stores the todos and user's credentials
    .factory('storage', [function() {
      var findUser = function(user) {
        var userList = JSON.parse(localStorage.getItem('userList'));
        var pos = userList.map(function(currentUser) {
          return currentUser.name;
        }).indexOf(user.name);

        if (pos < 0) return null;
        return user.password === userList[pos].password ? userList[pos] : null;
      };
      var getCurrentUser = function() {
        return JSON.parse(localStorage.getItem('currentUser'));
      };
      var setCurrentUser = function(user) {
        var currentUser = findUser(user);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      };
      var addUser = function(user) {
        var userList = JSON.parse(localStorage.getItem('userList'));
        userList.push({
          id: userList.length,
          name: user.name,
          password: user.password
        });
        localStorage.setItem('userList', JSON.stringify(userList));
      };

      var addTodo = function(user, newtodo) {
        var currentUser = findUser(user);
        var todos = JSON.parse(localStorage.getItem('todos'));
        if (!currentUser) return;
        todos.push({
          id: currentUser.id,
          todo: newtodo
        });
        localStorage.setItem('todos', JSON.stringify(todos));
      };

      var getTodos = function(user) {
        var usersList = JSON.parse(localStorage.getItem('userList'));
        var todosList = JSON.parse(localStorage.getItem('todos'));
        var currentUser = user;
        var temparray = usersList.map(function(currentUser) {
          currentUser.todos = [];
          todosList.map(function(todo) {
            if (currentUser.id === todo.id) {
              currentUser.todos.push(todo);
            }
          });
          return currentUser;
        });
        return temparray;
      };

      var removeTodo = function(user, todo) {
        var todoList = JSON.parse(localStorage.getItem('todos'));
        if (!user)
          return null;
        var pos = todoList.map(function(currentTodo) {
          if (user.id == currentTodo.id) {
            return currentTodo.todo;
          }
        }).indexOf(todo);
        todoList.splice(pos, 1);
        localStorage.setItem('todos', JSON.stringify(todoList));
      };

      var getUserList = function() {
        return JSON.parse(localStorage.getItem('userList'));
      };

      return {
        findUser: findUser,
        addUser: addUser,
        addTodo: addTodo,
        getTodos: getTodos,
        removeTodo: removeTodo,
        getUserList: getUserList,
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser
      };
    }]).filter('firstToUpperCase', [function() {
      return function(input) {
        if (!input) return;
        var firstletter = input.slice(0, 1);
        var finalletters = input.slice(1, input.length);
        return firstletter.toUpperCase() + finalletters;
      };
    }]);
})(window);
