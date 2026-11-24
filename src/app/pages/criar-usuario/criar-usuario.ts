import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  selector: 'app-criar-usuario',
  styleUrl: './criar-usuario.css',
  templateUrl: './criar-usuario.html',
})
export class CriarUsuario {

  // Mensagens para exibir no formulário
  mensagemSucesso = signal('');
  mensagemErro = signal('');

  // Injeção de dependência do HttpClient
  private http = inject(HttpClient);

  //Criando a estrutura do formulario
  formulario = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\p{Lu})(?=.*\p{Ll})(?=.*[0-9])(?=.*[\p{P}\p{S}])\S{8,}$/u)
    ])
  });

  // Função para criar o usuário
  criarUsuario() {

    // Limpar mensagens de sucesso e erro antes de enviar a requisição
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    this.http.post(`${environment.apiUsuarios}/usuario/criar`, this.formulario.value)
    .subscribe({
      next: (response: any) => {
        this.mensagemSucesso.set(response.message);
        this.formulario.reset();
      },
      error: (e) => {
        this.mensagemErro.set(e.error.message);
      }
    });
  }
}
