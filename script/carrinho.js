function adicionarItem(nome, preco, quantidade = 1) {
  const itemExistente = Array.from(document.querySelectorAll(".item-row")).find(
    (item) => {
      return item.querySelector(".nome-produto").innerText === nome;
    }
  );
  if (itemExistente) {
    const inputQuantidade = itemExistente.querySelector(".quantidade-input");
    inputQuantidade.value = parseInt(inputQuantidade.value) + quantidade;
    atualizarTotal();
    return;
  }
  const itemCarrinho = document.createElement("div");
  itemCarrinho.classList.add("item-row");

  itemCarrinho.innerHTML = `
    
    <div class="produto">
        <img src="./assets/produtos/${nome}.jpg" alt="${nome}" class="imagem-produto" />
        <span class="nome-produto">${nome} </span>
    </div>

    <div class="desconto">
        <span class="valor-desconto">R$ 0,00</span>
    </div>
    
    <div class="preco">
        <span class="valor-preco">R$ ${preco.toFixed(2)}</span>
    </div>

    <div class="quantidade">
           <input type="number" value="${quantidade}" min="1" class="quantidade-input" oninput="atualizarTotal()">
        </div>

        <div class="delete">
            <button onclick="deletarItem(this)">Excluir</button>
        </div>

    
    `;

  /* adicionar item-carrinho */

  document.getElementById("item-carrinho").appendChild(itemCarrinho);
  atualizarTotal();
}

/* CARREGAR CARRINHO */
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.forEach((produto) => {
    adicionarItem(produto.nome, produto.preco, produto.quantidade);
  });
}

