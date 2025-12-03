// Dados das administradoras
const administradoras = {
    'admin-premium-lisboa': {
        nome: 'Admin Premium Lisboa',
        localizacao: 'Lisboa',
        preco: '€1200',
        rating: 4.8,
        condominios: 45,
        experiencia: 12,
        telefone: '+351 21 123 4567',
        email: 'contato@adminpremiumlisboa.pt',
        endereco: 'Rua das Flores, 123, Lisboa',
        website: 'www.adminpremiumlisboa.pt',
        sobre: 'A Admin Premium Lisboa é uma empresa especializada na gestão de condomínios em Lisboa e região metropolitana. Com mais de 12 anos de experiência, oferecemos serviços completos de administração predial, sempre com foco na transparência, eficiência e satisfação dos condôminos.',
        servicos: ['Limpeza', 'Manutenção'],
        avaliacoes: [
            {
                nome: 'Maria Silva - Síndica',
                rating: 5,
                comentario: 'Excelente administradora! Transparência total nos gastos e comunicação sempre clara. Recomendo a todos os condomínios.'
            },
            {
                nome: 'João Santos - Condômino',
                rating: 5,
                comentario: 'Desde que contratamos a Admin Premium, nosso condomínio ficou muito mais organizado. O portal online é fantástico!'
            },
            {
                nome: 'Ana Costa - Síndica',
                rating: 4,
                comentario: 'Ótimo atendimento e serviços de qualidade. A única observação é que às vezes demora um pouco para responder e-mails.'
            }
        ]
    },
    'gestao-total': {
        nome: 'Gestão Total',
        localizacao: 'Porto',
        preco: '€980',
        rating: 4.5,
        condominios: 32,
        experiencia: 8,
        telefone: '+351 22 987 6543',
        email: 'contato@gestaototal.pt',
        endereco: 'Avenida da Boavista, 456, Porto',
        website: 'www.gestaototal.pt',
        sobre: 'A Gestão Total é uma administradora focada em soluções tecnológicas para condomínios no Porto. Utilizamos sistemas ERP avançados e oferecemos serviços de contabilidade especializada para garantir a melhor gestão financeira.',
        servicos: ['ERP', 'Contabilidade'],
        avaliacoes: [
            {
                nome: 'Carlos Oliveira - Síndico',
                rating: 5,
                comentario: 'Sistema ERP excelente! Conseguimos acompanhar tudo em tempo real.'
            },
            {
                nome: 'Sofia Pereira - Condômina',
                rating: 4,
                comentario: 'Muito bom o serviço de contabilidade, mas o atendimento poderia ser mais rápido.'
            },
            {
                nome: 'Miguel Santos - Síndico',
                rating: 4,
                comentario: 'Recomendo! Preço justo e serviço de qualidade.'
            }
        ]
    }
};

// Função para salvar dados no localStorage
function salvarDadosAdministradora(adminId) {
    const admin = administradoras[adminId];
    if (admin) {
        localStorage.setItem('administradoraSelecionada', JSON.stringify(admin));
    }
}

// Função para carregar dados do localStorage
function carregarDadosAdministradora() {
    const dadosSalvos = localStorage.getItem('administradoraSelecionada');
    return dadosSalvos ? JSON.parse(dadosSalvos) : null;
}

// Função para gerar estrelas do rating
function gerarEstrelas(rating) {
    const estrelasCompletas = Math.floor(rating);
    const temMeiaEstrela = rating % 1 !== 0;
    let html = '';
    
    for (let i = 0; i < estrelasCompletas; i++) {
        html += '<i class="fa-solid fa-star"></i>';
    }
    
    if (temMeiaEstrela) {
        html += '<i class="fa-solid fa-star-half-alt"></i>';
    }
    
    const estrelasVazias = 5 - Math.ceil(rating);
    for (let i = 0; i < estrelasVazias; i++) {
        html += '<i class="fa-regular fa-star"></i>';
    }
    
    return html;
}

