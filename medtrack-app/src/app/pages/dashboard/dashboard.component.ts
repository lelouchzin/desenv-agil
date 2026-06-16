import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RemedioService } from '../../services/remedio.service';
import { Remedio, NotificacaoHoje } from '../../models/remedio.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  remedios: Remedio[] = [];
  notificacoes: NotificacaoHoje[] = [];
  hoje = new Date();

  get totalAtivos() { return this.remedios.filter(r => r.ativo).length; }
  get tomadosHoje() { return this.notificacoes.filter(n => n.status === 'tomado').length; }
  get pendentesHoje() { return this.notificacoes.filter(n => n.status === 'pendente').length; }
  get atrasados() { return this.notificacoes.filter(n => n.status === 'pendente' && n.atrasado).length; }

  get proximoRemedio(): NotificacaoHoje | null {
    return this.notificacoes.find(n => n.status === 'pendente') ?? null;
  }

  get progressoHoje(): number {
    const total = this.notificacoes.length;
    if (!total) return 0;
    return Math.round((this.tomadosHoje / total) * 100);
  }

  get notificacoesRecentes() { return this.notificacoes.slice(0, 4); }

  constructor(private svc: RemedioService) {}

  ngOnInit() {
    this.svc.getRemedios().subscribe(r => this.remedios = r);
    this.svc.getNotificacoesHoje().subscribe(n => this.notificacoes = n);
  }

  statusLabel(n: NotificacaoHoje): string {
    if (n.status === 'tomado') return 'Tomado';
    if (n.atrasado) return 'Atrasado';
    return 'Pendente';
  }

  statusClass(n: NotificacaoHoje): string {
    if (n.status === 'tomado') return 'ok';
    if (n.atrasado) return 'late';
    return 'pending';
  }
}
