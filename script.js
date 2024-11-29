document.addEventListener('DOMContentLoaded', function () {
    const formCadastro = document.getElementById('formCadastro');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const listaRegistros = document.getElementById('listaRegistros');
  
    // Função para carregar registros do LocalStorage
    function carregarRegistros() {
      const registros = JSON.parse(localStorage.getItem('registros')) || [];
      listaRegistros.innerHTML = '';
      registros.forEach((registro, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${registro.nome}</td>
          <td>${registro.email}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="removerRegistro(${index})">Remover</button>
          </td>
        `;
        listaRegistros.appendChild(tr);
      });
    }
  
    // Função para adicionar registro ao LocalStorage
    formCadastro.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const nome = nomeInput.value.trim();
      const email = emailInput.value.trim();
  
      if (nome && email) {
        const novosRegistros = JSON.parse(localStorage.getItem('registros')) || [];
        novosRegistros.push({ nome, email });
        localStorage.setItem('registros', JSON.stringify(novosRegistros));
        nomeInput.value = '';
        emailInput.value = '';
        carregarRegistros();
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  
    // Função para remover registro
    window.removerRegistro = function (index) {
      const registros = JSON.parse(localStorage.getItem('registros')) || [];
      registros.splice(index, 1);
      localStorage.setItem('registros', JSON.stringify(registros));
      carregarRegistros();
    }
  
    // Carregar os registros ao carregar a página
    carregarRegistros();
  });
  