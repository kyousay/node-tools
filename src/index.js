const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// path
const CWD = process.cwd();
const resource = path.join(CWD, 'resource');
const inputDir = path.join(resource, 'input');
const outputDir = path.join(resource, 'output');

const testURL = [
	'https://suumo.jp/hokkaido/',
	'https://suumo.jp/tohoku/',
	'https://suumo.jp/kanto/',
	'https://suumo.jp/koshinetsu/',
	'https://suumo.jp/tokai/',
	'https://suumo.jp/kansai/',
	'https://suumo.jp/shikoku/',
	'https://suumo.jp/chugoku/',
	'https://suumo.jp/kyushu/',
];

(async () => {
	// make ouput directory
	if(!fs.existsSync(outputDir)) {
		fs.mkdirSync('./resource/output');
	}

	// puppeteer launch options
	const options = {
		// headless: false,
		// slowMo: 300  // 動作を遅く(ページの読み込みが遅いことを考慮して常時必要)
	};
	const browser = await puppeteer.launch(options);
	const page = await browser.newPage();
	
	for(let i = 0; i < testURL.length; i++) {
		await page.goto(testURL[i]);
		await page.screenshot({ path: `./resource/output/${i + 1}.png`, fullPage: true});
	}

	await browser.close();
})();