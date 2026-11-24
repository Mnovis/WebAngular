import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './pages/criar-usuario/criar-usuario';
import { Dashboard } from './pages/dashboard/dashboard';
import { CadastrarCliente } from './pages/cadastrar-cliente/cadastrar-cliente';
import { ConsultarClientes } from './pages/consultar-clientes/consultar-clientes';
import { EditarCliente } from './pages/editar-cliente/editar-cliente';

export const routes: Routes = [
    {
        path: 'autenticar-usuario', //rota
        component: AutenticarUsuario //componente
    },
    {
        path: 'criar-usuario', //rota
        component: CriarUsuario //componente
    },
    {
        path: 'dashboard', //rota
        component: Dashboard //componente
    },
    {
        path: 'cadastrar-cliente', //rota
        component: CadastrarCliente //componente
    },
    {
        path: 'consultar-clientes', //rota
        component: ConsultarClientes //componente
    },
    {
        path: 'editar-cliente', //rota
        component: EditarCliente //componente
    },
    {
        path: '', pathMatch: 'full', //rota default do projeto
        redirectTo: '/autenticar-usuario' //redirecionamento
    }
];
