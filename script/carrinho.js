<<<<<<< Updated upstream
function adicionarItem(nome,preco,imagem){
=======
function adicionarItem(nome, preco, quantidade = 1) { 
>>>>>>> Stashed changes
    const itemCarrinho = document.createElement('div');
    itemCarrinho.classList.add('item-row');

    itemCarrinho.innerHTML = `
    
    <div class="produto">
        <img src="${imagem}" alt="${nome}" class="imagem-produto" />
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

    document.getElementById('item-carrinho').appendChild(itemCarrinho);

    atualizarTotal();
}


                                                /* Validar FRETE */


function consultarFrete() {
    const cepInput = document.getElementById('cep-consulta').value;
    const mensagemFrete = document.getElementById('mensagem-frete');

    // Expressão regular para verificar se o CEP é numérico e tem 8 dígitos
    const cepValido = /^[0-9]{5}-?[0-9]{3}$/;

    // Listar CEPs inválidos
    const cepsInvalidos = [
        '00000-000', '11111-111', '22222-222', '33333-333', '44444-444'
    ];

    // Verificar se o CEP inserido é inválido
    if (cepsInvalidos.includes(cepInput)) {
        mensagemFrete.innerText = "Erro: Informe um CEP válido!";
        mensagemFrete.style.color = "red";
        return false
    } else if (cepValido.test(cepInput)) {
        mensagemFrete.innerText = "Seu CEP foi validado com sucesso! Frete grátis aplicado!";
        mensagemFrete.style.color = "green";
        return true
    } else {
        mensagemFrete.innerText = "Erro: Informe um CEP válido!";
        mensagemFrete.style.color = "red";
        return false
        
    }
}

                                                            /* CUPOM DESCONTO */

let cupomValido = 'DESCONTO10';
let desconto = 0;
let totalCarrinho = 0;
                                                            /* SALVAR CARRINHO */
function salvarCarrinho() {
    const carrinho = []
    const items = document.querySelectorAll('.item-row');

    items.forEach(item => {
        const nome = item.querySelector('.nome-produto').innerText;
        const preco = parseFloat(item.querySelector('.valor-preco').innerText.replace('R$', '').trim());
        const quantidade = parseInt(item.querySelector('.quantidade-input').value);

        carrinho.push({ nome, preco, quantidade });
    });

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

                                                        /* CARREGAR CARRINHO */
function carregarCarrinho(){
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.forEach(produto => {
        adicionarItem(produto.nome, produto.preco, produto.quantidade);
    })

}

                                                /* APLICAR CUPOM */
function aplicarCupom() {
    const cupomInserido = document.querySelector('.input-cupom').value.trim().toUpperCase();
    const avisoCupom = document.getElementById('aviso-cupom');
    
    const cuponsValidos = ['DESCONTO10', 'PRIMEIRACOMPRA20'];
        
    if (cuponsValidos.includes(cupomInserido)) {
        desconto = 0.10;
        avisoCupom.style.display = 'none'
    } else {
        desconto = 0
        avisoCupom.style.display = 'inline'
    }

    atualizarTotal();
}
                                                    /* ATUALIZAR CARRINHO  */
function atualizarTotal() {
    let subtotal = 0;
    const itens = document.querySelectorAll('.item-row');

    itens.forEach(item => {
        const preco = parseFloat(item.querySelector('.valor-preco').innerText.replace('R$', '').trim());
        const quantidade = parseInt(item.querySelector('.quantidade-input').value);

        if (!isNaN(preco) && !isNaN(quantidade)) {
            subtotal += preco * quantidade;
        }
    });

    
    let valorDesconto = subtotal * desconto;
    totalCarrinho = subtotal - valorDesconto;

    itens.forEach(item => {
        const preco = parseFloat(item.querySelector('.valor-preco').innerText.replace('R$', '').trim());
        const quantidade = parseInt(item.querySelector('.quantidade-input').value);
        const descontoItem = preco * quantidade * desconto;
        
        item.querySelector('.valor-desconto').innerText = `R$ ${descontoItem.toFixed(2)}`;
    });

                            /* ATUALIZAR EM DIV */
    const totalCompra = document.getElementById('total-compra');
    if (totalCompra) {
        totalCompra.innerHTML = subtotal > 0 ? `
            <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
            <p>Desconto: R$ ${valorDesconto.toFixed(2)}</p>
            <p><strong>Total: R$ ${totalCarrinho.toFixed(2)}</strong></p>
            
        ` : `<p><strong> Carrinho Vazio</strong></p>`;

                        /* atualizar em localStorage o carrinho */
        localStorage.setItem('totalCarrinho', totalCarrinho.toFixed(2));
    }

    salvarCarrinho();
    
}

                                                /* DELETAR ITEMS */
function deletarItem(button) {
<<<<<<< Updated upstream
    button.closest('.item-row').remove();
    atualizarTotal();
}
=======
    
    let itemRow = button.closest('.item-row');           
    let nomeProduto = itemRow?.querySelector('.nome-produto')?.textContent?.trim();
    if (!nomeProduto) return;
                                                    
    let itensSalvos = JSON.parse(localStorage.getItem('carrinho')) || [];
    let novosItens = itensSalvos.filter(item => item.nome !== nomeProduto);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
    
    itemRow.remove();
    atualizarTotal();

}

                                                        /* FINALIZAR COMPRA */
function finalizarCompra() {
    const mensagemFrete = document.getElementById('mensagem-frete');
    const avisoCompraFinalizada = document.getElementById('aviso-compra-finalizada');
    const totalCompra = document.getElementById('total-compra');

    // Verificar se o carrinho está vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        avisoCompraFinalizada.innerText = "Erro: o carrinho está vazio!";
        avisoCompraFinalizada.style.color = "red";
        return;
    }

    const cepValido = consultarFrete();
    if (!cepValido) {
        avisoCompraFinalizada.innerHTML = "Erro: informe um cep válido!";
        avisoCompraFinalizada.style.color = "red";
        return;
    }

    avisoCompraFinalizada.innerHTML = "Compra Finalizada";
    avisoCompraFinalizada.style.color = "green";
}



document.querySelector('.btn-finalizar').addEventListener('click', finalizarCompra);
>>>>>>> Stashed changes


                                        /* LOAD ITEMS */

<<<<<<< Updated upstream
window.onload = function() {
adicionarItem('Produto 1', 49.90, '/assets/fotos-carrinho/racao_pet.png');
adicionarItem('Produto 2', 49.90, '/assets/fotos-carrinho/racao_pet.png');
};
=======
window.addEventListener("load", () => {
    carregarCarrinho();

    atualizarTotal();
});
>>>>>>> Stashed changes
