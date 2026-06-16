import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RemedioService } from '../../services/remedio.service';
import { FilterAtivosPipe } from '../../services/filter-ativos.pipe';
import { Remedio } from '../../models/remedio.model';

@Component({
  selector: 'app-remedios',
  standalone: true,
  imports: [CommonModule, RouterLink, FilterAtivosPipe],
  templateUrl: './remedios.component.html',
  styleUrls: ['./remedios.component.scss']
})
export class RemediosComponent implements OnInit {
  remedios: Remedio[] = [];
  filtro: 'todos' | 'ativos' | 'inativos' = 'todos';
  confirmandoExcluir: string | null = null;

  get remediosFiltrados(): Remedio[] {
    if (this.filtro === 'ativos') return this.remedios.filter(r => r.ativo);
    if (this.filtro === 'inativos') return this.remedios.filter(r => !r.ativo);
    return this.remedios;
  }

  constructor(private svc: RemedioService) {}

  ngOnInit() {
    this.svc.getRemedios().subscribe(r => this.remedios = r);
  }

  toggleAtivo(r: Remedio) {
    this.svc.atualizarRemedio(r.id, { ativo: !r.ativo }).subscribe();
  }

  excluir(id: string) {
    this.svc.excluirRemedio(id).subscribe();
    this.confirmandoExcluir = null;
  }

  frequenciaLabel(r: Remedio): string {
    if (r.frequencia === 'diario') return 'Diário';
    if (r.frequencia === 'semanal') return 'Semanal';
    if (r.frequencia === 'intervalo') return `A cada ${r.intervaloHoras}h`;
    return '';
  }
}
