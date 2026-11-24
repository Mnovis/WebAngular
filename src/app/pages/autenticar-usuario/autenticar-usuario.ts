import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-autenticar-usuario',
  styleUrl: './autenticar-usuario.css',
  templateUrl: './autenticar-usuario.html',
})
export class AutenticarUsuario {

   //Atributos
  private mensagemErro = signal('');

  //injeção de dependência de um objeto de HttpClient
  private http = inject(HttpClient);

  //estrutura do formulário
  formulario = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\p{Lu})(?=.*\p{Ll})(?=.*[0-9])(?=.*[\p{P}\p{S}])\S{8,}$/u)
    ])
  });

  //função executada no SUBMIT do formulário
  autenticar() {
    
    //Fazendo uma requisição para a API de usuários
    this.http.post(`${environment.apiUsuarios}/usuario/autenticar`, this.formulario.value)
      .subscribe({ //aguardando o retorno da API
        next: (data: any) => { //resposta de sucesso
          
          // Salvar os dados do usuário autenticado no sessionStorage
          sessionStorage.setItem('usuario', JSON.stringify(data));

          // Redirecionar para a página de dashboard
          location.href = '/dashboard';

        },
        error: (e) => { //resposta de erro
          this.mensagemErro.set(e.error.message);
        }
      })
  }
}
