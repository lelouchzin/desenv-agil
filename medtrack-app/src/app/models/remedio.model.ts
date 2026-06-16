export type FrequenciaTipo = 'diario' | 'semanal' | 'intervalo';
export type DoseTomada = 'tomado' | 'pulado' | 'pendente';

export interface HorarioRemedio {
  id: string;
  hora: string; // "08:00"
}

export interface Remedio {
  id: string;
  nome: string;
  dosagem: string;       // "500mg"
  unidade: string;       // "comprimido", "ml", "gotas"
  frequencia: FrequenciaTipo;
  horarios: HorarioRemedio[];
  diasSemana?: number[]; // 0=Dom, 1=Seg...
  intervaloHoras?: number;
  cor: string;           // cor de destaque no card
  observacoes?: string;
  ativo: boolean;
  dataInicio: string;    // ISO date
  dataFim?: string;
}

export interface DoseHistorico {
  id: string;
  remedioId: string;
  remedioNome: string;
  remedioCor: string;
  dosagem: string;
  horarioPrevisto: string; // ISO datetime
  horarioReal?: string;    // ISO datetime
  status: DoseTomada;
  observacoes?: string;
}

export interface NotificacaoHoje {
  id: string;
  remedioId: string;
  remedioNome: string;
  remedioCor: string;
  dosagem: string;
  unidade: string;
  horario: string; // "08:00"
  status: DoseTomada;
  atrasado: boolean;
}
