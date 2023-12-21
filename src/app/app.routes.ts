import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './components/pages/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './components/pages/consulta-clientes/consulta-clientes.component';

export const routes: Routes = [
    {
        path: 'app/cadastro-clientes',
        component: CadastroClientesComponent
    },
    {
        path: 'app/consulta-clientes',
        component: ConsultaClientesComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app/consulta-clientes'
    }
];