// Função para atualizar a página de perfil
function atualizarPerfil(admin) {
    if (!admin) return;

    // Atualizar título da página
    document.title = `${admin.nome} - Perfil | Bom Prédio`;

    // Atualizar nome da administradora
    const tituloElement = document.querySelector('.profile-title h1');
    if (tituloElement) {
        tituloElement.textContent = admin.nome;
    }

    // Atualizar rating
    const ratingElement = document.querySelector('.rating');
    if (ratingElement) {
        ratingElement.innerHTML = `
            <span>${admin.rating}</span>
            ${gerarEstrelas(admin.rating)}
        `;
    }

    // Atualizar informações principais
    const infoItems = document.querySelectorAll('.info-item');
    if (infoItems.length >= 4) {
        infoItems[0].innerHTML = `
            <i class="fa-solid fa-location-dot"></i>
            <div>
                <strong>Localização:</strong><br>
                ${admin.localizacao}, Portugal
            </div>
        `;
        
        infoItems[1].innerHTML = `
            <i class="fa-solid fa-euro-sign"></i>
            <div>
                <strong>Preço Médio:</strong><br>
                ${admin.preco}/mês
            </div>
        `;
        
        infoItems[2].innerHTML = `
            <i class="fa-solid fa-building"></i>
            <div>
                <strong>Condomínios Geridos:</strong><br>
                ${admin.condominios} propriedades
            </div>
        `;
        
        infoItems[3].innerHTML = `
            <i class="fa-solid fa-clock"></i>
            <div>
                <strong>Anos de Experiência:</strong><br>
                ${admin.experiencia} anos no mercado
            </div>
        `;
    }

    // Atualizar seção "Sobre a Administradora"
    const sobreElement = document.querySelector('.section p');
    if (sobreElement) {
        sobreElement.textContent = admin.sobre;
        // Remover segundo parágrafo se existir
        const segundoP = sobreElement.nextElementSibling;
        if (segundoP && segundoP.tagName === 'P') {
            segundoP.remove();
        }
    }

    // Atualizar avaliações
    const testimonialsContainer = document.querySelector('.testimonials');
    if (testimonialsContainer && admin.avaliacoes) {
        testimonialsContainer.innerHTML = admin.avaliacoes.map(avaliacao => {
            const estrelas = '★'.repeat(avaliacao.rating) + '☆'.repeat(5 - avaliacao.rating);
            return `
                <div class="testimonial">
                    <div class="testimonial-header">
                        <span class="testimonial-author">${avaliacao.nome}</span>
                        <span class="testimonial-rating">${estrelas}</span>
                    </div>
                    <p>"${avaliacao.comentario}"</p>
                </div>
            `;
        }).join('');
    }

    // Atualizar informações de contato
    const contatoItems = document.querySelectorAll('.section:last-of-type .info-item');
    if (contatoItems.length >= 4) {
        contatoItems[0].innerHTML = `
            <i class="fa-solid fa-phone"></i>
            <div>
                <strong>Telefone:</strong><br>
                ${admin.telefone}
            </div>
        `;
        
        contatoItems[1].innerHTML = `
            <i class="fa-solid fa-envelope"></i>
            <div>
                <strong>E-mail:</strong><br>
                ${admin.email}
            </div>
        `;
        
        contatoItems[2].innerHTML = `
            <i class="fa-solid fa-map-marker-alt"></i>
            <div>
                <strong>Endereço:</strong><br>
                ${admin.endereco}
            </div>
        `;
        
        contatoItems[3].innerHTML = `
            <i class="fa-solid fa-globe"></i>
            <div>
                <strong>Website:</strong><br>
                ${admin.website}
            </div>
        `;
    }

    // Atualizar botões de contato
    const contactBtns = document.querySelectorAll('.contact-btn');
    if (contactBtns.length >= 2) {
        contactBtns[0].href = `mailto:${admin.email}`;
        contactBtns[1].href = `tel:${admin.telefone.replace(/\s+/g, '')}`;
    }
}

// Função para configurar event listeners na página index
function configurarEventListenersIndex() {
    const verPerfilBtns = document.querySelectorAll('a[href="/html/perfil.html"]');
    
    verPerfilBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Determinar qual administradora foi clicada baseada no índice
            const adminIds = Object.keys(administradoras);
            const adminId = adminIds[index] || adminIds[0];
            
            // Salvar dados no localStorage
            salvarDadosAdministradora(adminId);
            
            // Navegar para a página de perfil
            window.location.href = '/html/perfil.html';
        });
    });
}

// Função para configurar a página de perfil
function configurarPaginaPerfil() {
    const adminData = carregarDadosAdministradora();
    if (adminData) {
        atualizarPerfil(adminData);
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage === '/') {
        configurarEventListenersIndex();
    } else if (currentPage.includes('perfil.html')) {
        configurarPaginaPerfil();
    }
});

// Exportar funções para uso global se necessário
window.administradorasManager = {
    salvarDadosAdministradora,
    carregarDadosAdministradora,
    atualizarPerfil,
    configurarEventListenersIndex,
    configurarPaginaPerfil
};