/* SALVAR CARRINHO */
function salvarCarrinho() {
  const carrinho = [];
  const items = document.querySelectorAll(".item-row");

  items.forEach((item) => {
    const nome = item.querySelector(".nome-produto").innerText;
    const preco = parseFloat(
      item.querySelector(".valor-preco").innerText.replace("R$", "").trim()
    );
    const quantidade = parseInt(item.querySelector(".quantidade-input").value);
    carrinho.push({ nome, preco, quantidade });
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

/* Validar FRETE */

function consultarFrete() {
  const cepInput = document.getElementById("cep-consulta").value;
  const mensagemFrete = document.getElementById("mensagem-frete");

  const cepValido = /^[0-9]{5}-?[0-9]{3}$/;
  const cepsInvalidos = [
    "00000-000",
    "11111-111",
    "22222-222",
    "33333-333",
    "44444-444",
  ];

  // Resetar classes antes de aplicar nova
  mensagemFrete.classList.remove("mensagem-erro", "mensagem-sucesso");

  if (cepsInvalidos.includes(cepInput)) {
    mensagemFrete.innerText = "Erro: Informe um CEP válido!";
    mensagemFrete.classList.add("mensagem-erro");
    return false;
  } else if (cepValido.test(cepInput)) {
    mensagemFrete.innerText = "Seu CEP foi validado com sucesso! Frete grátis aplicado!";
    mensagemFrete.classList.add("mensagem-sucesso");
    return true;
  } else {
    mensagemFrete.innerText = "Erro: Informe um CEP válido!";
    mensagemFrete.classList.add("mensagem-erro");
    return false;
  }
}

/* CUPOM DESCONTO */

let cupomValido = "DESCONTO10";
let desconto = 0;
let totalCarrinho = 0;

/* APLICAR CUPOM */
function aplicarCupom() {
  const cupomInserido = document
    .querySelector(".input-cupom")
    .value.trim()
    .toUpperCase();
  const avisoCupom = document.getElementById("aviso-cupom");
  const cuponsValidos = ["DESCONTO10", "PRIMEIRACOMPRA"]; 

  // Verifica se o cupom inserido é válido
  const isCupomValido = cuponsValidos.includes(cupomInserido);

  avisoCupom.classList.remove("mensagem-erro", "mensagem-sucesso");
  avisoCupom.style.display = "inline";

  if (isCupomValido) {
    if (cupomInserido === "PRIMEIRACOMPRA") {
      desconto = 0.2;
      avisoCupom.innerText = "Cupom aplicado com sucesso! Desconto de 20%.";
    } else {
      desconto = 0.1;
      avisoCupom.innerText = "Cupom aplicado com sucesso! Desconto de 10%.";
    }

    avisoCupom.classList.add("mensagem-sucesso");
    localStorage.setItem("cupomAplicado", cupomInserido);

  } else {
    const cupomSalvo = localStorage.getItem("cupomAplicado");
    const isCupomSalvoValido = cupomSalvo && cuponsValidos.includes(cupomSalvo);

    if (isCupomSalvoValido) {
      document.querySelector(".input-cupom").value = cupomSalvo;
      desconto = cupomSalvo === "PRIMEIRACOMPRA" ? 0.2 : 0.1;
    } else {
      desconto = 0;
      avisoCupom.innerText = "Erro: cupom inválido!";
      avisoCupom.classList.add("mensagem-erro");
    }
  }

  atualizarTotal();
}
/* REMOVER CUPOM */
function removerCupom() {
  localStorage.removeItem("cupomAplicado");
  document.querySelector(".input-cupom").value = "";
  desconto = 0;

  const avisoCupom = document.getElementById("aviso-cupom");

  avisoCupom.innerText = "Cupom removido com sucesso!";
  avisoCupom.classList.remove("mensagem-erro");
  avisoCupom.classList.add("mensagem-sucesso");
  avisoCupom.style.display = "inline";

  setTimeout(() => {
    avisoCupom.style.display = "none";
  }, 3000);

  atualizarTotal();
}
/* ATUALIZAR CARRINHO  */
function atualizarTotal() {
  let subtotal = 0;
  const itens = document.querySelectorAll(".item-row");

  itens.forEach((item) => {
    const preco = parseFloat(
      item.querySelector(".valor-preco").innerText.replace("R$", "").trim()
    );
    const quantidade = parseInt(item.querySelector(".quantidade-input").value);

    if (!isNaN(preco) && !isNaN(quantidade)) {
      subtotal += preco * quantidade;
    }
  });

  let valorDesconto = subtotal * desconto;
  totalCarrinho = subtotal - valorDesconto;

  itens.forEach((item) => {
    const preco = parseFloat(
      item.querySelector(".valor-preco").innerText.replace("R$", "").trim()
    );
    const quantidade = parseInt(item.querySelector(".quantidade-input").value);
    const descontoItem = preco * quantidade * desconto;

    item.querySelector(
      ".valor-desconto"
    ).innerText = `R$ ${descontoItem.toFixed(2)}`;
  });

  /* ATUALIZAR EM DIV */
  const totalCompra = document.getElementById("total-compra");
  if (totalCompra) {
    totalCompra.innerHTML =
      subtotal > 0
        ? `
            <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
            <p>Desconto: R$ ${valorDesconto.toFixed(2)}</p>
            <p><strong>Total: R$ ${totalCarrinho.toFixed(2)}</strong></p>
            
        `
        : `<p><strong> Carrinho Vazio</strong></p>`;

    /* atualizar em localStorage o carrinho */
    localStorage.setItem("totalCarrinho", totalCarrinho.toFixed(2));
  }

  salvarCarrinho();
}

/* DELETAR ITEMS */
function deletarItem(button) {
  let itemRow = button.closest(".item-row");
  let nomeProduto = itemRow
    ?.querySelector(".nome-produto")
    ?.textContent?.trim();
  if (!nomeProduto) return;

  let itensSalvos = JSON.parse(localStorage.getItem("carrinho")) || [];
  let novosItens = itensSalvos.filter((item) => item.nome !== nomeProduto);
  localStorage.setItem("carrinho", JSON.stringify(novosItens));

  itemRow.remove();
  atualizarTotal();
}

/* FINALIZAR COMPRA */
function finalizarCompra() {
  const mensagemFrete = document.getElementById("mensagem-frete");
  const avisoCompraFinalizada = document.getElementById("aviso-compra-finalizada");
  const totalCompra = document.getElementById("total-compra");

  // Função para exibir mensagens com classe CSS
  function exibirAviso(mensagem, tipo) {
    avisoCompraFinalizada.classList.remove("mensagem-sucesso", "mensagem-erro");
    avisoCompraFinalizada.innerText = mensagem;
    avisoCompraFinalizada.style.display = "block";
    if (tipo === "erro") {
      avisoCompraFinalizada.classList.add("mensagem-erro");
    } else if (tipo === "sucesso") {
      avisoCompraFinalizada.classList.add("mensagem-sucesso");
    }
  }

  // Verificar se o carrinho está vazio
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    exibirAviso("Erro: o carrinho está vazio!", "erro");
    return;
  }

  let login = JSON.parse(sessionStorage.getItem("usuarioLogado")) || [];

  const cepValido = consultarFrete();
  if (!cepValido) {
    exibirAviso("Erro: informe um cep válido!", "erro");
    return;
  }

  if (login.length <= 0) {
    exibirAviso("Erro: você precisa fazer login para finalizar!", "erro");
    setTimeout(() => {
      window.location.href = "login-page.html";
    }, 3000);
    return;
  }

  // Compra finalizada com sucesso
  exibirAviso("Compra Finalizada!", "sucesso");
}

document
  .querySelector(".btn-finalizar")
  .addEventListener("click", finalizarCompra);

/* LOAD ITEMS */

window.addEventListener("load", () => {
  carregarCarrinho();
  const cupomSalvo = localStorage.getItem("cupomAplicado");
  if (cupomSalvo) {
    document.querySelector(".input-cupom").value = cupomSalvo;
    aplicarCupom();
  }
  atualizarTotal();
});
