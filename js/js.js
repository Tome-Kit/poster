/**
 * @author peacecop kalmer: <kalmer@test.tennis24.ee>
 * @file This file contains the loader for the page.
 */
'use strict';

/**
 * This function converts a string from camel case to spinal case.
 * 
 * @param string
 *            parameters.originalString the string in camel case
 * @returns string the string in spinal case
 */
function convertFromCamelToSpinal(parameters) {
	return parameters.originalString.replace(/[A-Z]/g, function(match, offset) {
		return (offset ? '-' : '') + match;
	}).toLowerCase();
}

/**
 * This function converts a string from spinal case to camel case.
 * 
 * @param string
 *            parameters.originalString the string in spinal case
 * @returns string the string in camel case
 */
function convertFromSpinalToCamel(originalString) {
	return originalString.replace(/_\w/g, function(m) {
		return m[1].toUpperCase();
	});
}

/**
 * This function sets the loader after the content is loaded. It checks for the
 * query string and if there is a matching element with the ID after
 * <code>?</code> it calls the <code>onclick</code> function of that
 * element.
 */
function loadMain() {
	var queryString = window.location.search.split('?');
	var language = '';
	var languageCode = 'et';
	if (queryString.length > 1) {
		if (queryString[1].indexOf("ref=") > -1) {
			var languageInPath = window.location.pathname.split('/');
			languageCode = languageInPath[languageInPath.length - 2];
			load({
				files: {
					aside: [{
						file: language + 'aside.html',
						target: 'aside'
					}],
					css: [{
						file: '../../css/html-css-examples.css',
						target: 'style'
					}],
					navigation: [{
						file: language + 'navigation.html',
						target: 'navigation'
					}]
				},
				language: languageCode,
				name: 'index',
				title: {
					'de': 'Trainings im Rudertennis',
					'en': 'Trainings in paddle tennis',
					'et': '(N)aerutennise klubi treeningud'
				}
			});
		}
		var partsOfQueryString = queryString[1].split('&');

		var targetFile = partsOfQueryString[0];
		if (partsOfQueryString.length > 1) {
			if (window.location.pathname.endsWith(partsOfQueryString[1] + '/')) {
				language = '';
			} else {
				language = '../' + partsOfQueryString[1] + '/';
			}
			languageCode = partsOfQueryString[1];
		} else {
			language = 'et';
		}

		switch (targetFile) {
			case "index":
			default: {
				load({
					files: {
						aside: [{
							file: language + 'aside.html',
							target: 'aside'
						}],
						css: [{
							file: '../../css/html-css-examples.css',
							target: 'style'
						}],
						navigation: [{
							file: language + 'navigation.html',
							target: 'navigation'
						}]
					},
					language: languageCode,
					name: language + targetFile,
					title: {
						'et': 'Kverkfjallaleið'
					}
				});
				break;
			}
		}
	} else {
		var languageInPath = window.location.pathname.split('/');
		languageCode = languageInPath[languageInPath.length - 2];
		load({
			files: {
				css: [{
					file: '../../css/html-css-examples.css',
					target: 'style'
				}],
				navigation: [{
					file: language + 'navigation.html',
					target: 'navigation'
				}]
			},
			language: languageCode,
			name: 'index',
			title: {
				'et': 'Kverkfjallaleið'
			}
		});
	}

}

/**
 * This function navigates to the correct language page.
 * 
 * @param language
 *            the language code
 * @returns
 */
function navigateLanguage(language) {
	if (window.location.search.length > 0) {
		window.location.search = window.location.search.slice(0, -2) + language;
	} else {
		window.location.href = window.location.href.slice(0, -3) + language;
	}
}

