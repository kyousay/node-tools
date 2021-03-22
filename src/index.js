// puppeteer
const puppeteer = require('puppeteer');

// node builtin
const fs = require('fs');
const path = require('path');

// excel4node
const xl = require('excel4node');
const wb = new xl.Workbook();

// path
const outputDir = path.join('./resource', 'output');

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

		const ws = wb.addWorksheet(`Sheets ${i + 1}`);

		ws.cell(3, 4).string(testURL[i]);

		ws.addImage({
			path: `./resource/output/${i + 1}.png`,
			type: 'picture',
			position: {
			type: 'oneCellAnchor',
			from: {
				col: 5,
				colOff: '0.5in',
				row: 8,
				rowOff: 0,
			},
			},
		});
	}

	await browser.close();
	
	wb.write('./resource/output/ScreenShot.xlsx');
})();