(function(window) {
      "use strict";

        angular.module('todoapp')
            .controller('todoctrl',['$scope','validate','storage', function($scope, validate, storage) {
                var admin = false; // to determine if the admin is logging in
                var register;
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

                //validates the user through the validationService service
                //updates the Todo list from all users if Admin
                //updates the Todo list for each user if not admin
                $scope.validateUser = function() {
                    var ifAdmin =  validationService.checkAdmin($scope.user);
                    var ifUser = validationService.checkUser($scope.user);
                    if (ifAdmin) {
                        $scope.show.app = true;
                        $scope.show.login = false;
                        admin = true;
                        update($scope.user);
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
                $scope.register = function() {
                    storageService.addUser($scope.user);
                    $scope.show.app = true;
                    $scope.show.login = false;
                };
                //checks for "Enter" key press and adds a new todo
                //to the storageService
                //updates the list
                $scope.todo = "";
                $scope.enterKey = function($event) {
                    var keyCode = $event.which || $event.keyCode;
                    if (keyCode === 13 && $scope.todo !== "") {
                        storageService.addTodo($scope.user, $scope.todo);
                        $scope.todo = "";
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
                  var todosList = storageService.getTodos(admin,user);

                  $scope.usersTodos = usersList.map(function(currentUser){
                      currentUser.todos = [];
                      todosList.map(function(todo){
                        currentUser.todos.push(todo);
                      });
                      return currentUser;
                  });
                  console.log($scope.usersTodos);
                }

            }]);
    })(window);
