function adicionarItem(nome,preco,imagem){
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
           <input type="number" value="1" min="1" class="quantidade-input" onchange="atualizarTotal()">
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
    } else if (cepValido.test(cepInput)) {
        mensagemFrete.innerText = "Seu CEP foi validado com sucesso!";
        mensagemFrete.style.color = "green";
    } else {
        mensagemFrete.innerText = "Erro: Informe um CEP válido!";
        mensagemFrete.style.color = "red";
    }
}

                                                            /* CUPOM DESCONTO */

let cupomValido = 'DESCONTO10';
let desconto = 0;
let totalCarrinho = 0;

function aplicarCupom() {
    const cupomInserido = document.querySelector('.input-cupom').value.trim().toUpperCase();
    const avisoCupom = document.getElementById('aviso-cupom');
    
    if (cupomInserido === cupomValido) {
        desconto = 0.10;
        avisoCupom.style.display = 'none';
        atualizarTotal();
    } else {
        desconto = 0;
        avisoCupom.style.display = 'inline';
        atualizarTotal();
    }
}
                                                    /* ATUALIZAR CARRINHO  */
function atualizarTotal() {
    let totalCarrinho = 0;
    const itens = document.querySelectorAll('.item-row');

    itens.forEach(item => {
        const preco = parseFloat(item.querySelector('.valor-preco').innerText.replace('R$', '').trim());
        const quantidade = parseInt(item.querySelector('.quantidade-input').value);

        if (!isNaN(preco) && !isNaN(quantidade)) {
            totalCarrinho += preco * quantidade;
        }
    });

    
    let valorDesconto = totalCarrinho * desconto;
    totalCarrinho -= valorDesconto;

                            /* ATUALIZAR EM DIV */
    const totalCompra = document.getElementById('total-compra');
    if (totalCompra) {
        totalCompra.innerText = `Total: R$ ${totalCarrinho.toFixed(2)}`;
    }

}

                                                    /* FINALIZAR COMPRA */
function finalizarCompra() {
    const mensagemFrete = document.getElementById('mensagem-frete');
    const avisoCompraFinalizada = document.getElementById('aviso-compra-finalizada');

    if (mensagemFrete.style.color === 'green') {
        avisoCompraFinalizada.innerText = "Compra Finalizada com Sucesso!";
        avisoCompraFinalizada.style.color = "green";
    } else {
        avisoCompraFinalizada.innerText = "Erro: Informe um CEP válido!";
        avisoCompraFinalizada.style.color = "red";
    }
}

document.querySelector('.btn-finalizar').addEventListener('click', finalizarCompra);

                                                /* DELETAR ITEMS */
function deletarItem(button) {
    button.closest('.item-row').remove();
    atualizarTotal();
}


                                        /* LOAD ITEMS */

window.onload = function() {
adicionarItem('Produto 1', 49.90, 'assets/fotos-carrinho/racao_pet.png');
adicionarItem('Produto 2', 49.90, 'assets/fotos-carrinho/racao_pet.png');
};