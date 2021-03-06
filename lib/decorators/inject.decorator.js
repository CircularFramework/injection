'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Inject = Inject;

var _index = require('../index');

/**
 * Inject
 * A decorator that will find the dependency and return it to be injected in the class
 * @param {string} token The token name to use for injection
 * @returns {function} A function executed to decorate the Injectable
 */
function Inject(token) {
	/** return the function that injects the dependency */
	return function () {
		/** check the token */
		if (token === undefined || typeof token !== 'string') {
			/** check the arguments */
			if (arguments[0] !== undefined && typeof arguments[0] === 'string') token = arguments[0];else {
				/** throw exception that no token was passed */
				throw 'No token given for injection.';
			}
		}

		/** get the dependency */
		var dependencyRef = _index.Injector.get(token);
		if (dependencyRef === undefined) throw 'Dependency could not be found: ' + token;

		/** check for singleton and instance */
		var instance = dependencyRef.instance();
		if (instance === null) {
			/** construct the dependency */
			instance = _index.Injector.construct(dependencyRef.item, dependencyRef.dependencies, dependencyRef.args);

			/** set the dependencyRef instance */
			if (dependencyRef.isSingleton()) dependencyRef.instance(instance);
		}

		/** return the instance */
		return instance;
	};
} /** import dependencies */
//# sourceMappingURL=inject.decorator.js.map