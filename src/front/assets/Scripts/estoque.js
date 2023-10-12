function verificarTabelaPreenchida() {
    const linhaNome = document.getElementById("nomeProduto").value
    const linhaQuantity = document.getElementById("quantidade").value
    const linhaValoUnitario = document.getElementById("valorUnitario").value
    const linhaValorTotal = document.getElementById("valorTotalProduto").value
    const linhaValorFinal = document.getElementById("valorFinal").value
    if (linhaNome == "" || linhaQuantity == "" || linhaValoUnitario == ""){
        alert("Preenchimento Invalido")
    }
    else{
        alert("Fatura:\nNome do Produto: " + linhaNome + "\nQuantidade do Produto:" + linhaQuantity + "\nValor Total do Produto: " + linhaValorTotal + "\nValor Final do Pedido:" + linhaValorFinal )
    }
    
}
function calcularValorTotalProduto() {
    // Obtém os valores do preço unitário e quantidade
    var valorUnitario = parseFloat(document.getElementById("valorUnitario").value);
    var quantidade = parseInt(document.getElementById("quantidade").value);

    // Verifica se os valores são válidos
    if (!isNaN(valorUnitario) && !isNaN(quantidade)) {
        // Calcula o valor total do produto
        var valorTotalProduto = valorUnitario * quantidade;
        var valorTotalDoPedido = valorUnitario * quantidade * 1.20;
        // Insere o valor calculado no campo "Valor Total do Produto"
        document.getElementById("valorTotalProduto").value = valorTotalProduto.toFixed(2);
        document.getElementById("valorFinal").value = valorTotalDoPedido.toFixed(2);
    } else {
    }
} 
    function desculpaEsfarrapada(){
        alert("Parte será desenvolvida no Processo Busca por Fornecedores")
    }
    function adicionarProdutosATabela() {
        const tabela = document.querySelector(".table tbody");

        // Recupera os produtos do localStorage
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

        // Iterar sobre os produtos e criar linhas na tabela
        produtos.forEach(function (produto) {
            const row = tabela.insertRow();

            const cellID = row.insertCell(0);
            const cellNome = row.insertCell(1);
            const cellFoto = row.insertCell(2);
            const cellCategoria = row.insertCell(3);
            const cellQuantidade = row.insertCell(4);
            const cellValor = row.insertCell(5)
            const cellAcoes = row.insertCell(6); // Nova célula para o botão de edição

            cellID.innerHTML = produto.id;
            cellNome.innerHTML = produto.nome;
            cellFoto.innerHTML = `<img src="${produto.foto}" alt="${produto.nome}">`;
            cellCategoria.innerHTML = produto.categoria;
            cellQuantidade.innerHTML = produto.quantidade;
            cellValor.innerHTML = produto.valor;

            // Adiciona o botão de edição
            const btnEditar = document.createElement("button");
            btnEditar.className = "btn btn-primary btn-sm";
            btnEditar.innerHTML = "Editar";
            btnEditar.onclick = function () {
                // Função a ser chamada ao clicar no botão de edição
                editarProduto(produto.id);
            };

            cellAcoes.appendChild(btnEditar);
        });
    }


        // Função para adicionar produtos
        function adicionarProduto() {
            if (!verificarCamposPreenchidos()) {
                return;
            }
        
            // Coleta os dados do produto
            const fotoProduto = document.getElementById("fotoProduto").value;
            const nomeProduto = document.getElementById("nomeProduto").value;
            const idProduto = document.getElementById("idProduto").value;
            const categoriaProduto = document.getElementById("categoriaProduto").value;
            const quantidadeProduto = document.getElementById("quantidadeProduto").value;
            const valorProduto = document.getElementById("valorProduto").value;
            
            // Cria um objeto com os dados do produto
            const novoProduto = {
                foto: fotoProduto,
                nome: nomeProduto,
                id: idProduto,
                categoria: categoriaProduto,
                quantidade: quantidadeProduto,
                valor: valorProduto
            };

            // Armazena o objeto em um array ou outra estrutura de dados
            // Você pode usar localStorage, um banco de dados, ou um array, dependendo das suas necessidades.
            // Por exemplo, para armazenar em localStorage:
            let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
            produtos.push(novoProduto);
            localStorage.setItem("produtos", JSON.stringify(produtos));

            // Limpa os campos do formulário
            document.getElementById("fotoProduto").value = "";
            document.getElementById("nomeProduto").value = "";
            document.getElementById("categoriaProduto").value = "";
            document.getElementById("quantidadeProduto").value = "";
            document.getElementById("valorProduto").value = "";

            // Opcional: exibe uma mensagem de sucesso para o usuário
            alert("Produto cadastrado com sucesso!");
        }
