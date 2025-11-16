// ========================================
// HELLO KITTY STORE - JAVASCRIPT
// 6 Scripts: 3 Funções + 3 Efeitos Visuais
// ========================================

// ========================================
// SCRIPT 1: CURSOR CUSTOMIZADO (EFEITO VISUAL)
// ========================================
const customCursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
});

// Efeito de hover nos links e botões
document.querySelectorAll('a, button, .produto-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        customCursor.style.background = 'radial-gradient(circle, rgba(255, 105, 180, 0.5) 0%, transparent 70%)';
    });
    
    element.addEventListener('mouseleave', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
        customCursor.style.background = 'radial-gradient(circle, rgba(255, 179, 222, 0.3) 0%, transparent 70%)';
    });
});

// ========================================
// SCRIPT 2: MENU RESPONSIVO (CONTROLE DE EVENTOS)
// ========================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// SCRIPT 3: AUTENTICAÇÃO DE USUÁRIO (FUNÇÃO + PROMPT)
// ========================================
function autenticarUsuario() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    
    if (!nomeUsuario) {
        const nome = prompt('Olá! 🎀 Qual é o seu nome?');
        
        if (nome && nome.trim() !== '') {
            localStorage.setItem('nomeUsuario', nome.trim());
            alert(`Bem-vinda, ${nome}! 💖 Aproveite suas compras na Hello Kitty Store!`);
        }
    }
}

// Executar autenticação na página inicial
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    window.addEventListener('load', autenticarUsuario);
}

// ========================================
// SCRIPT 4: GERENCIAMENTO DE PRODUTOS (FUNÇÃO)
// ========================================
const produtos = [
    {
        id: 1,
        nome: 'Pelúcia Hello Kitty Clássica',
        categoria: 'pelúcias',
        preco: 89.90,
        imagem: 'imagens/pelúcia.jpg'
    },
    {
        id: 2,
        nome: 'Mochila Hello Kitty Rosa',
        categoria: 'acessorios',
        preco: 129.90,
        imagem: 'imagens/mochila.jpg'
    },
    {
        id: 3,
        nome: 'Caderno Hello Kitty',
        categoria: 'papelaria',
        preco: 35.90,
        imagem: 'imagens/caderno.jpg'
    },
    {
        id: 4,
        nome: 'Caneca Hello Kitty',
        categoria: 'decoracao',
        preco: 45.90,
        imagem: 'imagens/caneca.jpg'
    },
    {
        id: 5,
        nome: 'Estojo Escolar Hello Kitty',
        categoria: 'papelaria',
        preco: 42.90,
        imagem: 'imagens/estojo.jpg'
    },
    {
        id: 6,
        nome: 'Laço Hello Kitty',
        categoria: 'acessorios',
        preco: 25.90,
        imagem: 'imagens/laço.jpg'
    },
    {
        id: 7,
        nome: 'Almofada Hello Kitty',
        categoria: 'decoracao',
        preco: 68.90,
        imagem: 'imagens/almofada.jpg'
    },
    {
        id: 8,
        nome: 'Chaveiro Hello Kitty',
        categoria: 'acessorios',
        preco: 19.90,
        imagem: 'imagens/chaveiro.jpg'
    }
];

// ========================================
// SCRIPT 5: RENDERIZAR PRODUTOS (FUNÇÃO)
// ========================================
function renderizarProdutos(produtosParaExibir, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    container.innerHTML = '';
    
    produtosParaExibir.forEach(produto => {
        const produtoCard = document.createElement('div');
        produtoCard.className = 'produto-card';
        produtoCard.setAttribute('data-categoria', produto.categoria);
        
        const isFavorito = verificarFavorito(produto.id);
        
        produtoCard.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria.toUpperCase()}</span>
                <h3>${produto.nome}</h3>
                <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
                <div class="produto-acoes">
                    <button class="btn-favoritar ${isFavorito ? 'favorited' : ''}" onclick="toggleFavorito(${produto.id})">
                        ${isFavorito ? '❤️' : '🤍'}
                    </button>
                    <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
                        🛒 Adicionar
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(produtoCard);
    });
}

