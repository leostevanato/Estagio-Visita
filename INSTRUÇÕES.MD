# **COMO COLOCAR O CURSO ESTÁGIO VISITA NO MOODLE**
<br>

- [COMO CRIAR UM CURSO NOVO DO ZERO](#como-criar-um-curso-novo-do-zero)
- [COMO CRIAR UM CURSO NOVO A PARTIR DE UM CURSO MODELO OU PRÉ-EXISTENTE](#como-criar-um-curso-novo-a-partir-de-um-curso-modelo-ou-pré-existente)
<br>

<br>

## **COMO CRIAR UM CURSO NOVO DO ZERO**
<br>

### **CRIAR A PASTA DE ARQUIVOS DE LAYOUT**
Após criar um novo curso, ative o modo de edição e crie um tópico. Crie uma pasta dentro dele onde serão aramazenados os arquivos de layout (imagens, CSS, Javascript, etc). Envie o arquivo **confirma_inscricao.jpg** e as pastas (e seus conteúdos) **css**, **imagens** e **js**. No caso da pasta **css**, o(s) arquivo(s) **.SCSS** não precisa(m) ser enviado(s). No caso da pasta **js**, o arquivo **funcoes.js** não precisa ser enviado. O arquivo **index.html** e a pasta **arquivos de configuração e de objetos** não devem ser enviados ao Moodle.

A estrutura de pastas vai ficar assim (com seus respectivos arquivos, que não estão sendo mostrados aqui):
```
├───css
├───imagens
│   ├───icones
│   └───thumbs
├───js
└───confirma_inscricao.jpg
```
Acesse a pasta criada e pare o mouse sobre qualquer arquivo para ver o código da pasta. O código da pasta é um código numérico de 6 dígitos que vem após a string **pluginfile.php/** na URL do arquivo. Anote esse número pois ele será usado mais tarde. Como exemplo, **vamos usar o número fictício 123456** (Exemplo de URL de arquivo: `https://www.educacaoadistancia.camara.leg.br/ead_cfd/pluginfile.php/123456/mod_folder/content/0/confirma_inscricao.jpg?forcedownload=1`). Saia da edição da pasta.
<br>

<br>

### **ADICIONAR BLOCOS DAS URLS CSS E JAVASCRIPT, CONFIGURAÇÕES DA TURMA E OBJETOS DE APRENDIZAGEM**
<br>

#### **Bloco CSS & JS Global**
Clique em **Blocos do Curso** e adicione um bloco do tipo **HTML**. Edite o bloco e dê o nome **CSS & JS Global**. Entre no modo de edição do HTML do conteúdo e adicione o seguinte código: 
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&amp;display=swap" rel="stylesheet" />

<script type="text/javascript">
var codigo_pasta_arquivos = "";
var string_alvo = /@codigoPastaArquivos@/gi;
var url_mdl_arquivos = "https://www.educacaoadistancia.camara.leg.br/ead_cfd/pluginfile.php/"+ codigo_pasta_arquivos + "/mod_folder/content/0/";
var urlPaginaCertificado = "https://www.educacaoadistancia.camara.leg.br/ead_cfd/mod/simplecertificate/view.php?id=";
var urlTermoCompromisso = "https://www.educacaoadistancia.camara.leg.br/ead_cfd/mod/assign/view.php?id=";
var urlEnviarArquivoPublicacao = "https://www.educacaoadistancia.camara.leg.br/ead_cfd/mod/assign/view.php?id=";
var urlAcessarFormulario = "https://www.educacaoadistancia.camara.leg.br/ead_cfd/mod/url/view.php?id=";

/**
 * tipo = "css" ou "javascript"
 * url_inicio = Primera parte da URL de onde o arquivo está.
 * url_fim = Parte final da URL (normalmente com a pasta e o nome do arquivo).
 * body_classes = Classes a serem adicionadas ao body (opcional).
*/
function montarUrlCssOuJavascript(tipo, url_inicio, url_fim, body_classes="") {
	let tipo_tag = (tipo === "css") ? "link" : (tipo === "javascript") ? "script" : "undefined";
	
	if (typeof tipo_tag != "undefined") {
		let url_elemento = document.createElement(tipo_tag);

		if (tipo_tag === "link") {
			url_elemento.rel = "stylesheet";
			url_elemento.href = url_inicio + url_fim;
		}

		if (tipo_tag === "script") {
			url_elemento.async = false;
			url_elemento.src = url_inicio + url_fim;
		}

		url_elemento.type = "text/" + tipo;
		
		document.head.appendChild(url_elemento);

		if (body_classes.trim().length > 0) {
			document.body.classList.add(body_classes);
		}
	}
}
</script>
```
Procure pela linha `var codigo_pasta_arquivos = "";` e digite o **código da pasta** obtido anteriormente entre as **""** (Exemplo: `var codigo_pasta_arquivos = "123456";`). É importante que não se faça nenhuma alteração além dessa indicada.

Clique em **Atualizar** na janela de edição do conteúdo HTML. Expanda a seção **Onde exibir esse código** e escolha a opção **Qualquer página**. Clique em **Salvar mudanças** na edição do bloco e volte para a página principal do curso.
<br>

<br>

#### **Bloco CSS & JS - Página principal**
Adicione mais um bloco do tipo HTML, dê o nome **CSS & JS - Página principal**, edite o conteúdo no modo HTML e adicione o seguinte código:
```html
<script type="text/javascript">
montarUrlCssOuJavascript("css", url_mdl_arquivos, "css/curso.css?forcedownload=1");
montarUrlCssOuJavascript("javascript", url_mdl_arquivos, "js/curso.js?forcedownload=1");
montarUrlCssOuJavascript("javascript", url_mdl_arquivos, "js/objetos-de-aprendizagem.js?forcedownload=1");
</script>
```
Clique em **Atualizar** na janela de edição do conteúdo HTML. Expanda a seção **Onde exibir esse código** e escolha a opção **Qualquer tipo de página principal de curso**. Clique em **Salvar mudanças** na edição do bloco e volte para a página principal do curso.
<br>

<br>

#### **Bloco Configurações do curso**
Adicione mais um bloco do tipo HTML, dê o nome **Configurações do curso**, edite o conteúdo no modo HTML e adicione o seguinte código:
```html
<script type="text/javascript">
var configuracoesJSON = {
	"titulo": "Curso Modelo",
	"ano": 2022,
	"turma": "A-XX",
	"idNoMoodle": 650,
	"idUrlTermoCompromisso": 99900,
	"idUrlEnviarArquivoPublicacao1": 99901,
	"idUrlEnviarArquivoPublicacao2": 99902,
	"idUrlEnviarArquivoPublicacao3": 99903,
	"idUrlSemana3AcessarFormulario": 99904,
	"menu": {
		"items": [
			{
				"mostrar": true,
				"bloquear": false,
				"texto": "Início"
			},
			{
				"mostrar": true,
				"bloquear": false,
				"texto": "Calendário"
			},
			{
				"mostrar": true,
				"bloquear": false,
				"texto": "Atividades avaliativas"
			},
			{
				"mostrar": true,
				"bloquear": false,
				"texto": "Semana 1"
			},
			{
				"mostrar": true,
				"bloquear": false,
				"texto": "Semana 2"
			},
			{
				"mostrar": true,
				"bloquear": false,
				"texto": "Semana 3"
			},
			{
				"mostrar": true,
				"bloquear": false,
				"texto": "Certificado"
			}
		]
	}
};
</script>
```
Depois será necessário alterar os valores das propriedades baseado nos valores do curso. Cada curso tem valores diferentes.

Após realizar as alterações necessárias, clique em **Atualizar** na janela de edição do conteúdo HTML. Expanda a seção **Onde exibir esse código** e escolha a opção **Qualquer tipo de página principal de curso**. Clique em **Salvar mudanças** na edição do bloco e volte para a página principal do curso.
<br>

<br>

#### **Bloco Objetos de aprendizagem**
Adicione mais um bloco do tipo HTML, dê o nome **Objetos de aprendizagem**, edite o conteúdo no modo HTML e adicione o seguinte código:
```html
<script type="text/javascript">
var objetosAprendizagemJSON = [
	{
		"id": 1,
		"itemConteudo": "semana-1",
		"titulo": "Semana 1",
		"objetos": [
			{
				"tipo": "Vídeo",
				"titulo": "O que é Democracia?",
				"botaoTexto": "Assistir",
				"botaoLink": "https://evc.camara.leg.br/material/o-que-e-democracia/",
				"thumb": "o-que-e-democracia.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Vídeo",
				"titulo": "O que é Poder Legislativo?",
				"botaoTexto": "Assistir",
				"botaoLink": "https://evc.camara.leg.br/material/o-que-e-poder-legislativo/",
				"thumb": "o-que-e-poder-legislativo.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Flux",
				"titulo": "O papel das Leis",
				"botaoTexto": "Ler",
				"botaoLink": "https://evc.camara.leg.br/material/o-papel-das-leis/",
				"thumb": "o-papel-das-leis.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Vídeo",
				"titulo": "Origens da representação e participação",
				"botaoTexto": "Assistir",
				"botaoLink": "https://www.youtube.com/watch?v=g7PsdD2fUMI&list=PLysoTmRxzFnXkAAXu3VYCpxFh4KPeuRte&index=28",
				"thumb": "origens-da-representacao-e-participacao.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Aula",
				"titulo": "Quem te representa?",
				"botaoTexto": "Assistir",
				"botaoLink": "https://www.youtube.com/watch?v=qK9GgsJQk3o&list=PLysoTmRxzFnUn8EO3l_rNxTLKF4_cPE9b&index=4",
				"thumb": "congresso-nacional.jpg",
				"thumbAlt": ""
			}
		]
	},
	{
		"id": 2,
		"itemConteudo": "semana-2",
		"titulo": "Semana 2",
		"objetos": [
			{
				"tipo": "Vídeo",
				"titulo": "Funcionamento do Parlamento",
				"botaoTexto": "Assistir",
				"botaoLink": "https://evc.camara.leg.br/material/funcionamento-do-parlamento/",
				"thumb": "funcionamento-do-parlamento.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Portal",
				"titulo": "Papel e estrutura da Câmara dos Deputados",
				"botaoTexto": "Acessar",
				"botaoLink": "https://evc.camara.leg.br/material/papel-e-estrutura-da-camara-dos-deputados/",
				"thumb": "papel-e-estrutura-da-camara-dos-deputados.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Portal",
				"titulo": "Entenda o processo legislativo",
				"botaoTexto": "Acessar",
				"botaoLink": "https://www.camara.leg.br/entenda-o-processo-legislativo/",
				"thumb": "entenda-o-processo-legislativo.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Vídeo",
				"titulo": "O dia do Deputado na Câmara",
				"botaoTexto": "Assistir",
				"botaoLink": "https://evc.camara.leg.br/material/o-dia-do-deputado-na-camara/",
				"thumb": "o-dia-do-deputado-na-camara.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Série de vídeos",
				"titulo": "Videoaulas de processo legislativo",
				"botaoTexto": "Assistir",
				"botaoLink": "https://evc.camara.leg.br/material/videoaulas-de-processo-legislativo/",
				"thumb": "videoaulas-de-processo-legislativo.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Vídeo",
				"titulo": "Verdade ou consequência? Deputados e Cidadãos",
				"botaoTexto": "Assistir",
				"botaoLink": "https://evc.camara.leg.br/material/verdade-ou-consequencia-deputados-e-cidadaos/",
				"thumb": "verdade-ou-consequencia-deputados-e-cidadaos.jpg",
				"thumbAlt": ""
			}
		]
	},
	{
		"id": 3,
		"itemConteudo": "semana-3",
		"titulo": "Semana 3",
		"objetos": [
			{
				"tipo": "Material multimídia",
				"titulo": "Como acompanhar e cobrar a sua Deputada, o seu Deputado",
				"botaoTexto": "Acessar",
				"botaoLink": "https://evc.camara.leg.br/material/como-acompanhar-e-cobrar-o-seu-deputado/",
				"thumb": "como-acompanhar-e-cobrar-a-sua-deputada-o-seu-deputado.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Portal",
				"titulo": "Transparência na Câmara dos Deputados",
				"botaoTexto": "Acessar",
				"botaoLink": "https://www.camara.leg.br/transparencia/",
				"thumb": "transparencia-na-camara-dos-deputados.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Áudio",
				"titulo": "Como vivo minha cidadania?",
				"botaoTexto": "Ouvir",
				"botaoLink": "https://evc.camara.leg.br/material/como-eu-vivo-a-minha-cidadania/",
				"thumb": "como-vivo-minha-cidadania.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Áudio",
				"titulo": "Conversas Democráticas",
				"botaoTexto": "Ouvir",
				"botaoLink": "https://evc.camara.leg.br/material/conversas-democraticas/",
				"thumb": "conversas-democraticas.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Áudio",
				"titulo": "Controle Social: você sabe o que é?",
				"botaoTexto": "Ouvir",
				"botaoLink": "https://evc.camara.leg.br/material/controle-social-voce-sabe-o-que-e/",
				"thumb": "controle-social-voce-sabe-o-que-e.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Texto",
				"titulo": "O que é lobby?",
				"botaoTexto": "Ler",
				"botaoLink": "https://evc.camara.leg.br/material/o-que-e-lobby/",
				"thumb": "o-que-e-lobby.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Quiz",
				"titulo": "Quem é você decidindo o futuro do país?",
				"botaoTexto": "Ler",
				"botaoLink": "https://evc.camara.leg.br/quiz_quem_e_voce_decidindo_o_futuro_do_pais/",
				"thumb": "quem-e-voce-decidindo-o-futuro-do-pais.jpg",
				"thumbAlt": ""
			},
			{
				"tipo": "Web Stories",
				"titulo": "Guia para sair do sofá",
				"botaoTexto": "Ler",
				"botaoLink": "https://evc.camara.leg.br/material/guia-para-sair-do-sofa/",
				"thumb": "guia-para-sair-do-sofa.jpg",
				"thumbAlt": ""
			}
		]
	}
];
</script>
```
Clique em **Atualizar** na janela de edição do conteúdo HTML. Expanda a seção **Onde exibir esse código** e escolha a opção **Qualquer tipo de página principal de curso**. Clique em **Salvar mudanças** na edição do bloco e volte para a página principal do curso.
<br>

<br>

#### **Bloco CSS & JS - Página confirma presença**
Adicione mais um bloco do tipo HTML, dê o nome **CSS & JS - Página confirma presença**, edite o conteúdo no modo HTML e adicione o seguinte código:
```html
<script type="text/javascript">
const texto_titulo_identificar_pagina_confirma_presenca = "Presença";

document.addEventListener("DOMContentLoaded", () => {
	const url_moodle_arquivos = (typeof url_mdl_arquivos == "undefined") ? "" : url_mdl_arquivos;
	const breadcrumb = document.querySelector("ul.breadcrumb");
	const titulo_pagina = breadcrumb.querySelector("li.breadcrumb-item:last-child").textContent;
	const pagina_confirma_presenca = titulo_pagina.startsWith(texto_titulo_identificar_pagina_confirma_presenca);

	if (pagina_confirma_presenca) {
		montarUrlCssOuJavascript("css", url_moodle_arquivos, "css/confirma-presenca.css?forcedownload=1", "pagina-confirma-presenca");

		var elemento_alvo = document.querySelector('#page-mod-page-view #region-main > [role=main] > .box > div');
		
		elemento_alvo.innerHTML = `<picture>
			<source media="(min-width:576px)" srcset="${url_moodle_arquivos}imagens/confirma_presenca_atividade_desktop.jpg">
			<img class="img-fluid" src="${url_moodle_arquivos}imagens/confirma_presenca_atividade_mobile.jpg" alt="Sua presença na atividade foi confirmada!">
		</picture>`;
	}
});
</script>
```
**IMPORTANTE:** O título de todas as páginas criadas com o objetivo de confirmar presença, devem começar com o valor da variável **texto_titulo_identificar_pagina_confirma_presenca** (nessas instruções o valor é **Presença**). Caso o início do título mude, deve-se mudar no código para que ele consiga identificar as páginas corretamente.

Clique em **Atualizar** na janela de edição do conteúdo HTML. Expanda a seção **Onde exibir esse código** e escolha a opção **Qualquer página**. Clique em **Salvar mudanças** na edição do bloco e volte para a página principal do curso.
<br>

<br>

### **ADICIONAR O HTML DO CURSO**
Abra o arquivo **index.html**, faça as alterações necessárias, como datas e horas, e copie todo o conteúdo que está entre `<!-- HTML PARA O MOODLE - COPIAR A PARTIR DAQUI -->` e `<!-- HTML PARA O MOODLE - COPIAR A ATÉ AQUI -->`.

Na página principal do curso, entre na Edição da seção Geral. Edite o conteúdo no modo de edição de HTML e cole o conteúdo copiado do arquivo **index.html**.

Clique em **Atualizar** na janela de edição do conteúdo HTML, clique em **Salvar mudanças** na edição da seção e volte para a página principal do curso.
<br>

<br>
<br>

---

## **COMO CRIAR UM CURSO NOVO A PARTIR DE UM CURSO MODELO OU PRÉ-EXISTENTE**
Caso o curso novo seja criado importando um curso já existente que esteja usando essa mesma estrutura, será necessário alterar as seguintes informações, que são únicas para cada curso:
- No bloco CSS & JS Global:
```
var codigo_pasta_arquivos = "";
```
- No bloco Configurações do curso:
```
var configuracoesJSON = {
	"titulo": "Curso Modelo",
	"ano": 2022,
	"turma": "A-XX",
	"idNoMoodle": 650,
	"idUrlTermoCompromisso": 99900,
	"idUrlEnviarArquivoPublicacao1": 99901,
	"idUrlEnviarArquivoPublicacao2": 99902,
	"idUrlEnviarArquivoPublicacao3": 99903,
	"idUrlSemana3AcessarFormulario": 99904,
```
<br>

<br>

---

### **VERFICAR O CURSO**
Verifique se todos os links, imagens e conteúdos estão corretos. Se possível, realizar um teste usando um usuário de testes do mesmo tipo que os alunos que terão acesso ao curso.

Fim.