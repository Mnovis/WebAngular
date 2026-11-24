import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  imports: [
    CommonModule
  ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {

  // Variável para exibir os dados do usuário
  nomeUsuario = signal(''); // Inicializa com uma string vazia
  perfilUsuario = signal(''); // Inicializa com uma string vazia

  // Função executada ao abrir a página
  ngOnInit() {
    // Recuperar os dados do usuário do sessionStorage
    const usuario = sessionStorage.getItem('usuario') as string;

    // Capturar o nome e perfil do usuário
    const nome = JSON.parse(usuario).nome;
    const perfil = JSON.parse(usuario).perfil;

    // Armazenar nos sinais para exibir na tela
    this.nomeUsuario.set(nome);
    this.perfilUsuario.set(perfil);
  }
    logout() {
      // Função para fazer o logout do usuário
    if(confirm('Deseja realmente sair do sistema?')) {
      // Limpar os dados do usuário do sessionStorage
      sessionStorage.removeItem('usuario');
      sessionStorage.clear();

      // Redirecionar para a página de autenticação
      location.href = '/';
    }
  }
}
