import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';
import { Remedio, DoseHistorico, NotificacaoHoje } from '../models/remedio.model';

const MOCK_REMEDIOS: Remedio[] = [
  {
    id: '1', nome: 'Losartana', dosagem: '50', unidade: 'mg', frequencia: 'diario',
    horarios: [{ id: 'h1', hora: '08:00' }, { id: 'h2', hora: '20:00' }],
    cor: '#4f9cf9', ativo: true, dataInicio: '2024-01-10',
    observacoes: 'Tomar com água, em jejum'
  },
  {
    id: '2', nome: 'Metformina', dosagem: '850', unidade: 'mg', frequencia: 'diario',
    horarios: [{ id: 'h3', hora: '12:00' }, { id: 'h4', hora: '19:00' }],
    cor: '#a78bfa', ativo: true, dataInicio: '2024-02-01',
    observacoes: 'Tomar junto com alimentação'
  },
  {
    id: '3', nome: 'Ômega 3', dosagem: '1000', unidade: 'mg', frequencia: 'diario',
    horarios: [{ id: 'h5', hora: '07:30' }],
    cor: '#34d399', ativo: true, dataInicio: '2024-03-15'
  },
  {
    id: '4', nome: 'Vitamina D3', dosagem: '2000', unidade: 'UI', frequencia: 'semanal',
    horarios: [{ id: 'h6', hora: '09:00' }], diasSemana: [0],
    cor: '#fbbf24', ativo: true, dataInicio: '2024-01-01'
  },
  {
    id: '5', nome: 'Amoxicilina', dosagem: '500', unidade: 'mg', frequencia: 'intervalo',
    horarios: [{ id: 'h7', hora: '06:00' }], intervaloHoras: 8,
    cor: '#f87171', ativo: false, dataInicio: '2024-06-01', dataFim: '2024-06-10'
  }
];

const agora = new Date();
const hoje = agora.toISOString().split('T')[0];

const MOCK_NOTIFICACOES: NotificacaoHoje[] = [
  { id: 'n1', remedioId: '3', remedioNome: 'Ômega 3', remedioCor: '#34d399', dosagem: '1000mg', unidade: 'mg', horario: '07:30', status: 'tomado', atrasado: false },
  { id: 'n2', remedioId: '1', remedioNome: 'Losartana', remedioCor: '#4f9cf9', dosagem: '50mg', unidade: 'mg', horario: '08:00', status: 'tomado', atrasado: false },
  { id: 'n3', remedioId: '2', remedioNome: 'Metformina', remedioCor: '#a78bfa', dosagem: '850mg', unidade: 'mg', horario: '12:00', status: 'pendente', atrasado: true },
  { id: 'n4', remedioId: '2', remedioNome: 'Metformina', remedioCor: '#a78bfa', dosagem: '850mg', unidade: 'mg', horario: '19:00', status: 'pendente', atrasado: false },
  { id: 'n5', remedioId: '1', remedioNome: 'Losartana', remedioCor: '#4f9cf9', dosagem: '50mg', unidade: 'mg', horario: '20:00', status: 'pendente', atrasado: false },
];

const MOCK_HISTORICO: DoseHistorico[] = [
  { id: 'd1', remedioId: '1', remedioNome: 'Losartana', remedioCor: '#4f9cf9', dosagem: '50mg', horarioPrevisto: `${hoje}T08:00:00`, horarioReal: `${hoje}T08:05:00`, status: 'tomado' },
  { id: 'd2', remedioId: '3', remedioNome: 'Ômega 3', remedioCor: '#34d399', dosagem: '1000mg', horarioPrevisto: `${hoje}T07:30:00`, horarioReal: `${hoje}T07:32:00`, status: 'tomado' },
  { id: 'd3', remedioId: '1', remedioNome: 'Losartana', remedioCor: '#4f9cf9', dosagem: '50mg', horarioPrevisto: `2024-06-11T08:00:00`, horarioReal: `2024-06-11T08:10:00`, status: 'tomado' },
  { id: 'd4', remedioId: '2', remedioNome: 'Metformina', remedioCor: '#a78bfa', dosagem: '850mg', horarioPrevisto: `2024-06-11T12:00:00`, status: 'pulado' },
  { id: 'd5', remedioId: '2', remedioNome: 'Metformina', remedioCor: '#a78bfa', dosagem: '850mg', horarioPrevisto: `2024-06-11T19:00:00`, horarioReal: `2024-06-11T19:15:00`, status: 'tomado' },
  { id: 'd6', remedioId: '3', remedioNome: 'Ômega 3', remedioCor: '#34d399', dosagem: '1000mg', horarioPrevisto: `2024-06-10T07:30:00`, horarioReal: `2024-06-10T07:45:00`, status: 'tomado' },
  { id: 'd7', remedioId: '1', remedioNome: 'Losartana', remedioCor: '#4f9cf9', dosagem: '50mg', horarioPrevisto: `2024-06-10T08:00:00`, status: 'pulado' },
];

@Injectable({ providedIn: 'root' })
export class RemedioService {
  private remedios$ = new BehaviorSubject<Remedio[]>(MOCK_REMEDIOS);
  private notificacoes$ = new BehaviorSubject<NotificacaoHoje[]>(MOCK_NOTIFICACOES);
  private historico$ = new BehaviorSubject<DoseHistorico[]>(MOCK_HISTORICO);

  getRemedios(): Observable<Remedio[]> {
    return this.remedios$.asObservable();
  }

  getRemedioById(id: string): Remedio | undefined {
    return this.remedios$.value.find(r => r.id === id);
  }

  getNotificacoesHoje(): Observable<NotificacaoHoje[]> {
    return this.notificacoes$.asObservable();
  }

  getHistorico(): Observable<DoseHistorico[]> {
    return this.historico$.asObservable();
  }
}
