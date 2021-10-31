/**
 * 
 */
'use strict';

export class Translation {
	#name;
	#language;
	constructor(parameters) {
		this.#name = parameters.name;
		this.#language = parameters.language;
	}
	getName() {
		return this.#name;
	}
	getLanguage() {
		return this.#language;
	}
}