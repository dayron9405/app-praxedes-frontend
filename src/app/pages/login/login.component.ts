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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  remember: boolean = false;
  hidePassword:boolean = true;
  loginForm: FormGroup;
  messagesError: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.user = new UserModel();
    this.rememberUser()
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
        field: 'username',
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
        field: 'password',
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
      }
    ]
    this.loginForm = this.fb.group({
      username: [
        this.user.email,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
          Validators.email
        ]
      ],
      password: [
        this.user.clave,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      companyId: [
        this.user.cia,
        [
          Validators.required
        ]
      ],
      desdeMs: [
        true,
        [
          Validators.required
        ]
      ],
      remember: [
        this.remember
      ]
    })
  }

  login() {

    if (this.loginForm.invalid) {
      return;
    };

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info'
    });
    Swal.showLoading();

    delete this.loginForm.value.remember;
    this.auth.login( this.loginForm.value )
      .subscribe( res => {
        Swal.close();
        if (this.remember) {
          localStorage.setItem('email', this.loginForm.get('username').value);
          localStorage.setItem('clave', this.loginForm.get('password').value);
        }
        this.loginForm.addControl('remember', new FormControl(this.remember));
        console.log('res.usuario.usuario', res.usuario.usuario)
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.usuario.usuario);
        this.auth.getHeadersRequest();
        this.router.navigateByUrl('/app');
      }, (err) => {
        this.loginForm.addControl('remember', new FormControl(this.remember));
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

  fiteredValidation(field){
    const fieldLogin = this.messagesError.find(item => {
      return item.field == field;
    })
    return fieldLogin.validations;
  }

}
