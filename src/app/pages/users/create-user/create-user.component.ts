import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/user';
import { CreateUserService} from 'src/app/services/create-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  createuserForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _createUserService: CreateUserService) {
    // Aquí definimos el formulario y el validador personalizado
    this.createuserForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatpassword: ['', Validators.required]
    }, { 
      // Aquí usamos el validador de contraseñas
      validator: this.passwordMatchValidator
    });
  }

  // Validador personalizado para las contraseñas
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatpassword')?.value;

    if (password !== repeatPassword) {
      return { 'passwordMismatch': true };  // Retorna un error si las contraseñas no coinciden
    }
    return null;  // Si las contraseñas coinciden, retorna null
  }

  crearUsuario() {
    if (this.createuserForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete todos los campos correctamente',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const USER: Usuario = {
      username: this.createuserForm.get('username')?.value,
      email: this.createuserForm.get('email')?.value,
      password: this.createuserForm.get('password')?.value,
    }

    Swal.fire({
      title: 'Creación de Usuario',
      text: '¿Desea crear el usuario?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._createUserService.guardarUsuario(USER).subscribe(data => {
          Swal.fire({
            title: 'Usuario creado',
            text: 'El usuario fue creado con éxito',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/']);
        }, (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al crear el usuario. Inténtelo nuevamente.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        });
      }
    });
  }
}
