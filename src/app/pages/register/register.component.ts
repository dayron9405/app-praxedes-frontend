import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Librerias
import Swal from 'sweetalert2';

// models
import { UserModel } from 'src/app/models/user/user-model';

// services
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserModel;
  remember: boolean = false;
  hidePassword:boolean = true;
  hidePasswordConfirm:boolean = true;
  registerForm: FormGroup;
  messagesError: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.user = new UserModel();
    this.rememberUser();
    this.createForm();
  }

  ngOnInit(): void {

  }

  rememberUser() {
    if (localStorage.getItem('email' && 'clave')) {
      this.user.email = localStorage.getItem('email');
      this.user.clave = localStorage.getItem('clave');
      this.remember = true
    }
  }

  createForm(){
    this.messagesError = [
      {
        field: 'nombre',
        validations:[
          {
            validators: 'required',
            message:'Campo nombre es requerido'
          },
          {
            validators: 'minlength',
            message:'Debe ingresar minimo 3 caracteres'
          },
          {
            validators: 'maxlength',
            message:'Maximo 50 caracteres'
          }
        ]
      },
      {
        field: 'apellido',
        validations:[
          {
            validators: 'required',
            message:'Campo apellido es requerido'
          },
          {
            validators: 'minlength',
            message:'Debe ingresar minimo 3 caracteres'
          },
          {
            validators: 'maxlength',
            message:'Maximo 50 caracteres'
          }
        ]
      },
      {
        field: 'doctoIdent',
        validations:[
          {
            validators: 'required',
            message:'Campo documento es requerido'
          },
          {
            validators: 'minlength',
            message:'Debe ingresar minimo 8 caracteres'
          },
          {
            validators: 'maxlength',
            message:'Maximo 15 caracteres'
          }
        ]
      },
      {
        field: 'email',
        validations:[
          {
            validators: 'required',
            message:'Campo email es requerido'
          },
          {
            validators: 'minlength',
            message:'Debe ingresar minimo 10 caracteres'
          },
          {
            validators: 'maxlength',
            message:'Maximo 100 caracteres'
          },
          {
            validators: 'email',
            message:'El email no es valido'
          }
        ]
      },
      {
        field: 'clave',
        validations:[
          {
            validators: 'required',
            message:'Campo contraseña es requerido'
          },
          {
            validators: 'minlength',
            message:'Debe ingresar minimo 6 caracteres'
          },
          {
            validators: 'maxlength',
            message:'Maximo 20 caracteres'
          }
        ]
      },
      {
        field: 'claveConfirmar',
        validations:[
          {
            validators: 'required',
            message:'Campo confirmar contraseña es requerido'
          },
          {
            validators: 'minlength',
            message:'Debe ingresar minimo 6 caracteres'
          },
          {
            validators: 'maxlength',
            message:'Maximo 20 caracteres'
          }
        ]
      }
    ]
    this.registerForm = this.fb.group({
      nombre: [
        this.user.nombre,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      apellido: [
        this.user.apellido,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      doctoIdent: [
        this.user.doctoIdent,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15)
        ]
      ],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
          Validators.email
        ]
      ],
      clave: [
        this.user.clave,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      claveConfirmar: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      cia: [
        this.user.cia,
        [
          Validators.required
        ]
      ],
      remember: [
        this.remember
      ]
    }, { validators: this.checkPasswords })
  }

  checkPasswords(group: FormGroup){
    const password = group.get('clave').value;
    const confirmPassword = group.get('claveConfirmar').value;
    return password === confirmPassword ? null : { notSame: true };
  }

  register() {

    if (this.registerForm.invalid) {
      return;
    };

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info'
    });
    Swal.showLoading();

    delete this.registerForm.value.claveConfirmar;
    delete this.registerForm.value.remember;
    this.auth.register( this.registerForm.value )
      .subscribe( res => {
        Swal.close();
        if (this.remember) {
          localStorage.setItem('email', this.registerForm.get('email').value);
          localStorage.setItem('clave', this.registerForm.get('clave').value);
        }
        this.registerForm.addControl('claveConfirmar', new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]));
        this.registerForm.addControl('remember', new FormControl(this.remember));
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.usuario.usuario);
        this.auth.getHeadersRequest();
        this.router.navigateByUrl('/app');
      }, (err) => {
        this.registerForm.addControl('claveConfirmar', new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]));
        this.registerForm.addControl('remember', new FormControl(this.remember));
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error al autenticar',
          // text: err,
          icon: 'error'
        });
      });
  }

  changeHidePassword(event){
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  changeHidePasswordConfirm(event){
    event.preventDefault();
    this.hidePasswordConfirm = !this.hidePasswordConfirm;
  }

  fiteredValidation(field){
    const fieldRegister = this.messagesError.find(item => {
      return item.field == field;
    })
    return fieldRegister.validations;
  }

}

