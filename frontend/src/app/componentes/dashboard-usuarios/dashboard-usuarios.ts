import { Component, inject, OnInit, signal } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios-service';
import { Usuario } from '../../interfaces/usuario';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ColorEstado } from '../../directivas/color-estado';

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
  selector: 'app-dashboard-usuarios',
  imports: [ReactiveFormsModule, ColorEstado],
  templateUrl: './dashboard-usuarios.html',
  styleUrl: './dashboard-usuarios.css',
})
export class DashboardUsuarios implements OnInit {
  usuariosService = inject(UsuariosService);
  usuarios = signal<Usuario[]>([]);
  miFormulario!: FormGroup;
  archivoSeleccionado: File | null = null;
  ngOnInit(): void {
    this.cargarUsuarios();

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
          Validators.pattern('^[a-zA-Z1234567890]+$'),
          Validators.required,
        ]),
        fechaNacimiento: new FormControl('', [Validators.required, mayorDeEdad]),
        correo: new FormControl('', [Validators.email, Validators.required]),
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
        ]),
        imagenPerfil: new FormControl(''),
        perfil: new FormControl('usuario', [Validators.required]),
      },
      { validators: clavesCoinciden },
    );
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe((usuarios) => {
      this.usuarios.set(usuarios);
    });
  }

  onDeshabilitar(id: string) {
    this.usuariosService.deshabilitarUsuario(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  onHabilitar(id: string) {
    this.usuariosService.activarUsuario(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  crearUsuario() {
    this.miFormulario.markAllAsTouched();
    if (this.miFormulario.invalid) return;

    this.usuariosService
      .crearUsuario(this.miFormulario.value, this.archivoSeleccionado ?? undefined)
      .subscribe({
        next: () => {
          this.cargarUsuarios();
          this.miFormulario.reset({ perfil: 'usuario' });
          this.archivoSeleccionado = null;
          Swal.fire({
            title: 'Creado!',
            text: 'Usuario creado correctamente',
            icon: 'success',
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error?.message || 'No se pudo crear',
            icon: 'error',
          });
        },
      });
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
  get correo() {
    return this.miFormulario.get('correo');
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
  get perfil() {
    return this.miFormulario.get('perfil');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivoSeleccionado = input.files?.[0] ?? null;
  }
}
