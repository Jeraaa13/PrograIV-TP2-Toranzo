import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  miFormulario!: FormGroup;
  private router = inject(Router);
  ngOnInit(): void {
    this.miFormulario = new FormGroup({
      mail: new FormControl('', [Validators.email, Validators.required]),
      clave: new FormControl('', [Validators.required]),
    });
  }

  /*
  accesoRapido(usuario: number) {
    switch (usuario) {
      case 1:
        this.mail.set('messi@mail.com');
        this.clave.set('Messi1+');
        break;
      case 2:
        this.mail.set('manu@dona.com');
        this.clave.set('Gino1+');
        break;
      default:
        this.mail.set('admin@admin.com');
        this.clave.set('Admin1+');
        break;
    }
  }*/

  get mail() {
    return this.miFormulario.get('mail');
  }
  get clave() {
    return this.miFormulario.get('clave');
  }

  enviarForm() {
    this.miFormulario.markAllAsTouched();
    if (this.miFormulario.invalid) return;

    const usuario = this.miFormulario.value;
  }
}
