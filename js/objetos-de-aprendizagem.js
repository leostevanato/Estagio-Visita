function criarObjeto(objeto) {
	let novo_objeto = document.createElement("div");
	novo_objeto.classList.add("objeto");

	let imagem = document.createElement("img");
	imagem.classList.add("objeto-imagem");
	imagem.src = url_mdl_arquivos + "imagens/thumbs/" + objeto.thumb;
	imagem.alt = objeto.thumbAlt;

	let conteudo = document.createElement("div");
	conteudo.classList.add("objeto-conteudo");

	let tipo = document.createElement("div");
	tipo.classList.add("objeto-tipo");
	tipo.textContent = objeto.tipo;

	let titulo = document.createElement("div");
	titulo.classList.add("objeto-titulo");
	titulo.textContent = objeto.titulo;

	let botao = document.createElement("a");
	botao.classList.add("objeto-botao");
	botao.href = objeto.botaoLink;
	botao.target = "_blank";
	botao.textContent = objeto.botaoTexto + " ‣‣";

	conteudo.appendChild(tipo);
	conteudo.appendChild(titulo);
	conteudo.appendChild(botao);

	novo_objeto.appendChild(imagem);
	novo_objeto.appendChild(conteudo);

	return novo_objeto;
}

let objetos_aprendizagem_promise = fetch(url_mdl_arquivos + 'objetos-de-aprendizagem.json');

document.addEventListener("DOMContentLoaded", () => {
	objetos_aprendizagem_promise.then(response => {
		return response.json();
	}).then(objetosJSON => {
		objetosJSON.forEach(item => {
			let elemento_objetos = document.querySelector('.item-conteudo[data-item="' + item.itemConteudo + '"] .objetos');

			item.objetos.forEach(objeto => {
				let novo_objeto = criarObjeto(objeto);
				elemento_objetos.appendChild(novo_objeto);
			});
		});
	}).catch(error => {
		console.log("ERRO: " + error);
	});
});