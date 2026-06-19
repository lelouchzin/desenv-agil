import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemedioService } from '../../services/remedio.service';
import { Remedio } from '../../models/remedio.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remedios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './remedios.component.html',
  styleUrls: ['./remedios.component.scss']
})
export class RemediosComponent implements OnInit {
  remedios$!: Observable<Remedio[]>;

  constructor(private remedioService: RemedioService) {}

  ngOnInit(): void {
    this.remedios$ = this.remedioService.getRemedios();
  }

  excluir(id: string): void {
    this.remedioService.excluirRemedio(id).subscribe();
  }

  toggleAtivo(remedio: Remedio): void {
    this.remedioService.atualizarRemedio(remedio.id, { ativo: !remedio.ativo }).subscribe();
  }

  frequenciaLabel(remedio: Remedio): string {
    if (remedio.frequencia === 'diario') return 'Diário';
    if (remedio.frequencia === 'semanal') return 'Semanal';
    return `A cada ${remedio.intervaloHoras}h`;
  }
}