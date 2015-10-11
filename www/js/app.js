var app = angular.module('scotch-todo', ['ionic', 'LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('scotchTodo');
});

app.controller('main', function ($scope, localStorageService, $ionicModal) {
    //store the entities name in a variable    
    var taskData = 'task';
    //initialize the tasks scope with empty array
    $scope.tasks = [];
    //initialize the task scope with empty object
    $scope.task = {};
    //configure the ionic modal before use
    $ionicModal.fromTemplateUrl('new-task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.newTaskModal = modal;
    });

    $scope.getTasks = function () {
        //fetches task from local storage       
        if (localStorageService.get(taskData)) {
            $scope.tasks = localStorageService.get(taskData);
        } else {
            $scope.tasks = [];
        }
    }
    $scope.createTask = function () {
        //creates a new task
        $scope.tasks.push($scope.task);
        localStorageService.set(taskData, $scope.tasks);
        $scope.task = {};
        //close new task modal
        $scope.newTaskModal.hide();
    }
    $scope.removeTask = function (index) {
        //removes a task
        $scope.tasks.splice(index, 1);
        localStorageService.set(taskData, $scope.tasks);
    }
    $scope.completeTask = function (index) {
        //updates a task as completed
        if (index !== -1) {
            $scope.tasks[index].completed = true;
        }
        console.log($scope.tasks[index].completed);
        localStorageService.set(taskData, $scope.tasks);
    }

    $scope.openTaskModal = function () {
        //open new task modal
        $scope.newTaskModal.show();
    };
    $scope.closeTaskModal = function () {
        //close new task modal
        $scope.newTaskModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.newTaskModal.remove();
    });
});