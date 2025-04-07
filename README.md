# Projeto final da matéria de Integração Contínua, DevOps e Computação em Nuvem [25E1_3]

## Descrição do Projeto

O **File Service** é um serviço desenvolvido para gerenciar o upload de imagens e conversão de formatos. Para fins deste projeto, o serviço é capaz de converter estruturas HTML em documentos PDF através do Puppeteer.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
/projeto
	├── assets/          # recursos para a geração do readme.
	├── file-service/    # código fonte do serviço.
	├── jenkins/         # Configuração do Jenkins para CI/CD.
	└── kubernetes/      # Configuração do Kubernetes para orquestração de containers.
```

## Como Executar o Projeto

1. Clone o repositório:
	 ```bash
	 git clone https://github.com/franklinveras/projeto-final-infnet-k8s.git
	 cd projeto-final-infnet-k8s
	 ```

2. Rode o jenkins com o docker composer:
	 ```
	 cd jenkins
	 docker-compose up -d
	 ```

3. Configure as variáveis de ambiente:
	execute o JenkinsFile no Jenkins.

## Avaliação

<ol>
	<li>Utilize o Docker para criar uma imagem personalizada de alguma aplicação previamente feita por você.<br/><img src="/assets/1a.png"></li>
	<ol style="list-style-type: lower-alpha;">
		<li>Publique a sua imagem no Docker Hub.</li>
	</ol>
	<li>Suba sua imagem em algum cluster kubernetes, seguindo as seguintes especificações:</li>
	<ol style="list-style-type: lower-alpha;">
		<li>Utilize Deployment para subir sua aplicação com 4 réplicas.</li>
		<li>Exponha sua aplicação de modo que ela fique acessível fora do Cluster (NODEPORT).</li>
		<li>Se sua aplicação fizer uso de banco de dados, crie um POD com o mesmo e deixe-o acessível através do ClusterIP. Se sua aplicação não fizer uso de um BD suba uma imagem do Redis e crie um ClusterIP para o mesmo.</li>
		<li>Crie algum probe para sua aplicação (Readness ou Liveness.)</li>
	</ol>
	<li>Crie a estrutura para monitorar sua aplicação com o Prometheus e o Grafana (ou qualquer ferramenta a sua escolha: você deve ter um servidor de métricas e alguma ferramenta para dashboards).</li>
	<ol style="list-style-type: lower-alpha;">
		<li>Apenas o Grafana deverá ficar acessível para fora do Cluster.</li>
		<li>Utilize um PVC para escrever os dados do Prometheus de maneira persistente.</li>
		<li>Crie dashboards do Grafana que exponha dados sensíveis da sua aplicação (memória, cpu, etc.)</li>
	</ol>
	<li>Utilize o Jenkins (ou qualquer ferramenta) para criar um pipeline de entrega do seu projeto.</li>
	<li>Execute um stress test do seu projeto e tire print do Dashboard sofrendo alterações.</li>
</ol>