/*loadMain();*/
import { Story } from '/js/Story.js';
import { Translation } from '/js/Translation.js';
class Poster {
	/**
	 * @var string[string][][string] parameters.files the files according to type
	 *      whose indexes are <code>file</code> (the relative path to the file
	 *      from the HTML-file) and <code>target</code> for the ID of the target
	 *      element. The type is either <code>html</code>, <code>css</code> or
	 *      <code>js</code>
	 */
	static currentFiles = [];
	/**
	 * @var string the title of the page
	 */
	static currentTitle;
	static defaultName = 'kverkfjallaleið-islandis';
	static currentStory;
	static availableLanguages = [];
	static currentLanguage;
	static currentTranslation;
	static stories = [
		new Story({
			'translations': [
				new Translation({
					'language': 'et',
					'name': 'Kverkfjallaleið Islandis'
				})
			]
		}),
		new Story({
			'translations': [
				new Translation({
					'language': 'et',
					'name': 'Kus on Kverkfjallaleið?'
				})
			]
		}),
		new Story({
			'translations': [
				new Translation({
					'language': 'et',
					'name': 'Mis on Kverkfjallaleið?'
				})
			]
		}),
		new Story({
			'translations': [
				new Translation({
					'language': 'et',
					'name': 'Geoloogiline ehitus'
				})
			]
		}),
		new Story({
			'translations': [
				new Translation({
					'language': 'et',
					'name': 'Hoovused'
				})
			]
		}),
		new Story({
			'translations': [
				new Translation({
					'language': 'et',
					'name': 'Kliima'
				})
			]
		}),
	];
	
	/**
	 * This function checks whether all the files are downloaded and if they are,
	 * the contents will be set.
	 * 
	 * @param string
	 *            parameters.callback the callback
	 */
	static checkFiles(parameters) {
		var allReceived = false;
		for (var indexInFile in Poster.currentFiles) {
			for (var indexInType in Poster.currentFiles[indexInFile]) {
				// console.log(" 16:
				// "+currentFiles[indexInFile][indexInType].content);
				if (!Poster.currentFiles[indexInFile][indexInType].content) {
					break;
				}
			}
		}
		switch (parameters.type) {
			case 'article': {
				document.getElementsByTagName('article')[0].innerHTML = '';
				for (var indexInFile in Poster.currentFiles.article) {
					document.getElementsByTagName('article')[0].innerHTML += Poster.currentFiles.article[indexInFile].content;
				}
				if (parameters.callback) {
					parameters.callback();
				}
				break;
			}
			case 'css': {
				document.querySelector('style').innerHTML = '';
				for (var indexInFile in Poster.currentFiles.css) {
					document.querySelector('style').innerHTML += Poster.currentFiles.css[indexInFile].content;
				}
				break;
			}
			case 'footer': {
				document.getElementById('footer').innerHTML = '';
				for (var indexInFile in Poster.currentFiles.navigation) {
					document.getElementById('footer').innerHTML += Poster.currentFiles.footer[indexInFile].content;
				}
				break;
			}
			case 'html': {
				document.getElementById('mainContainer').innerHTML = '';
				for (var indexInFile in Poster.currentFiles.html) {
					document.getElementById('mainContainer').innerHTML += Poster.currentFiles.html[indexInFile].content;
				}
				if (!document.querySelector("h1")) {
					var h1 = document.createElement("h1");
					h1.innerHTML = Poster.currentTitle;
					var content = document.getElementById('mainContainer');
					content.insertBefore(h1, content.firstChild);

				}
				if (parameters.callback) {
					parameters.callback();
				}
				break;
			}
			case 'js': {
				var script = document.getElementById('script');
				script.innerHTML = '';
				for (var indexInFile in Poster.currentFiles.js) {
					console.log(" 48 ");
					script.innerHTML += Poster.currentFiles.js[indexInFile].content;
				}
				if (parameters.callback) {
					script.innerHTML += parameters.callback;
				}
				eval(script.innerHTML);
				break;
			}
			case 'navigation': {
				document.getElementById('navigation').innerHTML = '';
				for (var indexInFile in Poster.currentFiles.navigation) {
					document.getElementById('navigation').innerHTML += Poster.currentFiles.navigation[indexInFile].content;
				}
				let ul = document.createElement('ul');
				ul.setAttribute('class', 'Sidebar');
				for (const language of Poster.availableLanguages) {
					if (language !== Poster.currentLanguage) {
						let a = document.createElement("a");
						a.setAttribute('href', Poster.slugify({
							'original': Poster.currentStory.getTranslations().find(element => language === element.getLanguage()).getName()
						}));
						a.innerHTML = language;
						let li = document.createElement('li');
						li.appendChild(a);
						ul.appendChild(li);

					}
				}
				let menuOfLanguages = document.getElementById('menuOfLanguages');
				menuOfLanguages.appendChild(ul);
				let menuOfContent = document.getElementById('menuOfContent');
				for (const STORY of Poster.stories) {
					const TRANSLATION = STORY.getTranslations().find(element => Poster.currentLanguage === element.getLanguage());
					const slug = Poster.slugify({
						original: TRANSLATION.getName()
					});
					if (slug.indexOf('pavid-98') < 0) {
						let a = document.createElement("a");
						a.setAttribute('href', slug);
						a.innerHTML = TRANSLATION.getName();
						let li = document.createElement('li');
						li.appendChild(a);
						menuOfContent.appendChild(li);
					} else {
						document.getElementById("pavid98").onclick = function() {
							window.location.href = slug;
						}
					}
				}

				break;
			}
			default: {
				console.log(' 328: What type is this: ' + parameters.type);
			}
		}
	}

