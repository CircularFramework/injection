# @circular/injection

Injection is a dependency injection engine that was written to be used with the Circular Framework, however it can also be used as a standalone DI solution.

### Installation
_npm install @circular/injection --save_

### How to configure...

Any class that can be injected is called a Dependency. You can create these dependencies a couple of ways. First by, at your application startup you can bind an injection token to a class reference. The second way is to use the @Injectable decorator to decorate your class and pass it an injection configuration.

##### Example: Bind Method 1
    
    import { Injector } from '@cicular/injection';
    
    class DepOne {}
    
    class DepTwo {
        constructor(depOne) {
            this.depOne = depOne;
        }
    }
    
    Injector.bind('depOne', DepOne);
    Injector.bind('depTwo', DepTwo)
        .addDependency('depOne');

##### Example: Bind Method 2
    
    import { Injector } from '@cicular/injection';
    
    @Injectable({
        token: 'depOne'
    })
    class DepOne {}
    
    @Injectable({
        token: 'depTwo',
        dependencies: ['depOne']
    })
    class DepTwo {
        constructor(depOne) {
            this.depOne = depOne;
        }
    }

### How to initialize a class with dependencies

There are a couple of ways to create an instance of a class that has dependencies. The first method is to use the Injector class' construct method. The second is to decorate your class parameters with the @Inject() decorator.

##### Example: Instantiation Method 1
    
    import { Injector } from '@cicular/injection';
    
    class TestA {
        constructor(depOne, depTwo) {
            this.depOne = depOne;
            this.depTwo = depTwo;
        }
    }
    
    let testa = Injector.construct(TestA, ['depOne', 'depTwo']);

##### Example: Instantiation Method 2
    
    import { Injector } from '@cicular/injection';
    
    class TestA {
        constructor(@Inject('depOne') depOne, @Inject('depTwo') depTwo) {
            this.depOne = depOne;
            this.depTwo = depTwo;
        }
    }
    
    let testa = new TestA();
    
### Usage Examples

See the code under the example/ directory.

# Documentation

### Dependency (class)
Defines a dependency that can be injected.

**NOTE**: A singleton dependency is only created once and is reused throughout the application. If the singleton flag is false, a new instance will be injected each time.

##### Properties
* token: string;
  * A unique id to identify this dependency as.
* item: class;
  * A class object to be injected.
* dependencies: string[];
  * An array of tokens specifying dependencies of this item.
* args: object[];
  * Additional arguments to pass to the constructor.
* singleton: boolean;
  * A boolean flag indicating whether or not this is a singleton.

##### Methods
* constructor(token: string, item: class);
  * instantiates a new Dependency
* instance(_instance?: object): object;
  * Retrieves/sets a private property that holds an instantiated instance of this dependency.
* addDependency(token: string): Dependency;
  * Add a dependency by token id.
* addDependencies(tokens: string[]): Dependency;
  * Add an array of dependencies by tokens.
* addArg(value: object): Dependency;
  * Add an additional argument for the constructor.
* addArgs(values: object[]): Dependency;
  * Add additional arguments for the constructor.
* setSingleton(singleton: boolean): Dependency;
  * Set the singleton flag.
* isSingleton(): boolean;
  * Returns the singleton flag value.

### InjectionEngine (class)
The engine that does the injection :)

##### Properties
* dependencies: Dependency[];
  * An array of Dependency objects

##### Methods
* bind(token: string, item: class): Dependency;
  * Bind a new dependency in the injection engine and return that new Dependency.
* get(token: string): Dependency;
  * Find a dependency by token and return.
* construct(dependent: class, tokens: string[], args: object[]): object;
  * Constructs a new instance of the given dependent class. Uses the passed tokens to find dependencies and inject them into the newly created instance. Any additional args will be passed into the constructor after the injected items.

### Injectable (decorator)
This decorator can be used on a class that you would like to mark as injectable, making it a Dependency. You can pass this decorator a configuration that will define the rules of injection. The configuration is an object with key/value pairs. The object is defined below.

##### Configuration
* token: string;
  * A string id to identify the Dependency
* dependencies: string[];
  * An array of token ids to be used as dependencies of this Dependency.
* args: object[];
  * An array of additional arguments to be passed to the constructor.
* singleton: boolean;
  * A boolean flag indicating whether or not this is a singleton.

### Inject (decorator)
This decorator can be used to decorate parameters in your constructor to mark them as injected params. The Inject decorator takes just a token id so that it knows what is supposed to be injected.
