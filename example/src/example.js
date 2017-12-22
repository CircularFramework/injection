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

class Test1 {
	constructor(@Inject('depOne') depOne, @Inject('depTwo') depTwo) {
		depOne.msg = 'Singleton: Test1';
		depTwo.msg = 'Non-Singleton: Test1';
	}
}

class Test2 {
	constructor(@Inject('depOne') depOne, @Inject('depTwo') depTwo) {
		depOne.msg += ': Test2';
		depTwo.msg += ': Test2';
	}
}

class TestA {
	constructor(depOne, depTwo) {
		depOne.msg += ': TestA';
		depTwo.msg += ': TestA';
	}
}

class TestB {
	constructor(depOne, depTwo) {
		depOne.msg += ': TestB';
		depTwo.msg += ': TestB';

		console.log(depOne.msg);
		console.log(depTwo.msg);
	}
}

let test1 = new Test1();
let test2 = new Test2();
let testa = Injector.construct(TestA, ['depOne', 'depTwo']);
let testb = Injector.construct(TestB, ['depOne', 'depTwo']);