var todoList = angular.module('MyApp', []);
// date eklenecek.
// 1 gunluk 1 haftalık , aylık ve yıllık
// gruplama yapabilecek !! tarih bazlı otamatik grupla
// bittirme günü olacak
// öncelik verebilmeli
// bir güne en cok 10 görev verebilir.
// tut denilmese kaldırılmalı
//-----------
//geçmiş: sadece görüntüleyecek, bitememiş işleri 
//bugun : herzaman acık gelecek hem ekliyecek hemde 



todoList.controller('TodoController', function ($scope, $filter) {

    var dt = new Date().toString('dd-MMM-yyyy');
    var newItemdate = dt.substr(8, 2) + "-" + (dt.substr(4, 3)) + "-" + dt.substr(11, 4);
    $scope.currentDateNow = newItemdate;     

    $scope.date = $filter("date")(Date.now(), 'yyyy-MM-dd');
  
    $scope.saved = localStorage.getItem('todos');

    $scope.todos = (localStorage.getItem('todos') !== null) ? JSON.parse($scope.saved) : [{
        ItemId: newItemdate,
        textHeader: "default Başlık",
        textBody: "Açıklama alanıı ",
        pbi: 0,
        Option:1,
        done: false,
        date: '2016-01-15T22:00:00.000Z'
    }];

    localStorage.setItem('todos', JSON.stringify($scope.todos));

    $scope.addTodo = function () {

        var newItemId = $scope.todoDate.toString('dd-MMM-yyyy');
        var newItemdateText = newItemId.substr(8, 2) + "-" + (newItemId.substr(4, 3)) + "-" + newItemId.substr(11, 4);

        $scope.todos.push({
            ItemId: newItemdateText,
            textHeader: $scope.todoTextHeader,
            textBody: $scope.todoTextBody,
            pbi: $scope.todoPbi,
            Option: $scope.todoOption,
            done: false,
            date: $scope.todoDate   
        });
        $scope.todoTextHeader = '';
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.remainingNextWeak = function () {
        var count = 0;
        var doneCount = 0;
        angular.forEach($scope.todos, function (todo) {

            dt = (Date.now() + (86400000 * 7));

            $scope.currentDateNextWeakMax = dt;

            dt = (Date.now() - 86400000);

            $scope.currentDateNextWeakMin = dt;

            if (compareDates($scope.currentDateNextWeakMax, todo.date) && compareDates(todo.date, $scope.currentDateNextWeakMin))
            {
                if (todo.done) {
                    count += 1;
                    doneCount += 0;

                } else {
                    count += 0;
                    doneCount += 1;
                }           
            }          

        });
        return count + "/" + doneCount;
    };

    $scope.remainingNextMonth = function () {
        var count = 0;
        var doneCount = 0;
        angular.forEach($scope.todos, function (todo) {

            dt = (Date.now() + (86400000 * 30));

            $scope.currentDateNextWeakMax = dt;

            dt = (Date.now() - 86400000);

            $scope.currentDateNextWeakMin = dt;

            if (compareDates($scope.currentDateNextWeakMax, todo.date) && compareDates(todo.date, $scope.currentDateNextWeakMin)) {
                if (todo.done) {
                    count += 1;
                    doneCount += 0;

                } else {
                    count += 0;
                    doneCount += 1;
                }
            }

        });
        return count + "/" + doneCount;
    };

    $scope.archive = function () {

        var oldTodos = $scope.todos;

        $scope.todos = [];

        angular.forEach(oldTodos, function (todo) {
            if (!todo.done)
                $scope.todos.push(todo);
        });

        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };
    $scope.change = function () {
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };
    $scope.archiveAll = function () {
        $scope.todos = [];
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };

    $scope.todosToFilter = function () {
        indexedTeams = [];
        return $scope.todos;
    }

    $scope.filterHeaderTodos = function (todo) {
        
        var teamIsNew = indexedTeams.indexOf(todo.ItemId) == -1;
        if (teamIsNew) {
            indexedTeams.push(todo.ItemId);
        }
        return teamIsNew;
    }  

    $scope.filterHeaderTodosNextWeek = function (todo) {
        dt = (Date.now() + (86400000 * 7));

        $scope.currentDateNextWeakMax = dt;

        dt = (Date.now() - 86400000);

        $scope.currentDateNextWeakMin = dt;

        return compareDates( $scope.currentDateNextWeakMax,todo.date) && compareDates(todo.date, $scope.currentDateNextWeakMin);

    }
      
    $scope.filterHeaderTodosNextMonth = function (todo) {
        dt = (Date.now() + (86400000 * 30));

        $scope.currentDateNextMonthMax = dt;

        dt = (Date.now() - 86400000);

        $scope.currentDateNextMonthMin = dt;

        return compareDates($scope.currentDateNextMonthMax, todo.date) && compareDates(todo.date, $scope.currentDateNextMonthMin);

    }
    
    $scope.filterHeaderTodosLastWeek = function (todo) {

        dt = (Date.now() - (86400000 * 7));

        $scope.currentDateLastWeekMax = dt;

        dt = (Date.now() - 86400000);

        $scope.currentDateLastWeekMin = dt;

        return compareDates(todo.date, $scope.currentDateLastWeekMax) && compareDates($scope.currentDateLastWeekMin, todo.date);

    }
    
    $scope.filterHeaderTodosLastMonth = function (todo) {

        dt = (Date.now() - (86400000 * 30));

        $scope.currentDateLastMonthMax = dt;

        dt = (Date.now() - 86400000);

        $scope.currentDateLastMonthMin = dt;
        return compareDates(todo.date, $scope.currentDateLastMonthMax) && compareDates($scope.currentDateLastMonthMin, todo.date);

    }
    
    $scope.list_categories = {

        data: [{
            id: '0.5',
            name: '0.5'
        }, {
            id: '1',
            name: '1'
        }, {
            id: '2',
            name: '2'
        }, {
            id: '3',
            name: '3'
        }, {
            id: '5',
            name: '5'
        }, {
            id: '8',
            name: '8'
        }, {
            id: '13',
            name: '13'
        }, {
            id: '21',
            name: '21'
        }]
    };
    $scope.list_DateLine = {

        data: [{
            id: '0.5',
            name: 'yarım Gün'
        }, {
            id: '1',
            name: '1 Gün'
        }, {
            id: '2',
            name: '2 Gün'
        }]
    };
   

});

todoList.directive('ngConfirmClick', [
    function () {
        return {
            priority: 1,
            terminal: true,
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.ngClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }])

function compareDates(date1, date2) {
    var dateObj1 = new Date(date1);
    var dateObj2 = new Date(date2);

    return (dateObj1 > dateObj2);
}

todoList.filter('digits', function () {
    return function (input, width, leadingChar) {
        leadingChar = leadingChar || '0';
        input = input + '';
        return input.length >= width ? input : new Array(width - input.length + 1).join(leadingChar) + input;
    }
});