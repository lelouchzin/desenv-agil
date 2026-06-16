import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { RemedioService } from '../../services/remedio.service';
import { FrequenciaTipo } from '../../models/remedio.model';

@Component({
  selector: 'app-remedio-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './remedio-form.component.html',
  styleUrls: ['./remedio-form.component.scss']
})
export class RemedioFormComponent {
  form: FormGroup;
  salvando = false;
  cores = ['#4f9cf9', '#a78bfa', '#34d399', '#fbbf24', '#f87171', '#f472b6'];

  constructor(
    private fb: FormBuilder,
    private svc: RemedioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      dosagem: ['', Validators.required],
      unidade: ['mg', Validators.required],
      frequencia: ['diario' as FrequenciaTipo, Validators.required],
      intervaloHoras: [8],
      cor: [this.cores[0], Validators.required],
      observacoes: [''],
      ativo: [true],
      horarios: this.fb.array([this.criarHorario('08:00')])
    });
  }

  get horarios(): FormArray {
    return this.form.get('horarios') as FormArray;
  }

  criarHorario(hora = '08:00'): FormGroup {
    return this.fb.group({ hora: [hora, Validators.required] });
  }

  addHorario() {
    this.horarios.push(this.criarHorario());
  }

  removeHorario(i: number) {
    if (this.horarios.length > 1) this.horarios.removeAt(i);
  }

  selecionarCor(cor: string) {
    this.form.patchValue({ cor });
  }

  selecionarFrequencia(freq: FrequenciaTipo) {
    this.form.patchValue({ frequencia: freq });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvando = true;
    const v = this.form.value;
    this.svc.salvarRemedio({
      nome: v.nome,
      dosagem: v.dosagem,
      unidade: v.unidade,
      frequencia: v.frequencia,
      horarios: v.horarios.map((h: { hora: string }, idx: number) => ({ id: `h${Date.now()}-${idx}`, hora: h.hora })),
      intervaloHoras: v.frequencia === 'intervalo' ? v.intervaloHoras : undefined,
      cor: v.cor,
      observacoes: v.observacoes || undefined,
      ativo: v.ativo,
      dataInicio: new Date().toISOString().split('T')[0]
    }).subscribe(() => {
      this.salvando = false;
      this.router.navigate(['/remedios']);
    });
  }
}
