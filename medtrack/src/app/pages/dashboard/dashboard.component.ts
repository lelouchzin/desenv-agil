import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemedioService } from '../../services/remedio.service';
import { NotificacaoHoje, Remedio } from '../../models/remedio.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notificacoes$!: Observable<NotificacaoHoje[]>;
  remedios$!: Observable<Remedio[]>;

  totalHoje = 0;
  tomadosHoje = 0;
  pendentesHoje = 0;
  atrasadosHoje = 0;

  constructor(private remedioService: RemedioService) {}

  ngOnInit(): void {
    this.notificacoes$ = this.remedioService.getNotificacoesHoje();
    this.remedios$ = this.remedioService.getRemedios();

    this.notificacoes$.subscribe(lista => {
      this.totalHoje = lista.length;
      this.tomadosHoje = lista.filter(n => n.status === 'tomado').length;
      this.pendentesHoje = lista.filter(n => n.status === 'pendente').length;
      this.atrasadosHoje = lista.filter(n => n.atrasado && n.status === 'pendente').length;
    });
  }

  get progresso(): number {
    if (this.totalHoje === 0) return 0;
    return Math.round((this.tomadosHoje / this.totalHoje) * 100);
  }

  marcarTomado(id: string): void {
    this.remedioService.marcarDose(id, 'tomado').subscribe();
  }

  marcarPulado(id: string): void {
    this.remedioService.marcarDose(id, 'pulado').subscribe();
  }
}