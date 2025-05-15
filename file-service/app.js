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
const client = require('prom-client');

// Configuração do registro de métricas
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Métrica personalizada: contador de requisições
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP recebidas',
  labelNames: ['method', 'route', 'status'],
});

// Registra a métrica personalizada
register.registerMetric(httpRequestCounter);

startBrowser();

const app  = express();
const port = 3000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Middleware para coletar métricas de requisições
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Middleware para verificar o cabeçalho de autenticação
app.get('/', (req, res) => {
	res.send('Integração Contínua, DevOps e Computação em Nuvem [25E1_3] - Franklin Sertão - Teste Kubernetes');
});

// Endpoint para converter HTML em PDF
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

// Endpoint para expor métricas
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

//Abre o servidor para escutar requisições
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