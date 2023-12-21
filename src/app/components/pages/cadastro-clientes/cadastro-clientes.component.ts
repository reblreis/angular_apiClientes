import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css'
})
export class CadastroClientesComponent {

  //vaiáveis
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  mensagemErroFoto: string = '';

  foto: File | null = null;

  //método construtor (injeção de dependência)
  constructor(
    private clienteService: ClienteService,
    private spinnerService: NgxSpinnerService
  ) {}

  //estrutura do formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
  });

  //função auxiliar para verificar
  //a mensagem de erro de validação
  //para cada campo
  get f() {
    return this.form.controls;
  }

  //função para realizar o submit
  //dos dados do formulário
  submit(): void {
   
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if(this.foto) {

      const formData = new FormData();
      formData.append('nome', this.form.value.nome as string);
      formData.append('email', this.form.value.email as string);
      formData.append('foto', this.foto);

      this.spinnerService.show();

      this.clienteService.cadastrar(formData)
        .subscribe({
          next : (data) => {
            this.mensagemSucesso = `Cliente ${data.nome}, cadastrado com sucesso.`;
            this.form.reset();
          },
          error: (e) => {
            this.mensagemErro = e.error.message;
            console.log(e);
          }
        })
        .add(() => {
          this.spinnerService.hide();
        })
    }
    else {
      this.mensagemErro = 'Por favor, verifique o campo de upload de foto.';
    }
  }

  //função para capturar e validar
  //o arquivo selecionado para upload
  change(event: any) : void {
    //capturar o arquivo selecionado
    const file = event.target.files[0];
    if(file) {
      if(file.type.startsWith('image/') && file.size <= (1024 * 1024)){
        this.foto = file;
        this.mensagemErroFoto = '';
      }
      else{
        this.mensagemErroFoto = 'Por favor, envie apenas imagens de até 1MB de tamanho.';
      }
    }
    else {
      this.mensagemErroFoto = 'Por favor, selecione uma foto para upload.';
    }
  }

}