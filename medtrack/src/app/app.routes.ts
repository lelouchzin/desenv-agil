import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'remedios',
    loadComponent: () => import('./pages/remedios/remedios.component').then(m => m.RemediosComponent)
  },
  {
    path: 'notificacoes',
    loadComponent: () => import('./pages/notificacoes/notificacoes.component').then(m => m.NotificacoesComponent)
  },
  {
    path: 'historico',
    loadComponent: () => import('./pages/historico/historico.component').then(m => m.HistoricoComponent)
  },
];