function substituirTextoInnerHtml(elemento, txt_velho, txt_novo) {
	elemento.innerHTML = elemento.innerHTML.replace(txt_velho, txt_novo);
}

function elementoClick(element) {
	element.addEventListener("click", function(event) {
		if (element.getAttribute("data-alvo") != null) {
			let elemento;

			if (document.querySelector('.item-menu[data-item="' + element.getAttribute("data-alvo") + '"]')) {
				elemento = document.querySelector('.item-menu[data-item="' + element.getAttribute("data-alvo") + '"]');
			}

			if (typeof elemento !== 'undefined') {
				setItemMenuAtivo(elemento);
			}
		}

		if (element.getAttribute("data-link") != null) {
			window.open(element.getAttribute("data-link"));
			return false;
		}
	});
}

const slugify = str =>
	str.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');

var regex_data = /([0-9]{2})[\-/ \.]([0-9]{2})/;

const itens_menu = [
	"Início",
	"Certificado"
];

let configuracoes_promise = fetch(url_mdl_arquivos + 'curso-configuracoes.json', {
	headers: {
		'Accept': 'application/json'
	}
});

document.addEventListener("DOMContentLoaded", () => {
	substituirTextoInnerHtml(document.querySelector('#curso-container'), string_alvo, codigo_pasta_arquivos);

	configuracoes_promise.then(response => {
		return response.json();
	}).then(configuracoesJSON => {
		/*
		configuracoesJSON.menu.items.forEach(item => {
			if (item.mostrar) {
				itens_menu.push(item.texto);
			}
		});
		*/
	}).catch(error => {
		console.log("ERRO: " + error);
	});

	function setItemMenuAtivo(elemento) {
		if (typeof item_menu_ativo === 'undefined' || item_menu_ativo.getAttribute("data-item") != elemento.getAttribute("data-item")) {
			if (itemMenuList) {
				itemMenuList.forEach(item => item.classList.remove("ativo"));
			}

			elemento.classList.add("ativo");
			item_menu_ativo = elemento;

			document.querySelector('#coluna-conteudo').dataset.itemAtivo = elemento.getAttribute("data-item");

			document.querySelectorAll(".item-conteudo").forEach(item => item.classList.remove("ativo"));

			document.querySelector('.item-conteudo[data-item="' + elemento.getAttribute("data-item") + '"]').classList.add("ativo");
		}
	}

	function animarMenu() {
		if (largura_coluna !== "") {
			$("#coluna-lateral").animate({
				width: largura_coluna
			}, 300);

			$("#menu-lateral").animate({
				marginLeft: esquerda_menu,
				opacity: opacity_menu
			}, 300, function() {
				if (opacity_menu == 0) {
					$(this).hide();
				}
			});

			$("#fundo-sombra").fadeToggle();
		}
	}

	var largura_coluna = "";
	var esquerda_menu = "";
	var opacity_menu = 0;
	var item_menu_ativo;
	var layout_mobile_width = 768;
	var layout_mobile = true;

	if (window.screen.width >= layout_mobile_width) {
		layout_mobile = false;
	}

	const iconeMenu = document.getElementById('icone-menu');
	const menuLateral = document.getElementById('menu-lateral');
	const resetarMenu = new Event('resetar');
	const abrirMenu = new Event('abrir');
	const fecharMenu = new Event('fechar');
	const trocarMenu = new Event('trocar');

	menuLateral.addEventListener('resetar', function(e) {
		menuLateral.classList.remove("aberto", "fechado");
		largura_coluna = "";
		esquerda_menu = "";
		opacity_menu = 0;
		menuLateral.removeAttribute('style');
		document.getElementById('coluna-lateral').removeAttribute('style');
		document.getElementById('fundo-sombra').removeAttribute('style');
	}, false);

	menuLateral.addEventListener('abrir', function(e) {
		if (layout_mobile) {
			menuLateral.classList.remove("fechado");
			menuLateral.classList.add("aberto");
			iconeMenu.classList.remove("fechado");
			iconeMenu.classList.add("aberto");

			largura_coluna = "172px";
			esquerda_menu = "26px";
			opacity_menu = 1;

			menuLateral.style.display = "block";

			animarMenu();
		}
	}, false);

	menuLateral.addEventListener('fechar', function(e) {
		if (layout_mobile) {
			menuLateral.classList.remove("aberto");
			menuLateral.classList.add("fechado");
			iconeMenu.classList.remove("aberto");
			iconeMenu.classList.add("fechado");

			largura_coluna = "52px";
			esquerda_menu = "0px";
			opacity_menu = 0;

			animarMenu();
		}
	}, false);

	menuLateral.addEventListener('trocar', function(e) {
		if (layout_mobile) {
			if (menuLateral.classList.contains("aberto")) {
				menuLateral.dispatchEvent(fecharMenu);
			} else {
				menuLateral.dispatchEvent(abrirMenu);
			}
		}
	}, false);

	itens_menu.forEach((value, index) => {
		var novo_item = document.createElement("div");

		novo_item.classList.add("item-menu");
		novo_item.innerText = value;
		novo_item.dataset.item = slugify(value);

		// console.log(value);

		menuLateral.appendChild(novo_item);

		if (index == 0) {
			setItemMenuAtivo(novo_item);
		}

		if (index != itens_menu.length - 1) {
			var item_menu_separador = document.createElement("div");

			item_menu_separador.classList.add("item-menu-separador");

			menuLateral.appendChild(item_menu_separador);
		}
	});

	var itemMenuList = document.querySelectorAll(".item-menu");

	itemMenuList.forEach((element) => {
		let itemConteudo = document.querySelector('.item-conteudo[data-item="' + element.getAttribute("data-item") + '"]');

		if (itemConteudo.getAttribute("data-link") != null) {
			element.dataset.link = itemConteudo.getAttribute("data-link");
		}

		element.addEventListener("click", function(event) {
			if (element.getAttribute("data-link") != null) {
				window.open(element.getAttribute("data-link"));
				return false;
			} else {
				setItemMenuAtivo(element);
				menuLateral.dispatchEvent(fecharMenu);
			}
		});
	});

	iconeMenu.addEventListener("click", function() {
		menuLateral.dispatchEvent(trocarMenu);
	}, false);

	var linkDentroTextoList = document.querySelectorAll(".link-dentro-texto");
	var botaoCtaList = document.querySelectorAll(".botao-cta");

	linkDentroTextoList.forEach((elemento) => {
		elementoClick(elemento);
	});

	botaoCtaList.forEach((element) => {
		elementoClick(element);
	});

	var caixas = document.querySelectorAll(".caixa");

	caixas.forEach((element) => {
		element.addEventListener("click", function(event) {
			window.open(element.getAttribute("data-link"));
			return false;
		});
	});

	window.addEventListener('resize', () => {
		if (window.screen.width >= layout_mobile_width) {
			layout_mobile = false;
			menuLateral.dispatchEvent(resetarMenu);
		} else {
			layout_mobile = true;
		}
	});

	// setItemMenuAtivo(document.querySelector('.item-conteudo[data-item="inicio"]'));
});