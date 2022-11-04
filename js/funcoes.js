// ESSE ARQUIVO NÃO DEVE SER ENVIADO PARA O MOODLE. ELE É APENAS PARA MANTER O CÓDIGO MAIS ORGANIZADO.
// A FUNÇÃO PARA MONTAR URLS DEVE SER ADICIONADA DIRETA NO MOODLE.
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

// montarUrlCssOuJavascript("css", url_mdl_arquivos, "css/confirma-presenca.css?forcedownload=1", "pagina-confirma-presenca");
// montarUrlCssOuJavascript("css", url_mdl_arquivos, "css/curso.css?forcedownload=1");
// montarUrlCssOuJavascript("javascript", url_mdl_arquivos, "js/curso.js?forcedownload=1");
// montarUrlCssOuJavascript("javascript", url_mdl_arquivos, "js/objetos-de-aprendizagem.js?forcedownload=1");