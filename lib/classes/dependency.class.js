"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Dependency
 * Defines an injectable dependency
 * @param {string} token The token name used to find the dependency and inject it
 * @param {object} item The object item that will be injected
 */
var Dependency = function () {
	function Dependency(token, item) {
		_classCallCheck(this, Dependency);

		/** public properties */

		/** @type {string} The token name used to identify the dependency */
		this.token = token;

		/** @type {object} The object item itself */
		this.item = item;

		/** @type {string[]} An array of token ids for dependencies of this item */
		this.dependencies = [];

		/** @type {object[]} Additional arguments to pass the constructor */
		this.args = [];

		/** @type {boolean} A boolean indicating whether or not this is a singleton */
		this.singleton = true;

		/** private properties */

		/** @private {object} An instantiated instance of the dependency */
		var _instance = null;
		this.instance = function (instance) {
			if (instance) _instance = instance;
			return _instance;
		};
	}

	/** public methods */

	/**
  * Add a dependency token to the array of dependencies for this item
  * @param {string} token The token name of the dependency
  * @returns {Dependency} Returns a self reference
  */


	_createClass(Dependency, [{
		key: "addDependency",
		value: function addDependency(token) {
			this.dependencies.push(token);
			return this;
		}

		/**
   * Add an array of dependencies for this item
   * @param {string[]} tokens An array of token ids
   * @returns {Dependency} Returns a self reference
   */

	}, {
		key: "addDependencies",
		value: function addDependencies(tokens) {
			var _this = this;

			tokens.forEach(function (token) {
				return _this.addDependency(token);
			});
			return this;
		}

		/**
   * Add an argument to the array of arguments that will be passed to the constructor
   * @param {object} value A value to pass to the constructor
   * @returns {Dependency} Returns a self reference
   */

	}, {
		key: "addArg",
		value: function addArg(value) {
			this.args.push(value);
			return this;
		}

		/**
   * Add arguments that will be passed to the constructor
   * @param {object[]} values A array of values to pass to the constructor
   * @returns {Dependency} Returns a self reference
   */

	}, {
		key: "addArgs",
		value: function addArgs(values) {
			var _this2 = this;

			values.forEach(function (value) {
				return _this2.addArg(value);
			});
			return this;
		}

		/**
   * Set the singleton flag
   * @param {boolean} singleton A boolean flag indicating whether or not this is a singleton
   * @returns {Dependency} Returns a self reference
   */

	}, {
		key: "setSingleton",
		value: function setSingleton(singleton) {
			this.singleton = singleton;
			return this;
		}

		/**
   * Returns the singleton flag
   * @returns {boolean} The singleton flag
   */

	}, {
		key: "isSingleton",
		value: function isSingleton() {
			return this.singleton;
		}
	}]);

	return Dependency;
}();

/** export Dependency */


exports.Dependency = Dependency;
//# sourceMappingURL=dependency.class.js.map