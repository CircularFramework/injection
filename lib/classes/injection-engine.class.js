'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InjectionEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** import dependencies */


var _dependency = require('./dependency.class');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class InjectionEngine
 * Binds dependecies for injection and constructs objects
 */
var InjectionEngine = function () {
	function InjectionEngine() {
		_classCallCheck(this, InjectionEngine);

		/** @type {Dependency[]} An array of all dependencies that can be injected */
		this.dependencies = [];
	}

	/**
  * Bind a new dependency for injection
  * @param {string} token The token id of the dependency
  * @param {object} item The object item itself that will be injected
  * @returns {Dependency} Returns the newly bound dependency
  */


	_createClass(InjectionEngine, [{
		key: 'bind',
		value: function bind(token, item) {
			/** create a new dependency, add to array, and return */
			var dependency = new _dependency.Dependency(token, item);
			this.dependencies.push(dependency);
			return dependency;
		}

		/**
   * Get a dependency by the token name
   * @param {string} token The token id of the dependency
   * @returns {Dependency} Returns the dependency
   */

	}, {
		key: 'get',
		value: function get(token) {
			return this.dependencies.find(function (d) {
				return d.token === token;
			});
		}

		/**
   * Construct the given dependent class object with the give dependencies and arguments
   * @param {class} dependent The class that is depending on the dependencies
   * @param {string[]} tokens The token ids of all the dependencies
   * @param {object[]} args Additional arguments to pass to the constructor
   */

	}, {
		key: 'construct',
		value: function construct(dependent) {
			var _this = this;

			var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
			var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

			/** recursively create dependencies */
			var dependencies = [];
			if (tokens.length > 0) {
				tokens.forEach(function (token) {
					/** get the dependency */
					var dependencyRef = _this.get(token);

					/** check for singleton and instance */
					var dependency = dependencyRef.instance();
					if (dependencyRef.isSingleton() && dependency === null || !dependencyRef.isSingleton()) {
						/** construct the dependency */
						dependency = _this.construct(dependencyRef.item, dependencyRef.dependencies, dependencyRef.args);
					}

					/** set the dependencyRef instance */
					if (dependencyRef.isSingleton() && dependencyRef.instance() === null) {
						dependencyRef.instance(dependency);
					}

					/** add the dependency */
					dependencies.push(dependency);
				});
			}

			/** check for args */
			if (args.length > 0) dependencies = dependencies.concat(args);

			/** initialize the new dependent */
			return new (Function.prototype.bind.apply(dependent, [null].concat(_toConsumableArray(dependencies))))();
		}
	}]);

	return InjectionEngine;
}();

/** export InjectionEngine */


exports.InjectionEngine = InjectionEngine;
//# sourceMappingURL=injection-engine.class.js.map