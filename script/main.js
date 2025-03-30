const cartIcon = document.getElementById("cart-icon");

    cartIcon.addEventListener("mouseenter", () => {
    cartIcon.src = "./assets/cart_hover.svg";
    });

    cartIcon.addEventListener("mouseleave", () => {
    cartIcon.src = "./assets/cart.svg";
    });

//produtos inicio
let produtosEmAlta = document.querySelector("#produtosEmAlta");
let produtosNormal = document.querySelector("#produtosNormais");

let ProdutosAlta = [
    { nome: "Desinfetante e bactericida", descricao: "lorem ipsum", preco: 70 },
    { nome: "Alimento natural para coelho", descricao: "lorem ipsum", preco: 36 },
    { nome: "Cama preta Zee", descricao: "lorem ipsum", preco: 540 },
    { nome: "Bebedouro", descricao: "lorem ipsum", preco: 75.2 },
    { nome: "Mordedor galinha para cachorro", descricao: "lorem ipsum", preco: 8.7 },
    { nome: "Mordedor bolinha", descricao: "lorem ipsum", preco: 7.6 }
];

let Produtos = [
    { nome: "Cortador de unhas", descricao: "lorem ipsum", preco: 25.2 },
    { nome: "Mini bifinho para cachorro", descricao: "lorem ipsum", preco: 25.5 },
    { nome: "Tapete limpa patas", descricao: "lorem ipsum", preco: 56 },
    { nome: "Coleira antipulgas", descricao: "lorem ipsum", preco: 200 },
    { nome: "Bandeja preta para gatos", descricao: "lorem ipsum", preco: 20 },
    { nome: "Fonte aqua mini", descricao: "lorem ipsum", preco: 96 }
];
        
function RenderizarProdutos(lista, tipoLista){
                
    for(let produto of lista){
        let cardProduto = document.createElement("div");
        cardProduto.classList.add("card");
        if(document.title == "Borcelle Pet-Shop"){
        cardProduto.innerHTML =`
           <img src="./assets/produtos/${produto.nome}.jpg" class="img-carrinho">
            <p class="nome-carrinho" style="vertica">${produto.nome}</p>
            <p class="preco-carrinho">Preço: R$ ${produto.preco.toFixed(2)}</p>
            <button class="btn-add-carrinho" type="submit">Adicionar ao carrinho</button>
        `;
        tipoLista.appendChild(cardProduto);
        
        }else if(document.title == "Produtos"){
            cardProduto.innerHTML +=`
           <img src="./assets/produtos/${produto.nome}.jpg" class="img-carrinho">
            <p class="nome-carrinho" style="vertica">${produto.nome}</p>
            <p class="preco-carrinho">Preço: R$ ${produto.preco.toFixed(2)}</p>
            <button class="btn-add-carrinho" type="submit">Adicionar ao carrinho</button>
        `;
        produtosTodos.appendChild(cardProduto);
        }
        
        }
};
RenderizarProdutos(ProdutosAlta, produtosEmAlta);
RenderizarProdutos(Produtos, produtosNormal);

let produtosbtn = document.querySelectorAll(".btn-add-carrinho");
produtosbtn.forEach(produto => {
    produto.addEventListener('click', function(event) {
        event.preventDefault();
    
    //pegando os dados dentro da div
    let div = this.closest('div');
    let paragraphs = div.querySelectorAll('p');
    let nome = paragraphs[0].textContent.trim(); 
    let preco = paragraphs[1].textContent.trim();
    preco = Number(preco.slice(preco.indexOf("$")+1, preco.length));
    preco = Number(preco.toFixed(2));

    //jogando no localStorage
    let produtoSelecionado = {nome, preco};
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(produtoSelecionado);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert("Produto adicionado ao carrinho!");
    });
});
//produtos fim