// Carregar produtos na página inicial
if (document.getElementById('produtosGrid')) {
    renderizarProdutos(produtos.slice(0, 6), 'produtosGrid');
}

// Carregar todos produtos na página de produtos
if (document.getElementById('produtosGridFull')) {
    renderizarProdutos(produtos, 'produtosGridFull');
}

// ========================================
// SCRIPT 6: FILTRO DE PRODUTOS (CONTROLE DE EVENTOS)
// ========================================
const filtrosBtns = document.querySelectorAll('.filtro-btn');

filtrosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover active de todos
        filtrosBtns.forEach(b => b.classList.remove('active'));
        // Adicionar active no clicado
        btn.classList.add('active');
        
        const categoria = btn.getAttribute('data-categoria');
        
        if (categoria === 'todos') {
            renderizarProdutos(produtos, 'produtosGridFull');
        } else {
            const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
            renderizarProdutos(produtosFiltrados, 'produtosGridFull');
        }
    });
});

// ========================================
// FUNÇÕES DE FAVORITOS (FUNÇÃO)
// ========================================
function obterFavoritos() {
    const favoritos = localStorage.getItem('favoritos');
    return favoritos ? JSON.parse(favoritos) : [];
}

function salvarFavoritos(favoritos) {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function verificarFavorito(produtoId) {
    const favoritos = obterFavoritos();
    return favoritos.includes(produtoId);
}

function toggleFavorito(produtoId) {
    let favoritos = obterFavoritos();
    
    if (favoritos.includes(produtoId)) {
        favoritos = favoritos.filter(id => id !== produtoId);
        alert('💔 Produto removido dos favoritos!');
    } else {
        favoritos.push(produtoId);
        alert('❤️ Produto adicionado aos favoritos!');
    }
    
    salvarFavoritos(favoritos);
    
    // Atualizar visualização
    if (document.getElementById('produtosGrid')) {
        renderizarProdutos(produtos.slice(0, 6), 'produtosGrid');
    }
    if (document.getElementById('produtosGridFull')) {
        const categoria = document.querySelector('.filtro-btn.active')?.getAttribute('data-categoria');
        if (categoria === 'todos' || !categoria) {
            renderizarProdutos(produtos, 'produtosGridFull');
        } else {
            const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
            renderizarProdutos(produtosFiltrados, 'produtosGridFull');
        }
    }
    if (document.getElementById('favoritosGrid')) {
        carregarFavoritos();
    }
}

// Carregar página de favoritos
function carregarFavoritos() {
    const favoritos = obterFavoritos();
    const container = document.getElementById('favoritosGrid');
    const emptyState = document.getElementById('emptyFavoritos');
    
    if (!container) return;
    
    if (favoritos.length === 0) {
        emptyState.style.display = 'block';
        container.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        container.style.display = 'grid';
        
        const produtosFavoritos = produtos.filter(p => favoritos.includes(p.id));
        renderizarProdutos(produtosFavoritos, 'favoritosGrid');
    }
}

if (window.location.pathname.includes('favoritos.html')) {
    carregarFavoritos();
}

// ========================================
// FUNÇÕES DE CARRINHO (FUNÇÃO)
// ========================================
function obterCarrinho() {
    const carrinho = localStorage.getItem('carrinho');
    return carrinho ? JSON.parse(carrinho) : [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produtoId) {
    let carrinho = obterCarrinho();
    
    const itemExistente = carrinho.find(item => item.id === produtoId);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ id: produtoId, quantidade: 1 });
    }
    
    salvarCarrinho(carrinho);
    alert('🛒 Produto adicionado ao carrinho!');
}

function removerDoCarrinho(produtoId) {
    let carrinho = obterCarrinho();
    carrinho = carrinho.filter(item => item.id !== produtoId);
    salvarCarrinho(carrinho);
    carregarCarrinho();
}

