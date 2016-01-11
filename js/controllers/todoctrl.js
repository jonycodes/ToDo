    "use strict";

    (function(window) {
        angular.module('todoapp')
            .controller('todoctrl', function($scope, validate, storage) {
                var admin;
                var register;
                $scope.todos = [];

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
                };

                //validates the user through the validate service
                //updates the Todo list from all users if Admin 
                //updates the Todo list for each user if not admin 
                $scope.validate = function(user, password) {
                    $scope.todos = [];
                    admin = false;
                    if (validate.checkAdmin(user, password)) {
                        $scope.show.app = true;
                        $scope.show.login = false;
                        admin = true;
                        update(user);
                    } else if (validate.checkUser(user, password)) {
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
                $scope.register = function(user, password) {
                    storage.addUser(user, password);
                    $scope.show.app = true;
                    $scope.show.login = false;

                };
                //checks for "Enter" key press and adds a new todo 
                //to the storage 
                //updates the list 
                $scope.enterKey = function($event, user, todo) {
                    var keyCode = $event.which || $event.keyCode;
                    if (keyCode === 13 && todo !== "") {
                        storage.addTodo(user, todo);
                        $scope.newtodo = "";
                        update(user);
                    }
                };



                //removes todo and  updates the list
                $scope.removeTodo = function(user, todo) {
                    storage.removeTodo(user, todo);
                    update(user);
                };

                //updates todo
                function update(user) {
                    var temparray = storage.getTodos(admin, user);
                    if (admin) {
                        $scope.todos = temparray;
                    } else {
                        $scope.todos = temparray;
                    }
                };

            });
    })(window);
