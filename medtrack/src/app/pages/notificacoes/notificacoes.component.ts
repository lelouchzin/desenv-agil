import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemedioService } from '../../services/remedio.service';
import { NotificacaoHoje } from '../../models/remedio.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notificacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit {
  notificacoes$!: Observable<NotificacaoHoje[]>;

  constructor(private remedioService: RemedioService) {}

  ngOnInit(): void {
    this.notificacoes$ = this.remedioService.getNotificacoesHoje();
  }

  marcarTomado(id: string): void {
    this.remedioService.marcarDose(id, 'tomado').subscribe();
  }

  marcarPulado(id: string): void {
    this.remedioService.marcarDose(id, 'pulado').subscribe();
  }

  statusLabel(status: string): string {
    if (status === 'tomado') return 'Tomado';
    if (status === 'pulado') return 'Pulado';
    return 'Pendente';
  }
}