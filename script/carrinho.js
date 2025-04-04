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

  // Expressão regular para verificar se o CEP é numérico e tem 8 dígitos
  const cepValido = /^[0-9]{5}-?[0-9]{3}$/;

  // Listar CEPs inválidos
  const cepsInvalidos = [
    "00000-000",
    "11111-111",
    "22222-222",
    "33333-333",
    "44444-444",
  ];

  // Verificar se o CEP inserido é inválido
  if (cepsInvalidos.includes(cepInput)) {
    mensagemFrete.innerText = "Erro: Informe um CEP válido!";
    mensagemFrete.style.color = "red";
    return false;
  } else if (cepValido.test(cepInput)) {
    mensagemFrete.innerText =
      "Seu CEP foi validado com sucesso! Frete grátis aplicado!";
    mensagemFrete.style.color = "green";
    return true;
  } else {
    mensagemFrete.innerText = "Erro: Informe um CEP válido!";
    mensagemFrete.style.color = "red";
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
  const cuponsValidos = ["DESCONTO10"];

    // Verifica se o cupom inserido é válido
  const isCupomValido = cuponsValidos.includes(cupomInserido);

  if (isCupomValido) {
    desconto = 0.1;
    avisoCupom.innerText =
      "Cupom aplicado com sucesso! Desconto de 10% ativado.";
    avisoCupom.style.color = "green";
    avisoCupom.style.display = "inline";
    localStorage.setItem("cupomAplicado", cupomInserido);
  } else {
    const cupomSalvo = localStorage.getItem("cupomAplicado");
    // Verifica uma única vez se o cupom salvo é válido
    const isCupomSalvoValido = cupomSalvo && cuponsValidos.includes(cupomSalvo);

    if (isCupomSalvoValido) {
      document.querySelector(".input-cupom").value = cupomSalvo;
      desconto = 0.1;
    } else {
      desconto = 0;
      avisoCupom.innerText = "Erro: cupom inválido!";
      avisoCupom.style.color = "red";
      avisoCupom.style.display = "inline";
    }
  }

  atualizarTotal();
}
/* REMOVER CUPOM */
function removerCupom() {
  localStorage.removeItem("cupomAplicado");
  document.querySelector(".input-cupom").value = "";
  desconto = 0;
  document.getElementById("aviso-cupom").innerText =
    "Cupom removido com sucesso!";
  document.getElementById("aviso-cupom").style.color = "green";
  setTimeout(() => {
    document.getElementById("aviso-cupom").style.display = "none";
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
  const avisoCompraFinalizada = document.getElementById(
    "aviso-compra-finalizada"
  );
  const totalCompra = document.getElementById("total-compra");

  // Verificar se o carrinho está vazio
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    avisoCompraFinalizada.innerText = "Erro: o carrinho está vazio!";
    avisoCompraFinalizada.style.color = "red";
    return;
  }
  let login = JSON.parse(sessionStorage.getItem("usuarioLogado")) || [];

  const cepValido = consultarFrete();
  if (!cepValido) {
    avisoCompraFinalizada.innerHTML = "Erro: informe um cep válido!";
    avisoCompraFinalizada.style.color = "red";
    return;
  }
  if (login.length <= 0) {
    avisoCompraFinalizada.innerText =
      "Erro: vc precisa fazer login para finalizar!";
    avisoCompraFinalizada.style.color = "red";
    setTimeout(() => {
      window.location.href = "login-page.html";
    }, 3000);
    return;
  }

  avisoCompraFinalizada.innerHTML = "Compra Finalizada";
  avisoCompraFinalizada.style.color = "green";
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
