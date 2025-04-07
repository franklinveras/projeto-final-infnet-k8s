/*******************************************************************************
 * File Service
 * Autor: Franklin Véras Sertão
 * 
 * Descrição: Serviço para manipulação de arquivos e tarefas relacionadas.
 * 
 *******************************************************************************/

const express    = require('express');
const bodyParser = require('body-parser');
const {htmlToPDF, startBrowser, closeBrowser}  = require('./htmlToPdf.js');

startBrowser();


const app  = express();
const port = 3000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', (req, res) => {
	res.send('Integração Contínua, DevOps e Computação em Nuvem [25E1_3] - Franklin Sertão - Teste Kubernetes');
});

app.post('/htmltopdf', async (req, res) => {
	const {html, footer} = req.body;

	if(!html){
		res.status(400).send('Missing html parameter');
		return;
	}
	
	try{
		const pdf = await htmlToPDF(html, footer);

		res.setHeader('Content-Type', 'application/pdf');
		res.write(pdf);
		res.end();
	}catch(e){
		console.log(e);
		//res.status(500).send(e);
		res.send(false);
	}
		
});

app.listen(port, () => {
	console.log(`File Service running on port ${port}`);
});

//Graceful shutdown
process.on('beforeExit', async () => {
	// shutdown express app here
	console.log('Shutting down...');

	// close browser
	await closeBrowser();

	process.exit(0);
});