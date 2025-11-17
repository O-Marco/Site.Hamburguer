
        // ... Código anterior de controle de abas e menu hambúrguer ...

        document.addEventListener('DOMContentLoaded', () => {
            // ... (Seu código de abas) ...

            // CÓDIGO PARA O MODAL DE PRODUTO
            const modal = document.getElementById('product-modal');
            const closeModal = document.querySelector('.close-button');
            const btnAddProduct = document.querySelector('.btn-adicionar');
            const modalTitle = document.getElementById('modal-title');
            const productForm = document.getElementById('product-form');

            // Simulação de lista de produtos para demonstração
            let productsData = [
                { id: 1, name: "Smash Bacon", category: "Burgers", price: "25.00", image_url: "img/smash.jpg" },
                { id: 2, name: "Coca-Cola Lata", category: "Bebidas", price: "7.00", image_url: "img/coca.jpg" }
            ];

            // 1. ABRIR MODAL (ADICIONAR)
            btnAddProduct.addEventListener('click', () => {
                modalTitle.textContent = "Adicionar Novo Produto";
                productForm.reset(); // Limpa o formulário para novo produto
                document.getElementById('product-id').value = ''; // Garante que o ID esteja vazio
                modal.style.display = 'block';
            });

            // 2. ABRIR MODAL (EDITAR) - Delegate o evento para os botões de editar
            document.getElementById('tabela-produtos').addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-editar')) {
                    const row = e.target.closest('tr');
                    const productId = parseInt(row.getAttribute('data-id'));
                    const product = productsData.find(p => p.id === productId);

                    if (product) {
                        modalTitle.textContent = `Editar Produto: ${product.name}`;

                        // Preenche o formulário com os dados do produto
                        document.getElementById('product-id').value = product.id;
                        document.getElementById('product-name').value = product.name;
                        document.getElementById('product-category').value = product.category;
                        document.getElementById('product-price').value = product.price;
                        document.getElementById('product-image').value = product.image_url || '';

                        modal.style.display = 'block';
                    }
                }
            });

            // 3. FECHAR MODAL (Botão X)
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // 4. FECHAR MODAL (Clicar fora)
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });

            // 5. SIMULAR SALVAR PRODUTO (Front-end apenas)
            productForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const id = document.getElementById('product-id').value;
                const name = document.getElementById('product-name').value;
                // ... (coleta dos outros campos) ...

                if (id) {
                    alert(`Produto ID ${id} ( ${name} ) EDITADO com sucesso! (Ação simulada)`);
                } else {
                    alert(`Novo produto ( ${name} ) ADICIONADO com sucesso! (Ação simulada)`);
                }

                modal.style.display = 'none';
                // Aqui, em um projeto real, você enviaria os dados para o Back-end
            });

        });

        document.addEventListener('DOMContentLoaded', () => {
            const menuItems = document.querySelectorAll('.menu-item');
            const tabContents = document.querySelectorAll('.tab-content');

            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();

                    const targetContentSelector = item.getAttribute('data-content');

                    // 1. Remove 'active' de todos os itens do menu
                    menuItems.forEach(i => i.classList.remove('active'));
                    // 2. Adiciona 'active' ao item clicado
                    item.classList.add('active');

                    // 3. Oculta todos os conteúdos
                    tabContents.forEach(content => content.classList.remove('active'));

                    // 4. Mostra o conteúdo alvo
                    const targetContent = document.getElementById(targetContentSelector);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });

            // Certifique-se de que o conteúdo inicial (Visão Geral) está visível
            // Isso já está sendo feito com a classe 'active' no HTML, mas é um bom backup:
            // document.getElementById('visao-geral').classList.add('active');
        });
