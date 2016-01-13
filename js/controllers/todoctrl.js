(function(window) {
      "use strict";

        angular.module('todoapp')
            .controller('todoctrl',['$scope','validate','storage', function($scope, validate, storage) {
                var admin = false; // to determine if the admin is logging in
                var register;
                $scope.todos = [];
                var validationService = validate; // validationService var
                var storageService = storage; // Storing of user credentials and also user todos

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
                    $scope.todos = [];
                };

                //validationServices the user through the validationService service
                //updates the Todo list from all users if Admin
                //updates the Todo list for each user if not admin
                $scope.validationService = function(user, password) {
                    var ifAdmin =  validationService.checkAdmin(user, password);
                    var ifUser = validationService.checkUser(user, password);
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
                $scope.register = function(user, password) {
                    storageService.addUser(user, password);
                    $scope.show.app = true;
                    $scope.show.login = false;
                };
                //checks for "Enter" key press and adds a new todo
                //to the storageService
                //updates the list
                $scope.enterKey = function($event, user, todo) {
                    var keyCode = $event.which || $event.keyCode;
                    if (keyCode === 13 && todo !== "") {
                        storageService.addTodo(user, todo);
                        $scope.newtodo = "";
                        update(user);
                    }
                };



                //removes todo and  updates the list
                $scope.removeTodo = function(user, todo) {
                    storageService.removeTodo(user, todo);
                    update(user);
                };

                //updates todo
                function update(user) {
                    var temparray = storageService.getTodos(admin, user);
                    if (admin) {
                        $scope.todos = temparray;
                    } else {
                        $scope.todos = temparray;
                    }
                };

            }]);
    })(window);
