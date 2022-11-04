const texto_titulo_identificar_pagina_confirma_presenca = "Presença";

document.addEventListener("DOMContentLoaded", () => {
	const url_moodle_arquivos = (typeof url_mdl_arquivos == "undefined") ? "" : url_mdl_arquivos;
	const breadcrumb = document.querySelector("ul.breadcrumb");
	const titulo_pagina = breadcrumb.querySelector("li.breadcrumb-item:last-child").textContent;
	const pagina_confirma_presenca = titulo_pagina.startsWith(texto_titulo_identificar_pagina_confirma_presenca);

	console.log(titulo_pagina);
	console.log(pagina_confirma_presenca);

	if (pagina_confirma_presenca) {
		montarUrlCssOuJavascript("css", url_moodle_arquivos, "css/confirma-presenca.css?forcedownload=1", "pagina-confirma-presenca");

		var elemento_alvo = document.querySelector('#page-mod-page-view #region-main > [role=main] > .box > div');
		
		elemento_alvo.innerHTML = `<picture>
			<source media="(min-width:576px)" srcset="${url_moodle_arquivos}imagens/confirma_presenca_atividade_desktop.jpg">
			<img class="img-fluid" src="${url_moodle_arquivos}imagens/confirma_presenca_atividade_mobile.jpg" alt="Sua presença na atividade foi confirmada!">
		</picture>`;
	}
});