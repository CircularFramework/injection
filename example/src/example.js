/** import dependencies */
import { Injector } from '../../lib';
import { Inject, Injectable } from '../../lib/decorators';

@Injectable({
	token: 'depOne'
})
export class DepOne {
	constructor() {
		this.msg = '';
	}
}

@Injectable({
	token: 'depTwo',
	singleton: false
})
export class DepTwo {
	constructor() {
		this.msg = '';
	}
}

export class DepThree {
	constructor(depFour) {
		if (depFour instanceof DepFour) {
			console.log('I am an instance of DepFour');
		}
		console.log(depFour);
		this.msg = '';
	}
}

export class DepFour {
	constructor() {
		console.log('I am a dependency of DepThree also bound at startup.');
		this.loaded = true;
	}
}

Injector.bind('depThree', DepThree).addDependency('depFour');
Injector.bind('depFour', DepFour);

class Test1 {
	constructor(@Inject('depOne') depOne, @Inject('depTwo') depTwo, @Inject('depThree') depThree) {
		depOne.msg = 'Singleton: Test1';
		depTwo.msg = 'Non-Singleton: Test1';
		depThree.msg = 'DepThree was bound at startup as a singleton. Test 1'
	}
}

class Test2 {
	constructor(@Inject('depOne') depOne, @Inject('depTwo') depTwo, @Inject('depThree') depThree) {
		depOne.msg += ': Test2';
		depTwo.msg += ': Test2';
		depThree.msg += ': Test2';
	}
}

class TestA {
	constructor(depOne, depTwo, depThree) {
		depOne.msg += ': TestA';
		depTwo.msg += ': TestA';
		depThree.msg += ': TestA';
	}
}

class TestB {
	constructor(depOne, depTwo, depThree) {
		depOne.msg += ': TestB';
		depTwo.msg += ': TestB';
		depThree.msg += ': TestB';


		console.log(depOne.msg);
		console.log(depTwo.msg);
		console.log(depThree.msg);
	}
}

let test1 = new Test1();
let test2 = new Test2();
let testa = Injector.construct(TestA, ['depOne', 'depTwo', 'depThree']);
let testb = Injector.construct(TestB, ['depOne', 'depTwo', 'depThree']);