function atualizarQuantidade(produtoId, novaQuantidade) {
    let carrinho = obterCarrinho();
    const item = carrinho.find(item => item.id === produtoId);
    
    if (item) {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(produtoId);
        } else {
            item.quantidade = novaQuantidade;
            salvarCarrinho(carrinho);
            carregarCarrinho();
        }
    }
}

function carregarCarrinho() {
    const carrinho = obterCarrinho();
    const container = document.getElementById('carrinhoItens');
    const emptyState = document.getElementById('emptyCarrinho');
    const resumo = document.getElementById('carrinhoResumo');
    
    if (!container) return;
    
    if (carrinho.length === 0) {
        emptyState.style.display = 'block';
        resumo.style.display = 'none';
        container.innerHTML = '';
    } else {
        emptyState.style.display = 'none';
        resumo.style.display = 'block';
        
        container.innerHTML = '';
        let subtotal = 0;
        
        carrinho.forEach(item => {
            const produto = produtos.find(p => p.id === item.id);
            if (produto) {
                const totalItem = produto.preco * item.quantidade;
                subtotal += totalItem;
                
                const carrinhoItem = document.createElement('div');
                carrinhoItem.className = 'carrinho-item';
                carrinhoItem.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}" class="carrinho-item-imagem">
                    <div class="carrinho-item-info">
                        <h4>${produto.nome}</h4>
                        <p class="carrinho-item-preco">R$ ${produto.preco.toFixed(2)}</p>
                        <div class="quantidade-controls">
                            <button class="btn-quantidade" onclick="atualizarQuantidade(${produto.id}, ${item.quantidade - 1})">-</button>
                            <span>${item.quantidade}</span>
                            <button class="btn-quantidade" onclick="atualizarQuantidade(${produto.id}, ${item.quantidade + 1})">+</button>
                        </div>
                    </div>
                    <button class="btn-remover" onclick="removerDoCarrinho(${produto.id})">Remover</button>
                `;
                
                container.appendChild(carrinhoItem);
            }
        });
        
        // Atualizar resumo
        const frete = subtotal > 200 ? 0 : 15.00;
        const total = subtotal + frete;
        
        document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
        document.getElementById('frete').textContent = frete === 0 ? 'GRÁTIS' : `R$ ${frete.toFixed(2)}`;
        document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
    }
}

if (window.location.pathname.includes('carrinho.html')) {
    carregarCarrinho();
    
    const btnFinalizar = document.getElementById('btnFinalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            const carrinho = obterCarrinho();
            if (carrinho.length === 0) {
                alert('❌ Seu carrinho está vazio!');
                return;
            }
            
            alert('🎉 Pedido finalizado com sucesso! Obrigada por comprar na Hello Kitty Store! 💖');
            localStorage.removeItem('carrinho');
            carregarCarrinho();
        });
    }
}

// ========================================
// FORMULÁRIOS (CONTROLE DE EVENTOS)
// ========================================

// Newsletter
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`✅ Obrigada por se inscrever, ${email}! Você receberá nossas novidades em breve! 💖`);
        e.target.reset();
    });
}

// Formulário de Contato
const contatoForm = document.getElementById('contatoForm');
if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        alert(`✅ Mensagem enviada com sucesso, ${nome}! Entraremos em contato em breve! 💖`);
        e.target.reset();
    });
}

// ========================================
// ANIMAÇÃO DE SCROLL (EFEITO VISUAL)
// ========================================
window.addEventListener('scroll', () => {
    const elementos = document.querySelectorAll('.produto-card, .section-title');
    
    elementos.forEach(elemento => {
        const posicao = elemento.getBoundingClientRect().top;
        const altura = window.innerHeight;
        
        if (posicao < altura - 100) {
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar opacidade dos elementos
document.querySelectorAll('.produto-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
});

console.log('🎀 Hello Kitty Store - Site carregado com sucesso! 💖');
