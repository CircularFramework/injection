/**
 * @class Dependency
 * Defines an injectable dependency
 * @param {string} token The token name used to find the dependency and inject it
 * @param {object} item The object item that will be injected
 */
class Dependency {
	constructor(token, item) {
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
		let _instance = null;
		this.instance = (instance) => {
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
	addDependency(token) {
		this.dependencies.push(token);
		return this;
	}

	/**
	 * Add an array of dependencies for this item
	 * @param {string[]} tokens An array of token ids
	 * @returns {Dependency} Returns a self reference
	 */
	addDependencies(tokens) {
		tokens.forEach(token => this.addDependency(token));
		return this;
	}

	/**
	 * Add an argument to the array of arguments that will be passed to the constructor
	 * @param {object} value A value to pass to the constructor
	 * @returns {Dependency} Returns a self reference
	 */
	addArg(value) {
		this.args.push(value);
		return this;
	}

	/**
	 * Add arguments that will be passed to the constructor
	 * @param {object[]} values A array of values to pass to the constructor
	 * @returns {Dependency} Returns a self reference
	 */
	addArgs(values) {
		values.forEach(value => this.addArg(value));
		return this;
	}

	/**
	 * Set the singleton flag
	 * @param {boolean} singleton A boolean flag indicating whether or not this is a singleton
	 * @returns {Dependency} Returns a self reference
	 */
	setSingleton(singleton) {
		this.singleton = singleton;
		return this;
	}

	/**
	 * Returns the singleton flag
	 * @returns {boolean} The singleton flag
	 */
	isSingleton() {
		return this.singleton;
	}
}

/** export Dependency */
export { Dependency };