function enviarDadosParaBackend() {
    const fotoProduto = document.getElementById("fotoProduto").value;
    const nomeProduto = document.getElementById("nomeProduto").value;
    const idProduto = document.getElementById("idProduto").value;
    const categoriaProduto = document.getElementById("categoriaProduto").value;
    const quantidadeProduto = document.getElementById("quantidadeProduto").value;
    const valorProduto = document.getElementById("valorProduto").value;

    const produtoData = {
        foto: fotoProduto,
        nome: nomeProduto,
        id: idProduto,
        categoria: categoriaProduto,
        quantidade: quantidadeProduto,
        valor: valorProduto,
    };

    // Make an HTTP POST request to your Spring Boot backend
    fetch('http://your-api-url.com/endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtoData),
    })
    .then((response) => {
        if (response.ok) {
            // Data sent successfully, you can handle the response here if needed
            alert('Data sent successfully.');
        } else {
            // Handle any errors
            alert('Error sending data to the backend.');
        }
    })
    .catch((error) => {
        // Handle network errors
        alert('Network error: ' + error.message);
    });
}

function enviarOrdemDeCompraParaBackend() {
    const fornecedorSelecionado = document.getElementById("fornecedores").value;
    const nomeProduto = document.getElementById("nomeProduto").value;
    const valorUnitario = parseFloat(document.getElementById("valorUnitario").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const valorTotalProduto = parseFloat(document.getElementById("valorTotalProduto").value);
    const valorFinal = parseFloat(document.getElementById("valorFinal").value);

    // Create an object to hold the order data
    const ordemDeCompra = {
        fornecedor: fornecedorSelecionado,
        produto: nomeProduto,
        valorUnitario: valorUnitario,
        quantidade: quantidade,
        valorTotalProduto: valorTotalProduto,
        valorFinal: valorFinal,
    };

    // Make an HTTP POST request to your Spring Boot backend
    fetch('http://your-api-url.com/endpoint-for-orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordemDeCompra),
    })
    .then((response) => {
        if (response.ok) {
            // Order data sent successfully, you can handle the response here if needed
            alert('Order sent successfully.');
        } else {
            // Handle any errors
            alert('Error sending order data to the backend.');
        }
    })
    .catch((error) => {
        // Handle network errors
        alert('Network error: ' + error.message);
    });
}
// Function to edit a product
function editarProduto(produtoId) {
    // Retrieve products from local storage
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    // Find the product to edit based on the product ID
    const produtoIndex = produtos.findIndex((produto) => produto.id === produtoId);

    // Check if the product was found
    if (produtoIndex !== -1) {
        // Get the product object to edit
        const produtoParaEditar = produtos[produtoIndex];

        // Example: Prompt the user to enter new values for editing
        const novoNome = prompt("Novo nome do produto:", produtoParaEditar.nome);
        const novaCategoria = prompt("Nova Categoria do produto:", produtoParaEditar.categoria);
        const novoPreco = prompt("Novo Preço do produto:", produtoParaEditar.valor);
        const novaQuantidade = prompt("Nova quantidade do produto:", produtoParaEditar.quantidade);

        // Update the product object with the new values
        produtoParaEditar.nome = novoNome || produtoParaEditar.nome;
        produtoParaEditar.quantidade = novaQuantidade || produtoParaEditar.quantidade;
        produtoParaEditar.nome = novaCategoria || produtoParaEditar.categoria;
        produtoParaEditar.novoPreco = novoPreco || produtoParaEditar.valor;

        // Update the product in the array
        produtos[produtoIndex] = produtoParaEditar;

        // Update the product in the table (you may need to clear and recreate the table)
        location.reload();

        // Update the products in local storage
        localStorage.setItem("produtos", JSON.stringify(produtos));

        // Optional: Provide feedback to the user
        alert("Produto editado com sucesso!");
    } else {
        // Product not found
        alert("Produto não encontrado para edição.");
    }
}

function getNextAvailableID() {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    
    // If there are no products, start with ID 1
    if (produtos.length === 0) {
        document.getElementById("idProduto").value = "1";
    }

    else{
    // Get the minimum ID and add 1
    const nextID = Math.max(...produtos.map((produto) => produto.id)) + 1;
    document.getElementById("idProduto").value = nextID;
    }
}
function verificarCamposPreenchidos() {
    const fotoProduto = document.getElementById("fotoProduto").value;
    const nomeProduto = document.getElementById("nomeProduto").value;
    const idProduto = document.getElementById("idProduto").value;
    const categoriaProduto = document.getElementById("categoriaProduto").value;
    const quantidadeProduto = document.getElementById("quantidadeProduto").value;
    const valorProduto = document.getElementById("valorProduto").value;

    // Check if any of the fields are empty
    if (fotoProduto === "" || nomeProduto === "" || idProduto === "" || categoriaProduto === "" || quantidadeProduto === "" || valorProduto === "") {
        alert("Por favor, preencha todos os campos.");
        return false; // Indicates that not all fields are filled
    }

    // All fields are filled
    return true;
}
