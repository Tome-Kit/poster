/**
 * 
 */
'use strict';

export class Story {
	#translations;
	constructor(parameters) {
		this.#translations = parameters.translations;
	}
	getTranslations(){
		return this.#translations;
	}
}