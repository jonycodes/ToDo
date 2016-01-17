    

    (function(window) {
      "use strict";
        angular.module('todoapp')
            .controller('todoctrl', ["$scope", "validate","storage",function($scope, validate, storage) {
                var admin = false;
                var register;
                var validationService = validate;
                var storageService = storage;

                //controls which part of the app to show
                $scope.show = {
                    greeting: true,
                    login: false,
                    app: false,
                    register: false,
                    message: "Enter User and Password"
                };

                //stores user credentials
                $scope.user = {
                    name: "",
                    password: ""
                };

                //Shows Loging Menu after user clicks continue
                $scope.next = function() {
                    $scope.show.greeting = !$scope.show.greeting;
                    $scope.show.login = !$scope.show.login;
                };

                //Goes back to main menu
                $scope.back = function() {
                    $scope.show.app = false;
                    $scope.show.greeting = true;
                    $scope.show.register = false;
                    $scope.show.message = "Enter User and Password";
                    $scope.userTodos = [];
                    admin = false;
                };

                //validates the user through the validate service
                //updates the Todo list from all users if Admin 
                //updates the Todo list for each user if not admin 
                $scope.validate = function(user) {
                    var ifAdmin = validationService.checkAdmin(user);
                    var ifUser = validationService.checkUser(user);
                    if (ifAdmin) {
                        $scope.show.app = true;
                        $scope.show.login = false;
                        admin = true;
                        update(user);
                    } else if (ifUser) {
                        $scope.show.app = true;
                        $scope.show.login = false;
                        update(user);
                    } else {
                        register = window.confirm("Username does not exist, want to register?");
                        if (register) {
                            $scope.show.message = "Register";
                            $scope.show.register = true;
                        }
                    }
                };
                //register a new user
                $scope.register = function(user) {
                    storageService.addUser(user);
                    $scope.show.app = true;
                    $scope.show.login = false;

                };
                //checks for "Enter" key press and adds a new todo 
                //to the storage 
                //updates the list 
                $scope.enterKey = function($event) {
                    var keyCode = $event.which || $event.keyCode;
                    if (keyCode === 13 && todo !== "") {
                        storage.addTodo($scope.user, $scope.newtodo);
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
                  var temparray = usersList.map(function(currentUser){
                        currentUser.todos = [];
                        todosList.map(function(todo){
                            if(currentUser.id === todo.id){
                                currentUser.todos.push(todo);    
                            }
                            
                        });
                        return currentUser;
                    });       
                    if (admin) {
                        $scope.userTodos = temparray;
                    } else {
                        $scope.userTodos = temparray.map(function(currentUser){
                            if(user.name === currentUser.name){
                                return currentUser;
                            }
                        });
                    }
                };

            }]);
    })(window);
