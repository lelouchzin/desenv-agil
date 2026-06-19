import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemedioService } from '../../services/remedio.service';
import { DoseHistorico } from '../../models/remedio.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  historico$!: Observable<DoseHistorico[]>;

  constructor(private remedioService: RemedioService) {}

  ngOnInit(): void {
    this.historico$ = this.remedioService.getHistorico();
  }

  formatarData(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  formatarHora(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  statusLabel(status: string): string {
    if (status === 'tomado') return 'Tomado';
    if (status === 'pulado') return 'Pulado';
    return 'Pendente';
  }
}