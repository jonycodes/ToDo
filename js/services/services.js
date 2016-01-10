	angular.module('todoapp')
	    .factory('validate', function(storage) {
	        localStorage.adminUser = "admin";
	        localStorage.adminPassword = "todo";

	        var validate = {
	            checkAdmin: function(user, password) {
	                if (user === localStorage.adminUser) {
	                    if (password === localStorage.adminPassword) {
	                        return true;
	                    }
	                }
	                return false;
	            },
	            checkUser: function(user, password) {
	                if (storage.findUser(user, password)) {
	                    console.log(user);
	                    return true;
	                }
	                return false;
	            }
	        }

	        return validate;
	    })
	    .factory('storage', function() {
	        var users = [];
	        var todos = [];

	        var storage = {
	            findUser: function(user, password) {
	                for (var i = 0; i < users.length; i++) {
	                    if (users[i][i] === user && users[i][i + 1] === password) {
	                        return true;
	                    }
	                }
	                return false;
	            },
	            addUser: function(user, password) {
	                users.push([user, password]);
	            },
	            addTodo: function(user, todo) {
	                todos.push([user, todo]);
	            },

	            getTodos: function(admin, user) {
	                var index = 0;
	                var temparray = [];
	                console.log(user);
	                if (admin) {
	                    while (index < todos.length) {
	                        temparray.push(todos[index][1]);
	                        index++;
	                    }
	                } else {
	                    while (index < todos.length) {
	                        if (todos[index][0] === user) {

	                            temparray.push(todos[index][1]);
	                            index += 1;
	                        } else {
	                            index += 1;
	                        }

	                    }
	                }
	                return temparray;
	            },

	            removeTodo: function(user, todo) {
	                todos.splice(todos.indexOf([user, todo]), 1);
	            }

	        };
	        return storage;
	    });
