'use strict';

/* App Module */

angular.module('pizzaShop', ['pizzaFilters', 'pizzaServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/pizzas', {templateUrl: 'partials/pizza-list.html',   controller: PizzaListCtrl}).
      when('/pizza/:pizzaId', {templateUrl: 'partials/pizza-detail.html', controller: PizzaDetailCtrl}).
      when('/order', {templateUrl: 'partials/order.html', controller: OrderCtrl}).
      otherwise({redirectTo: '/pizzas'});
}]);
