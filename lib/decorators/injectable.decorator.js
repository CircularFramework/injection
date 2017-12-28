'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Injectable = Injectable;

var _index = require('../index');

/**
 * Injectable
 * A decorator that will create a Dependency in the Injector for use inside the application
 * @param {object} config The configuration of the dependency
 * @returns {function} A function executed to decorate the Injectable
 */
function Injectable(config) {
	return function (item) {
		/** make sure a token is present */
		if (config === undefined || config.token === undefined) throw 'No token set for injectable item. ' + item.name;

		/** add the dependency to the Injector */
		var dependency = _index.Injector.bind(config.token, item);

		/** check for dependencies */
		if (config.dependencies !== undefined && Array.isArray(config.dependencies)) {
			dependency.addDependencies(config.dependencies);
		}

		/** check for args */
		if (config.args !== undefined && Array.isArray(config.args)) {
			dependency.addArgs(config.args);
		}

		/** check for singleton */
		if (config.singleton !== undefined && typeof config.singleton === 'boolean') {
			dependency.setSingleton(config.singleton);
		}
	};
} /** import dependencies */
//# sourceMappingURL=injectable.decorator.js.map