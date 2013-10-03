'use strict';

/* Filters */

angular.module('pizzaFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
