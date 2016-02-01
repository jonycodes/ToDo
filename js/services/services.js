		(function(window) {
		    'use strict';
		    var angular = window.angular;
		    var localStorage = window.localStorage;

		    angular.module('todoapp') //valitades the user
		        .factory('validate', ["storage", function(storage) {

		            var usersList = JSON.parse(localStorage.getItem('userList'));
		            var admin = usersList[0];


		            return {
		                checkAdmin: function(user) {
		                    return user.name === admin.name && user.password === admin.password;
		                },
		                checkUser: function(user) {
		                    return storage.findUser(user);
		                }
		            };


		        }]) //stores the todos and user's credentials
		        .factory('storage', [function() {
		            var findUser = function(user) {
		                var userList = JSON.parse(localStorage.getItem('userList'));
		                var pos = userList.map(function(currentUser) {
		                    return currentUser.name;
		                }).indexOf(user.name);

		                if (pos < 0) return null;
		                return user.password === userList[pos].password ? userList[pos] : null;
		            };
								var getCurrentUser = function(){
										return JSON.parse(localStorage.getItem('currentUser'));
								};
								var setCurrentUser = function(user){
										var currentUser = findUser(user);
										localStorage.setItem('currentUser', JSON.stringify(currentUser));
								};
		            var addUser = function(user) {
		                var userList = JSON.parse(localStorage.getItem('userList'));
		                userList.push({id: userList.length,  name: user.name, password: user.password});
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

		            var getTodos = function(admin, user) {
		                var todos = JSON.parse(localStorage.getItem('todos'));
		                if (admin) {
		                    return todos;
		                }
		                else if (user) {
		                    var currentUserId = findUser(user).id;
		                    if (!currentUserId) return null;
		                    return todos.map(function(todo) {
		                        return todo.id === currentUserId ? todo : null;
		                    });
		                }
		            };

		            var removeTodo = function(user, todo) {
		                var todoList = JSON.parse(localStorage.getItem('todos'));
		                var currentUser = user;
		                if (!currentUser)
		                    return null;

		                var pos = todoList.map(function(currentTodo) {
		                    return currentTodo.todo;
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
		        }]).filter('firstToUpperCase', [function(){
		        	return function(input){
		        		if(!input) return;
		        		var firstletter = input.slice(0,1);
		        		var finalletters = input.slice(1, input.length);
		        		return firstletter.toUpperCase() + finalletters;
		        	};
		        }]);
		})(window);
