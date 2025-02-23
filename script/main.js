
//produtos inicio
let produtosEmAlta = document.querySelector("#produtosEmAlta");
let produtosNormal = document.querySelector("#produtosNormais");

let ProdutosAlta = [
    { nome: "desinfetante e bactericida", descricao: "lorem ipsum", preco: 70 },
    { nome: "alimento natural para coelho", descricao: "lorem ipsum", preco: 36 },
    { nome: "cama preta zee", descricao: "lorem ipsum", preco: 540 },
    { nome: "bebedouro", descricao: "lorem ipsum", preco: 75.2 },
    { nome: "mordedor galinha para cachorro", descricao: "lorem ipsum", preco: 8.7 },
    { nome: "mordedor bolinha", descricao: "lorem ipsum", preco: 7.6 }
];

let Produtos = [
    { nome: "cortador de unhas", descricao: "lorem ipsum", preco: 25.2 },
    { nome: "mini bifinho para cachorro", descricao: "lorem ipsum", preco: 25.5 },
    { nome: "tapete limpa patas", descricao: "lorem ipsum", preco: 56 },
    { nome: "coleira antipulgas", descricao: "lorem ipsum", preco: 200 },
    { nome: "bandeja preta para gatos", descricao: "lorem ipsum", preco: 20 },
    { nome: "fonte aqua mini", descricao: "lorem ipsum", preco: 96 }
];
        
        function RenderizarProdutos(lista, tipoLista){

            for(let produto of lista){
            let cardProduto = document.createElement("div");
            cardProduto.classList.add("card");
            cardProduto.innerHTML =`
               <img src="./assets/produtos/${produto.nome}.jpg" class="img-carrinho">
                <p class="nome-carrinho">${produto.nome}</p>
                <p class="preco-carrinho">Preço: R$ ${produto.preco.toFixed(2)}</p>
                <button class="btn-add-carrinho" type="submit">Adicionar ao carrinho</button>
            `;
            tipoLista.appendChild(cardProduto);
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

    //dados do produto que vc clicou
    console.log(nome, preco);
    });
});
//produtos fim
