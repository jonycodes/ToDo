(function(window) {
  "use strict";
  var angular = window.angular;
  var localStorage = window.localStorage;
  angular.module('todoapp'). //valitades the user
  factory('validate', ['storage',function(storage) {
			// gets the list of users
			var usersList = JSON.parse(localStorage.getItem('usersList'));
			// positions of admin
			var pos = usersList.map(function(users){
				return users.name;
			}).indexOf('admin');
			// admin obj
			var admin = usersList[pos];

      return {
        checkAdmin: function(user, password) {
          return (user === admin.name) && (password === admin.password);
        },
        checkUser: function(user, password) {
          return storage.findUser(user, password);
        }
      };
    }
  ]). //stores the todos and user's credentials
  factory('storage', [function() {

      //Gets the user object from the list
      var getUser = function(user) {
        var userList = JSON.parse(localStorage.getItem('usersList'));
        var pos = userList.map(function(currentUser) {
          return currentUser.name;
        }).indexOf(user.name);
				if(pos < 0) return null;
				return userList[pos];
      };

      /**
							Queries the list of users inside of the storage
							returns true or false if the user is found or not
						*/
      var findUser = function(user, password) {
        var usersList = JSON.parse(localStorage.getItem('usersList'));
        var currentUser = usersList.map(function(currentUser) {
          return (currentUser.name === user) && (currentUser.password === password);
        });
        return currentUser.length === 1;
      };
      /**
							Adds the user into the storage of users
						*/
      var addUser = function(user, password) {
        var usersList = JSON.parse(localStorage.getItem('usersList'));
        usersList.push({id: userList.length, name: user, password: password});
        localStorage.setItem('usersList', JSON.stringify(usersList));
      };
      /**
							Adds the todo into the storage of todos
						*/
      var addTodo = function(user, todo) {
        var currentUser = getUser(user);
        if (!currentUser)
          return;
        var todoList = JSON.parse(localStorage.getItem('todoList'));
        todoList.push({id: currentUser.id, todo: todo});
        localStorage.setItem('todoList', JSON.stringify(todoList));
      };
      // Gets the todos associated ether to the admin or the user
      var getTodos = function(admin, user) {
        var todolist = JSON.parse(localStorage.getItem('todoList'));
				if (admin) {
          return todolist;
        }else if (user) {
          var currentUser = getUser(user);
          if (!currentUser)
            return null;
          // Returns a new array associated with the user account
          return todolist.map(function(todo) {
						if(todo.id === currentUser.id ){
								return todo;
						}
          });
        }
      };

      // findTodo = function(user, todo) {
      //
      // };

      var removeTodo = function(user, todo) {
        var todoList = JSON.parse(localStorage.getItem('todoList'));
        var currentUser = getUser(user);
        if (!currentUser)
          return null;

        var pos = todoList.map(function(todo) {
          return todo.todo;
        }).indexOf(todo);
        todoList.splice(pos, 1);
        localStorage.setItem('todoList', JSON.stringify(todolist));
      };

      var getCurrent = function() {
        return todos;
      };

      return {
        findUser: findUser,
        addUser: addUser,
        addTodo: addTodo,
        getTodos: getTodos,
        removeTodo: removeTodo,
        getCurrent: getCurrent
      };
    }
  ]);

}(window));
