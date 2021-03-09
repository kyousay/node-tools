import puppeteer from 'puppeteer';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

type ArgumentTypes<T> = T extends (options: infer I ) => any ? I : never;
type LaunchOptionType = ArgumentTypes<typeof puppeteer.launch>

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
	const options: LaunchOptionType = {
		headless: false,
		slowMo: 300  // 動作を遅く(ページの読み込みが遅いことを考慮して常時必要)
	};
	const browser = await puppeteer.launch(options);
	const page = await browser.newPage();
	
	for(let i = 0; i < testURL.length; i++) {
		await page.goto(testURL[i]);
		await page.screenshot({ path: `./resource/output/${i + 1}.png`, fullPage: true});
	}

	await browser.close();
})();