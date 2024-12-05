let cart = [];

function addToCart(nome, imagem, preco, tamanho) {
    const product = { nome, imagem, preco, tamanho };
    cart.push(product);
    alert(`${nome} (${tamanho}) foi adicionado ao carrinho!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    let totalValue = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h2>${item.nome} (${item.tamanho})</h2>
            <p>Preço: R$ ${item.preco},00</p>
            <button onclick="removeFromCart(${index})">Remover do Carrinho</button>
        `;
        cartContainer.appendChild(cartItem);
        totalValue += item.preco;
    });

    const totalDisplay = document.getElementById('total-value');
    totalDisplay.innerText = `Total: R$ ${totalValue},00`;
}

function openCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'block';
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }
    openCheckoutModal();
}

function finalizeOrder() {
    const buyerName = document.getElementById('buyer-name').value;
    const deliveryOption = document.querySelector('input[name="delivery-option"]:checked').value;
    let address = '';
    if (deliveryOption === 'entrega') {
        address = document.getElementById('address').value;
    }
    const orderSummary = cart.map(item => {
        return `Produto: ${item.nome}, Tamanho: ${item.tamanho}, Preço: R$ ${item.preco}`;
    }).join('\n');
    const totalValue = cart.reduce((total, item) => total + item.preco, 0);
    const orderDetails = `Resumo do Pedido:\n\n${orderSummary}\n\nTotal: R$ ${totalValue},00\n\nNome: ${buyerName}\nEndereço: ${address || 'Retirada'}`;

    // Enviar e-mail
    const emailBody = encodeURIComponent(orderDetails);
    const emailSubject = encodeURIComponent("Resumo do Pedido");
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;

    // Limpar carrinho e fechar modal
    cart = [];
    updateCart();
    closeCheckoutModal();
}

function openModal() {
    updateCart();
    document.getElementById('cart-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

function showProductDetails(nome, imagem, preco) {
    document.getElementById('product-image').src = imagem;
    document.getElementById('product-name').innerText = nome;
    document.getElementById('product-price').innerText = `R$ ${preco},00`;
    
    document.getElementById('add-to-cart-button').onclick = function() {
        addToCart(nome, imagem, preco, document.getElementById('size').value);
    };

    document.getElementById('product-modal').style.display = 'block'; // Abre o modal
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Mostrar ou esconder o campo de endereço baseado na opção de entrega
document.querySelectorAll('input[name="delivery-option"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        const addressField = document.getElementById('address');
        if (event.target.value === 'entrega') {
            addressField.style.display = 'block';
        } else {
            addressField.style.display = 'none';
        }
    });
});
