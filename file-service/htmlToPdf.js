const puppeteer = require("puppeteer");
let browser;

async function startBrowser() {
	if (!browser) {
		console.log('Starting headless Chrome browser...')
		if(process.env.NODE_ENV === 'production'){
			browser = await puppeteer.launch({
				headless: true,
				args: [
					'--no-sandbox',
					'--disable-setuid-sandbox',
					'--disable-dev-shm-usage',
					'--disable-accelerated-2d-canvas',
					'--disable-gpu',
					'--no-zygote',
					'--single-process'
				],
			});
		}else{
			browser = await puppeteer.launch({headless: true, dumpio: true});
		}
		console.log('Browser started')
	}

	return browser;
}
	
async function htmlToPDF(html, footer = ''){

	if(!browser){
		await startBrowser();	
	} 

	const page = await browser.newPage();
	await page.setContent(html);
	
	const pdf = await page.pdf(
		{	
			margin: {
				top:    '0px',
				right:  '0px',
				bottom: '0px',
				left:   '0px'
			},
			format: 'A4',
			printBackground: true,
			displayHeaderFooter: !!footer,
			footerTemplate:  `
            <div style="width:100%; font-size:9pt; display:flex; flex-direction:row; justify-content: space-between; align-items: flex-end">
				<div style="margin-right:15mm; text-align: right;width: 15mm">&nbsp;</div>
				${footer || ''}
				<div style="margin-right:15mm; text-align: right;width: 15mm"><span class="pageNumber"></span> / <span class="totalPages"></span></div>
            </div>
        `,
			headerTemplate:'<div></div>'
		}
	);

	await page.close(); 

	return pdf
	
}

async function closeBrowser() {
	if (browser) {
		console.log('Closing headless Chrome browser...')
		await browser.close();
		console.log('Browser closed')
	}
}

module.exports = {
	htmlToPDF,
	startBrowser,
	closeBrowser

};