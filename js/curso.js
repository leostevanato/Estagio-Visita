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

function setItemMenuAtivo(elemento) {
	let itemMenuList = document.querySelectorAll(".item-menu");
	
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

const slugify = str =>
	str.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');

var regex_data = /([0-9]{2})[\-/ \.]([0-9]{2})/;
var largura_coluna = "";
var esquerda_menu = "";
var opacity_menu = 0;
var item_menu_ativo;
var layout_mobile_width = 768;
var layout_mobile = true;

document.addEventListener("DOMContentLoaded", () => {
	substituirTextoInnerHtml(document.querySelector('#curso-container'), string_alvo, codigo_pasta_arquivos);

	if (window.screen.width >= layout_mobile_width) {
		layout_mobile = false;
	}

	const iconeMenu = document.getElementById('icone-menu');
	const menuLateral = document.getElementById('menu-lateral');
	const resetarMenu = new Event('resetar');
	const abrirMenu = new Event('abrir');
	const fecharMenu = new Event('fechar');
	const trocarMenu = new Event('trocar');
	const itens_menu = [];

	let conta_itens = 0;
	let value = "";

	configuracoesJSON.menu.items.forEach(item => {
		if (item.mostrar) {
			value = item.texto;

			let novo_item = document.createElement("div");

			novo_item.classList.add("item-menu");

			if (item.bloquear) {
				novo_item.classList.add("bloqueado");
			}

			novo_item.dataset.item = slugify(value);

			let marcador_ativo = document.createElement("span");
			marcador_ativo.classList.add("marcador-ativo");

			let texto = document.createElement("span");
			texto.innerText = value;
			texto.classList.add("texto");

			novo_item.appendChild(marcador_ativo);
			novo_item.appendChild(texto);
			menuLateral.appendChild(novo_item);

			let itemConteudo = document.querySelector('.item-conteudo[data-item="' + novo_item.getAttribute("data-item") + '"]');

			if (itemConteudo.getAttribute("data-link") != null) {
				novo_item.dataset.link = itemConteudo.getAttribute("data-link");
			}

			if (!item.bloquear) {
				novo_item.addEventListener("click", function(event) {
					if (novo_item.getAttribute("data-link") != null) {
						window.open(novo_item.getAttribute("data-link"));
						return false;
					} else {
						setItemMenuAtivo(novo_item);
						menuLateral.dispatchEvent(fecharMenu);
					}
				});
			}

			if (conta_itens == 0) {
				setItemMenuAtivo(novo_item);
			}

			if (conta_itens != itens_menu.length - 1) {
				var item_menu_separador = document.createElement("div");

				item_menu_separador.classList.add("item-menu-separador");

				menuLateral.appendChild(item_menu_separador);
			}

			conta_itens++;
		}
	});

	document.querySelector('.item-conteudo[data-item="inicio"] .enviar-termo > a').setAttribute('href', urlTermoCompromisso + configuracoesJSON.idUrlTermoCompromisso);

	document.querySelector('.item-conteudo[data-item="semana-3"] a.acessar-formulario').setAttribute('href', urlAcessarFormulario + configuracoesJSON.idUrlSemana3AcessarFormulario);

	let contaEnviarArqPubli = 1;

	while (configuracoesJSON['idUrlEnviarArquivoPublicacao' + contaEnviarArqPubli]) {
		document.querySelector('#publicacao-' + contaEnviarArqPubli + ' > a.enviar-arquivo').setAttribute('href', urlEnviarArquivoPublicacao + configuracoesJSON['idUrlEnviarArquivoPublicacao' + contaEnviarArqPubli]);

		contaEnviarArqPubli++;
	}
	
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
});

window.addEventListener('load', () => {
	let menuLateralElemento = document.getElementById('menu-lateral');
	let menuLateralStyles = window.getComputedStyle(menuLateralElemento);
	let menuLateralAlturaMin = 0;

	menuLateralElemento.childNodes.forEach(item => {
		menuLateralAlturaMin += parseInt(window.getComputedStyle(item).height);
	});

	menuLateralAlturaMin += parseInt(menuLateralStyles.paddingTop) + parseInt(menuLateralStyles.paddingBottom);

	if (menuLateralAlturaMin > parseInt(window.getComputedStyle(document.getElementById('coluna-conteudo')).getPropertyValue("min-height"))) {
		document.getElementById('coluna-conteudo').style.minHeight = menuLateralAlturaMin + "px";
	}

	// setItemMenuAtivo(document.querySelector('.item-menu[data-item="semana-3"]'));
});