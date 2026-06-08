import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../servicios/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  miFormulario!: FormGroup;
  private router = inject(Router);

  ngOnInit(): void {
    this.miFormulario = new FormGroup({
      correo: new FormControl('', [Validators.email, Validators.required]),
      clave: new FormControl('', [Validators.required]),
    });
  }

  /*
  accesoRapido(usuario: number) {
    switch (usuario) {
      case 1:
        this.correo.set('messi@correo.com');
        this.clave.set('Messi1+');
        break;
      case 2:
        this.correo.set('manu@dona.com');
        this.clave.set('Gino1+');
        break;
      default:
        this.correo.set('admin@admin.com');
        this.clave.set('Admin1+');
        break;
    }
  }*/

  get correo() {
    return this.miFormulario.get('correo');
  }
  get clave() {
    return this.miFormulario.get('clave');
  }

  enviarForm() {
    this.miFormulario.markAllAsTouched();
    if (this.miFormulario.invalid) return;

    const usuario = this.miFormulario.value;
    this.auth.login(usuario.correo, usuario.clave).subscribe({
      next: (respuesta) => {
        this.auth.guardarToken(respuesta.access_token);
        Swal.fire({
          title: 'Logeado!',
          text: 'Usted ha sido logeado correctamente!',
          icon: 'success',
        });
        this.router.navigateByUrl('/publicaciones');
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al logear al usuario.',
          icon: 'error',
        });
        console.error('Error al logear al usuario: ', err);
      },
    });
  }
}
