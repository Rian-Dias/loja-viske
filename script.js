// ▼▼▼ COLE O URL DO SEU APLICATIVO DA WEB AQUI ▼▼▼
const API_URL = 'https://script.google.com/macros/s/AKfycbxVG0aUymuFwSog9gvLyEo_08jY15ywzmv-FAebYzdrd3VHCPk-khF4simorIqvi1FJkA/exec'; 
const WHATSAPP_NUMBER = '5511975381274'; // SEU NÚMERO DE WHATSAPP

document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchProducts() {
  const catalog = document.getElementById('product-catalog');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Falha na resposta da rede.');
    const products = await response.json();
    if (products.error) throw new Error(products.error);

    catalog.innerHTML = ''; // Limpa a mensagem "Carregando..."
    const template = document.getElementById('product-card-template');

    products.forEach(product => {
      const card = template.content.cloneNode(true);
      card.querySelector('.product-title').textContent = product.Nome;
      card.querySelector('.product-price').textContent = `R$ ${parseFloat(product.Preco).toFixed(2)}`;
      card.querySelector('img').src = product.Imagem_URL;
      card.querySelector('img').alt = product.Nome;

      const isAvailable = product.Status === 'Disponível' && parseInt(product.Estoque, 10) > 0;

      if (isAvailable) {
        const message = encodeURIComponent(`Olá! Tenho interesse no produto ${product.Nome} (ID: ${product.ID_SKU}).`);
        card.querySelector('.purchase-button').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      } else {
        card.querySelector('.product-card').classList.add('indisponivel');
        card.querySelector('.purchase-button').remove();
      }
      catalog.appendChild(card);
    });
  } catch (error) {
    catalog.innerHTML = `<p style="color: #ff8a80;">Erro ao carregar produtos. Tente novamente mais tarde.</p>`;
    console.error('Erro:', error);
  }
}
