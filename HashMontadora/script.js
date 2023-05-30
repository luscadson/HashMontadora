const montadora = {
  deposito: {},

  adicionarPeca: function(numeroIdentificacao, localizacao) {
    this.deposito[numeroIdentificacao] = localizacao;
    this.salvarDeposito();
  },

  encontrarPeca: function(numeroIdentificacao) {
    if (numeroIdentificacao in this.deposito) {
      return this.deposito[numeroIdentificacao];
    } else {
      return null;
    }
  },

  removerPeca: function(numeroIdentificacao) {
    if (numeroIdentificacao in this.deposito) {
      delete this.deposito[numeroIdentificacao];
      this.salvarDeposito();
      return true;
    } else {
      return false;
    }
  },

  salvarDeposito: function() {
    localStorage.setItem('deposito', JSON.stringify(this.deposito));
  },

  carregarDeposito: function() {
    const depositoJSON = localStorage.getItem('deposito');
    if (depositoJSON) {
      this.deposito = JSON.parse(depositoJSON);
    }
  }
};

function mostrarAdicionar() {
  ocultarTodasAsTelas();
  document.getElementById("adicionar").style.display = "flex";
}

function mostrarEncontrar() {
  ocultarTodasAsTelas();
  document.getElementById("encontrar").style.display = "flex";
}

function mostrarRemover() {
  ocultarTodasAsTelas();
  document.getElementById("remover").style.display = "flex";
}

function mostrarDeposito() {
  ocultarTodasAsTelas();
  document.getElementById("deposito").style.display = "flex";
  exibirDeposito();
}

function voltarMenu() {
  ocultarTodasAsTelas();
  document.getElementById("menu").style.display = "flex";
  limparMensagem();
}

function ocultarTodasAsTelas() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("adicionar").style.display = "none";
  document.getElementById("encontrar").style.display = "none";
  document.getElementById("remover").style.display = "none";
  document.getElementById("deposito").style.display = "none";
}

function adicionarPeca() {
  const idInput = document.getElementById("idInput");
  const localizacaoInput = document.getElementById("localizacaoInput");

  const id = idInput.value;
  const localizacao = localizacaoInput.value;

  montadora.adicionarPeca(id, localizacao);

  const mensagem = document.getElementById("adicionarMensagem");
  mensagem.innerHTML = "Peça adicionada com sucesso!";

  idInput.value = "";
  localizacaoInput.value = "";
}

function encontrarPeca() {
  const idEncontrarInput = document.getElementById("idEncontrarInput");
  const id = idEncontrarInput.value;
  const localizacao = montadora.encontrarPeca(id);

  if (localizacao) {
    document.getElementById("encontrarMensagem").innerText = "A peça está localizada na prateleira: " + localizacao;
  } else {
    document.getElementById("encontrarMensagem").innerText = "Peça não encontrada no depósito.";
  }

  idEncontrarInput.value = "";
}

function removerPeca() {
  const idRemoverInput = document.getElementById("idRemoverInput");
  const id = idRemoverInput.value;

  const removido = montadora.removerPeca(id);

  if (removido) {
    document.getElementById("removerMensagem").innerText = "Peça removida com sucesso.";
  } else {
    document.getElementById("removerMensagem").innerText = "Peça não encontrada no depósito.";
  }

  idRemoverInput.value = "";
}

function exibirDeposito() {
  const depositoTable = document.getElementById("depositoTable");

  // Limpar tabela
  while (depositoTable.rows.length > 1) {
    depositoTable.deleteRow(1);
  }

  // Preencher tabela com os dados do depósito
  for (const [numeroIdentificacao, localizacao] of Object.entries(montadora.deposito)) {
    const row = depositoTable.insertRow();
    const idCell = row.insertCell();
    const localizacaoCell = row.insertCell();
    idCell.innerText = numeroIdentificacao;
    localizacaoCell.innerText = localizacao;
  }
}

function limparMensagem() {
  document.getElementById("adicionarMensagem").innerText = "";
  document.getElementById("encontrarMensagem").innerText = "";
  document.getElementById("removerMensagem").innerText = "";
}

// Carregar o depósito do localStorage quando a página é carregada
montadora.carregarDeposito();

document.getElementById("adicionarBtn").addEventListener("click", mostrarAdicionar);
document.getElementById("encontrarBtn").addEventListener("click", mostrarEncontrar);
document.getElementById("removerBtn").addEventListener("click", mostrarRemover);
document.getElementById("verDepositoBtn").addEventListener("click", mostrarDeposito);
document.getElementById("adicionarVoltarBtn").addEventListener("click", voltarMenu);
document.getElementById("encontrarVoltarBtn").addEventListener("click", voltarMenu);
document.getElementById("removerVoltarBtn").addEventListener("click", voltarMenu);
document.getElementById("depositoVoltarBtn").addEventListener("click", voltarMenu);
document.getElementById("adicionarPecaBtn").addEventListener("click", adicionarPeca);
document.getElementById("encontrarPecaBtn").addEventListener("click", encontrarPeca);
document.getElementById("removerPecaBtn").addEventListener("click", removerPeca);