	/**
	 * This function loads the contents of a HTML file into the target.
	 * 
	 * @param string
	 *            parameters.callback the callback
	 * @param string[string][][string]
	 *            parameters.files
	 * @see currentFiles
	 * @param string
	 *            parameters.name the name of the target HTML-file for the content
	 *            part without the suffix
	 * @param string
	 *            parameters.title the title of the page which will be used as the
	 *            main heading if it is not present
	 */
	static load(parameters) {
		Poster.currentFiles = parameters.files;
		if (parameters.hasOwnProperty("title")) {

			Poster.currentFiles.html = [];
			Poster.currentFiles.html.push({
				file: parameters.name + ".html",
				target: 'mainContainer'
			});
			document.querySelector("title").innerHTML = parameters.title;
		}
		var xhr = {};
		document.getElementById('script').innerHTML = '';
		for (var indexOfFile in Poster.currentFiles) {
			for (var indexInType in Poster.currentFiles[indexOfFile]) {
				let xhr = [];
				xhr[indexInType + indexOfFile] = new XMLHttpRequest();
				xhr[indexInType + indexOfFile].type = indexOfFile;
				xhr[indexInType + indexOfFile].index = indexInType;
				xhr[indexInType + indexOfFile]
					.addEventListener(
						"load",
						function(evt) {
							if (undefined == Poster.currentFiles[this.type]) {
								console.error(this.type);
							}
							Poster.currentFiles[this.type][this.index].content = this.responseText;
							if (this.type === 'js') {
							}
							if (parameters.callback) {
								Poster.checkFiles({
									callback: parameters.callback,
									language: parameters.language,
									type: this.type
								});

							} else {
								Poster.checkFiles({
									language: parameters.language,
									type: this.type
								});
							}
						});
				xhr[indexInType + indexOfFile].addEventListener("progress",
					function(event) {
						if (event.lengthComputable) {
							var percentComplete = event.loaded / event.total;
						} else {
							// Unable to compute progress information since the
							// total
							// size is unknown
						}
					});
				xhr[indexInType + indexOfFile].addEventListener("error", function(
					event) {
					console.log(' 152: ' + event);
					console.error(" 130: Faili ei saa kätte: "
						+ PaddleTennis.currentFiles[indexOfFile][indexInType].file + " ("
						+ indexOfFile + ", " + indexInType + ")");
				});
				xhr[indexInType + indexOfFile].open('GET',
					Poster.currentFiles[indexOfFile][indexInType].file, true);
				xhr[indexInType + indexOfFile].withCredentials = 'true';
				xhr[indexInType + indexOfFile].setRequestHeader('X-PINGARUNER',
					'pingpong');
				xhr[indexInType + indexOfFile].setRequestHeader('Cache-Control',
					'no-cache');
				xhr[indexInType + indexOfFile].setRequestHeader('Pragma',
					'Cache-Control: no-cache');
				xhr[indexInType + indexOfFile].setRequestHeader("Expires",
					"Mon, 1 Jan 1990 00:00:00 GMT");
				xhr[indexInType + indexOfFile].send();
			}
		}
	}

