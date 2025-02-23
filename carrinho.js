function adicionarItem(nome,preco,imagem){
    const itemCarrinho = document.createElement('div');
    itemCarrinho.classList.add('item-row');

    itemCarrinho.innerHTML = `
    
    <div class="produto">
        <img src="${imagem}" alt="${nome}" class="imagem-produto />
        <span class="nome-produto">${nome} </span>
    </div>

    <div class="desconto">
        <span class="valor-desconto">R$ 0,00</span>
    </div>
    
    <div class="preco">
        <span class="valor-preco">R$ ${preco.toFixed(2)}</span>
    </div>

    <div class="quantidade">
           <input type="number" value="1" min="1" class="quantidade-input" onchange="atualizarTotal()">
        </div>

        <div class="total">
            <span class="valor-total">R$ ${preco}</span>
        </div>

        <div class="delete">
            <button onclick="deletarItem(this)">Excluir</button>
        </div>

    
    `;


        /* adicionar item-carrinho */

    document.getElementById('item-carrinho').appendChild(itemCarrinho);
    atualizarTotal();
}

function atualizarTotal() {
    const itens = document.querySelectorAll('.item-row');
    let totalCarrinho = 0;


    itens.forEach(item => {
        const preco = parseFloat(item.querySelector('.valor-preco').innerText.replace('R$', '').trim());
        const quantidade = parseInt(item.querySelector('.quantidade-input').value);
        const total = preco * quantidade;

        item.querySelector('.valor-total').innerText = `R$ ${total.toFixed(2)}`;
        totalCarrinho += total;
    });

     document.getElementById('total-carrinho').innerText = `Total: R$ ${totalCarrinho.toFixed(2)}`;

}
function deletarItem(button) {
    button.closest('.item-row').remove();
    atualizarTotal();
}

adicionarItem('Cachorro filhote macho', 30.00, 'assets/filhote-imagem.jpg');
adicionarItem('Outro Produto', 49.90);
adicionarItem('Inro Produto', 49.95);