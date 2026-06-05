import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../../servicios/auth';
import Swal from 'sweetalert2';

function mayorDeEdad(control: AbstractControl) {
  const valor = control.value;
  if (!valor) return null;
  const edad = new Date(control.value);
  const hoy = new Date();
  const resultado = hoy.getTime() - edad.getTime();
  if (resultado / 31536000000 >= 18) {
    return null;
  }
  return { menorDeEdad: true };
}

function clavesCoinciden(group: AbstractControl) {
  const clave = group.get('clave')?.value;
  const repetir = group.get('repiteClave')?.value;
  if (!clave) return null;
  if (!repetir) return null;
  if (clave != repetir) {
    return { noCoincide: true };
  }
  return null;
}

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit {
  miFormulario!: FormGroup;
  private router = inject(Router);
  private auth = inject(Auth);
  ngOnInit(): void {
    this.miFormulario = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$'),
          Validators.required,
        ]),
        apellido: new FormControl('', [
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$'),
          Validators.required,
        ]),
        nombreUsuario: new FormControl('', [
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+$'),
          Validators.required,
        ]),
        fechaNacimiento: new FormControl('', [Validators.required, mayorDeEdad]),
        mail: new FormControl('', [Validators.email, Validators.required]),
        clave: new FormControl('', [
          Validators.minLength(8),
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*+\\-_.?])[A-Za-z0-9!@#$%^&*+\\-_.?]{8,}$',
          ),
        ]),
        repiteClave: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ.,1234567890 ]+$'),
          Validators.required,
        ]),
        imagenPerfil: new FormControl('', [Validators.required]),
      },
      { validators: clavesCoinciden },
    );
  }

  get nombre() {
    return this.miFormulario.get('nombre');
  }
  get apellido() {
    return this.miFormulario.get('apellido');
  }
  get nombreUsuario() {
    return this.miFormulario.get('nombreUsuario');
  }
  get fechaNacimiento() {
    return this.miFormulario.get('fechaNacimiento');
  }
  get mail() {
    return this.miFormulario.get('mail');
  }
  get clave() {
    return this.miFormulario.get('clave');
  }
  get repiteClave() {
    return this.miFormulario.get('repiteClave');
  }
  get descripcion() {
    return this.miFormulario.get('descripcion');
  }
  get imagenPerfil() {
    return this.miFormulario.get('imagenPerfil');
  }

  enviarForm() {
    this.miFormulario.markAllAsTouched();
    if (this.miFormulario.invalid) return;

    const usuario = this.miFormulario.value;
    this.auth.registro(usuario).subscribe({
      next: (respuesta) => {
        Swal.fire({
          title: 'Registrado!',
          text: 'Usted ha sido registrado correctamente!',
          icon: 'success',
        });
        this.router.navigateByUrl('/publicaciones');
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al registrar al usuario',
          icon: 'error',
        });
        console.error('Error al registrar al usuario', err);
      },
    });
  }
}
