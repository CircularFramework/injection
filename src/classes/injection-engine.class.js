/** import dependencies */
import { Dependency } from './dependency.class';

/**
 * @class InjectionEngine
 * Binds dependecies for injection and constructs objects
 */
class InjectionEngine {
	constructor() {
		/** @type {Dependency[]} An array of all dependencies that can be injected */
		this.dependencies = [];
	}

	/**
	 * Bind a new dependency for injection
	 * @param {string} token The token id of the dependency
	 * @param {object} item The object item itself that will be injected
	 * @returns {Dependency} Returns the newly bound dependency
	 */
	bind(token, item) {
		/** create a new dependency, add to array, and return */
		let dependency = new Dependency(token, item);
		this.dependencies.push(dependency);
		return dependency;
	}

	/**
	 * Get a dependency by the token name
	 * @param {string} token The token id of the dependency
	 * @returns {Dependency} Returns the dependency
	 */
	get(token) {
		return this.dependencies.find(d => d.token === token);
	}

	/**
	 * Construct the given dependent class object with the give dependencies and arguments
	 * @param {class} dependent The class that is depending on the dependencies
	 * @param {string[]} tokens The token ids of all the dependencies
	 * @param {object[]} args Additional arguments to pass to the constructor
	 */
	construct(dependent, tokens = [], args = []) {
		/** recursively create dependencies */
		let dependencies = [];
		if (tokens.length > 0) {
			tokens.forEach(token => {
				/** get the dependency */
				let dependencyRef = this.get(token);

				/** check for singleton and instance */
				let dependency = dependencyRef.instance();
				if ((dependencyRef.isSingleton() && dependency === null) || !dependencyRef.isSingleton()) {
					/** construct the dependency */
					dependency = this.construct(dependencyRef.item, dependencyRef.dependencies, dependencyRef.args);
				}

				/** set the dependencyRef instance */
				if (dependencyRef.isSingleton() && dependencyRef.instance() ===  null) {
					dependencyRef.instance(dependency);
				}

				/** add the dependency */
				dependencies.push(dependency);
			});
		}

		/** check for args */
		if (args.length > 0) dependencies = dependencies.concat(args);

		/** initialize the new dependent */
		return new dependent(...dependencies);
	}
}

/** export InjectionEngine */
export { InjectionEngine };