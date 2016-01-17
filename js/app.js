(function(window){
	var angular = window.angular;
	var localStorage = window.localStorage;

	angular.module('todoapp', []);
	var userList = [
		{
			id: 0,
			name: "admin",
			password: "todo"
		}

	];

	localStorage.setItem('userList', JSON.stringify(userList));
	var todos = [];
	localStorage.setItem('todos', JSON.stringify(todos));
})(window);