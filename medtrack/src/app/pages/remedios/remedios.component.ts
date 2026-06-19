import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RemedioService } from '../../services/remedio.service';
import { Remedio, FrequenciaTipo } from '../../models/remedio.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remedios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './remedios.component.html',
  styleUrls: ['./remedios.component.scss']
})
export class RemediosComponent implements OnInit {
  remedios$!: Observable<Remedio[]>;
  mostrarForm = false;

  novoRemedio = this.remedioEmBranco();

  constructor(private remedioService: RemedioService) {}

  ngOnInit(): void {
    this.remedios$ = this.remedioService.getRemedios();
  }

  remedioEmBranco() {
    return {
      nome: '',
      dosagem: '',
      unidade: 'mg',
      frequencia: 'diario' as FrequenciaTipo,
      horarios: [{ id: '1', hora: '08:00' }],
      cor: '#4f9cf9',
      ativo: true,
      dataInicio: new Date().toISOString().split('T')[0],
      observacoes: ''
    };
  }
  erros: { nome?: string; dosagem?: string } = {};

  salvar(): void {
    this.erros = {};
    if (!this.novoRemedio.nome.trim()) this.erros.nome = 'Nome é obrigatório';
    if (!this.novoRemedio.dosagem.trim()) this.erros.dosagem = 'Dosagem é obrigatória';
    if (Object.keys(this.erros).length > 0) return;

    this.remedioService.salvarRemedio(this.novoRemedio).subscribe(() => {
      this.mostrarForm = false;
      this.novoRemedio = this.remedioEmBranco();
    });
  }

  cancelar(): void {
    this.mostrarForm = false;
    this.novoRemedio = this.remedioEmBranco();
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

  cores = ['#4f9cf9', '#a78bfa', '#34d399', '#fbbf24', '#f87171', '#fb923c'];
}