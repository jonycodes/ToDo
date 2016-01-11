	angular.module('todoapp') //valitades the user
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
	                    return true;
	                }
	                return false;
	            }
	        }

	        return validate;
	    }) //stores the todos and user's credentials
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
	                var found = false;
	                var index = 0;
	                if (todos.length == 0) {
	                    todos.push([user, todo]);
	                } else {
	                    while (index < todos.length) {
	                        if (todos[index][0].toString() == user) {
	                            todos[index].push(todo);
	                            found = true;
	                            index++;
	                        }
	                        index++;
	                    }
	                    if (!found) {
	                        todos.push([user, todo]);
	                    }
	                }
	            },

	            getTodos: function(admin, user) {
	                var index = 0;
	                var index2 = 0;
	                var temparray = [];
	                var secondarray = [];
	                if (admin) {
	                    return todos;
	                } else {
	                    while (index < todos.length) {
	                        if (todos[index][0].toString() === user) {
	                            secondarray = todos[index];
	                            while (index2 < secondarray.length) {
	                                temparray.push(secondarray[index2]);
	                                index2++;
	                            }

	                        }
	                        index++;
	                    }

	                }
	                return [temparray];
	            },
	            findTodo: function(user, todo) {

	            },

	            removeTodo: function(user, todo) {
	                var index = 0;
	                var temparray = [];
	                while (index < todos.length) {
	                    if (todos[index][0].toString() == user) {
	                        break;
	                    }
	                    index++;
	                }
	                temparray = todos[index];
	                temparray.splice(temparray.indexOf(todo), 1);
	                todos.splice(index, 1, temparray);
	            },

	            getCurrent: function() {
	                return todos;
	            }

	        };
	        return storage;
	    });
