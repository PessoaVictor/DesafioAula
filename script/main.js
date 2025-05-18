let login = JSON.parse(sessionStorage.getItem("usuarioLogado")) || [];
let nav = document.querySelector(".menu");
let ul = nav.querySelector("ul");

if (login.length > 0) {
  // troca do botão de entrar pelo de sair
  let loginBtn = document.getElementById("login");
  if (loginBtn) {
    loginBtn.textContent = "Sair";
    loginBtn.href = "index.html";
    loginBtn.id = "logout";

    loginBtn.addEventListener("click", function (event) {
      event.preventDefault();
      sessionStorage.clear();
      location.reload();
    });
  }
}

const cartIcon = document.getElementById("cart-icon");

if (cartIcon) {
  cartIcon.addEventListener("mouseenter", () => {
    cartIcon.src = "./assets/cart_hover.svg";
  });

  cartIcon.addEventListener("mouseleave", () => {
    cartIcon.src = "./assets/cart.svg";
  });
}

//produtos inicio
let produtosEmAlta = document.querySelector("#produtosEmAlta");
let produtosNormal = document.querySelector("#produtosNormais");

let ProdutosAlta = [
  { nome: "Desinfetante-e-bactericida", descricao: "lorem ipsum", preco: 70 },
  { nome: "Alimento-natural-para-coelho", descricao: "lorem ipsum", preco: 36 },
  { nome: "Cama-preta-zee", descricao: "lorem ipsum", preco: 540 },
  { nome: "Bebedouro", descricao: "lorem ipsum", preco: 75.2 },
  {
    nome: "Mordedor-galinha-para-cachorro",
    descricao: "lorem ipsum",
    preco: 8.7,
  },
  { nome: "Mordedor-bolinha", descricao: "lorem ipsum", preco: 7.6 },
];

let Produtos = [
  { nome: "Cortador-de-unhas", descricao: "lorem ipsum", preco: 25.2 },
  { nome: "Mini-bifinho-para-cachorro", descricao: "lorem ipsum", preco: 25.5 },
  { nome: "Tapete-limpa-patas", descricao: "lorem ipsum", preco: 56 },
  { nome: "Coleira-antipulgas", descricao: "lorem ipsum", preco: 200 },
  { nome: "Bandeja-preta-para-gatos", descricao: "lorem ipsum", preco: 20 },
  { nome: "Fonte-aqua-mini", descricao: "lorem ipsum", preco: 96 },
];

function RenderizarProdutos(lista, tipoLista) {
  for (let produto of lista) {
    let cardProduto = document.createElement("div");

    cardProduto.classList.add("card");
    let caminhoImagem = `./assets/produtos/${produto.nome}.jpg`;
    let nomeFormatado = produto.nome.replace(/-/g, " ");
    if(caminhoImagem){

      if (document.title == "Borcelle Pet-Shop") {
        
          cardProduto.innerHTML += `
             <img src="./assets/produtos/${
              produto.nome
             }.jpg" class="img-carrinho">
              <p class="nome-carrinho" style="vertica">${nomeFormatado}</p>
              <p class="preco-carrinho">Preço: R$ ${produto.preco.toFixed(2)}</p>
              <button class="btn-add-carrinho" type="submit">Adicionar ao carrinho</button>
          `;
        tipoLista.appendChild(cardProduto);
  
        
      } else if (document.title == "Produtos") {
        cardProduto.innerHTML += `
             <img src="./assets/produtos/${
               produto.nome
             }.jpg" class="img-carrinho">
              <p class="nome-carrinho" style="vertica">${nomeFormatado}</p>
              <p class="preco-carrinho">Preço: R$ ${produto.preco.toFixed(2)}</p>
              <button class="btn-add-carrinho" type="submit">Adicionar ao carrinho</button>
          `;
        produtosTodos.appendChild(cardProduto);
      }
    }
  }
}
RenderizarProdutos(ProdutosAlta, produtosEmAlta);
RenderizarProdutos(Produtos, produtosNormal);

function verificarProduto(lista, nome, preco) {
  //console.log("verificarProduto inicio: ", lista.nome);
  
  //console.log("verificarProduto: ", nomeFormatado);
  lista.forEach((element) => {
    let nomeFormatado = element.nome.replace(/-/g, " ");
    if (nomeFormatado == nome && element.preco == preco) {
      let produtoSelecionado = { nome, preco };
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(produtoSelecionado);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert("Produto adicionado ao carrinho!");
    }
  });
}

let produtosbtn = document.querySelectorAll(".btn-add-carrinho");
produtosbtn.forEach((produto) => {
  produto.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("oi");

    //pegando os dados dentro da div
    let div = this.closest("div");
    let paragraphs = div.querySelectorAll("p");
    let nome = paragraphs[0].textContent.trim();
    let preco = paragraphs[1].textContent.trim();
    preco = Number(preco.slice(preco.indexOf("$") + 1, preco.length));
    preco = Number(preco.toFixed(2));

    verificarProduto(ProdutosAlta, nome, preco);
    verificarProduto(Produtos, nome, preco);
  });
});
//produtos fim

const scrollButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollButton.classList.add('show');
  } else {
    scrollButton.classList.remove('show');
  }
});