	/**
	 * This function replaces unallowed signs in the title and creates an
	 * appropriate alias.
	 *
	 * @access public
	 * @author Kalmer Piiskop
	 * @param string $parameters['original'] the original string
	 * @return string the slug
	 */
	static slugify(parameters) {

		return Poster.trimDashes(parameters.original.replace(/[^\p{L}\p{N}]/gui, '-').replace(/-(-)*/i, '-').toLocaleLowerCase());

	}
	static start() {

		let partsOfPathname = window.location.pathname.split("/");
		let name = decodeURI(partsOfPathname[partsOfPathname.length - 1]);
		if ('' === name) {
			name = Poster.defaultName
		}
		let translation;
		for (const story of Poster.stories) {
			translation = story.getTranslations().find(element => name === Poster.slugify({
				'original': element.getName()
			}));
			if (undefined !== translation) {
				Poster.currentStory = story;
				Poster.currentTranslation = translation;
			}
			for (const translation of story.getTranslations()) {
				if (!Poster.availableLanguages.includes(translation.getLanguage())) {
					Poster.availableLanguages.push(translation.getLanguage());
				}

			}
		}
		Poster.currentLanguage = Poster.currentTranslation.getLanguage();
		Poster.currentTitle = Poster.currentTranslation.getName();
		Poster.load({
			callback: Poster.bindButtons,
			files: {
				css: [{
					file: 'css/html-css-examples.css',
					target: 'style'
				}],
				navigation: [{
					file: 'html/' + Poster.currentLanguage + '/navigation.html',
					target: 'navigation'
				}]
			},
			language: Poster.currentLanguage,
			name: 'html/' + Poster.currentLanguage + '/' + Poster.slugify({
				'original': name
			}),
			title: Poster.currentTranslation.getName()
		});

	}
	static trimDashes(str) {
		return str.replace(/^-*|-*$/g, '');
	}
	static showArticle(parameters) {
		Poster.load({
			files: {
				'article': [{
					'file': 'html/' + Poster.currentLanguage + '/' + parameters.name + '.html',
					'target': 'article'
				}]
			},
			'callback': Poster.displayArticle
		});

	}
	static bindButtons() {
		document.getElementById("svgIceland").onload = function() {

			const pathsToTargets = [
				{
					index: 0,
					idTarget: "what"
				},
				{
					index: 1,
					idTarget: "where"
				},
				{
					index: 2,
					idTarget: "geology"
				},
				{
					index: 3,
					idTarget: "plants"
				},
				{
					index: 4,
					idTarget: "animals"
				},
				{
					index: 5,
					idTarget: "humanActivities"
				},
				{
					index: 6,
					idTarget: "climate"
				},
				{
					index: 7,
					idTarget: "currents"
				},
				{
					index: 8,
					idTarget: "soil"
				},
				{
					index: 9,
					idTarget: "sources"
				}
			];
			
			let paths = document.getElementById("svgIceland").contentDocument.getElementsByTagName("g")[0].getElementsByTagName("path");
			for (let indexOfPath = 0; indexOfPath < paths.length; indexOfPath++) {
				paths[indexOfPath].onclick = function() {
					document.getElementById(pathsToTargets[indexOfPath].idTarget).scrollIntoView({
						behavior: "smooth"
					});
				}
				let style = paths[indexOfPath].getAttribute("style");
				paths[indexOfPath].setAttribute("style", style + " cursor: pointer;");
			}
		}
		for (const hand of document.getElementsByClassName("ToTheTop")) {
			hand.onclick = function() {
				document.body.scrollIntoView({
					behavior: "smooth"
				});
			};
		}
		//		document.getElementById("buttonForWhat").onclick = function(){
		//			Poster.showArticle({
		//				'name': 'mis-on-kverkfjallaleið'
		//			});
		//		}
		//		document.getElementById("buttonForWhere").onclick = function(){
		//			Poster.showArticle({
		//				'name': 'kus-on-kverkfjallaleið'
		//			});
		//		}
		//		document.getElementById("buttonForGeologicalBuild").onclick = function() {
		//			Poster.showArticle({
		//				'name': 'geoloogiline-ehitus'
		//			});
		//		}
		//		document.getElementById("buttonForClimate").onclick = function(){
		//			Poster.showArticle({
		//				'name': 'kliima'
		//			});
		//		}
		//		document.getElementById("buttonForCurrents").onclick = function(){
		//			Poster.showArticle({
		//				'name': 'hoovused'
		//			});
		//		}
		//		document.getElementById("buttonForClosing").onclick = function() {
		//			document.getElementById("buttonForClosing").style.display = 'none';
		//			document.getElementsByTagName("article")[0].style.display = 'none';
		//		}
	}
	static displayArticle() {
		document.getElementsByTagName("article")[0].style.display = 'flex';
		document.getElementById("buttonForClosing").style.display = 'block';
	}
}
Poster.start();
