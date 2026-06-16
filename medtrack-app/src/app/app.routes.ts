import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RemediosComponent } from './pages/remedios/remedios.component';
import { RemedioFormComponent } from './pages/remedios/remedio-form.component';
import { NotificacoesComponent } from './pages/notificacoes/notificacoes.component';
import { HistoricoComponent } from './pages/historico/historico.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'remedios', component: RemediosComponent },
  { path: 'remedios/novo', component: RemedioFormComponent },
  { path: 'remedios/:id/editar', component: RemedioFormComponent },
  { path: 'notificacoes', component: NotificacoesComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: '**', redirectTo: '/dashboard' }
];
