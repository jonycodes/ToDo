(function(window) {
  var angular = window.angular;
  var localStorage = window.localStorage;
  angular.module('todoapp', []);

  var userList = [
    {
      id: 0,
      name: 'admin',
      password: 'todo'
    }
  ];
  localStorage.setItem('usersList', JSON.stringify(userList));
  var todos = []; // todoObj
  localStorage.setItem('todoList', JSON.stringify(todos)); // Storage of the list of todos
}(window));
