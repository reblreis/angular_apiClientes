import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClienteModel } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { environment } from '../../../../environments/environment.development';
import { NgxSpinnerService } from 'ngx-spinner';
import { DownloadHelper } from '../../../helpers/download.helper';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css'
})
export class ConsultaClientesComponent {

  //variáveis
  clientes : ClienteModel[] = [];
  imgPath : string = environment.imgUrl;
  tipoRelatorio: number = 1;

  //construtor
  constructor(
    private clienteService: ClienteService,
    private spinnerService: NgxSpinnerService,
    private downloadHelper: DownloadHelper,
  ) {}

  //estrutura do formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required])
  });  

  //função auxiliar do formulário
  get f() {
    return this.form.controls;
  }

  //função para capturar o submit
  submit() {

    this.spinnerService.show();

    this.clienteService.consultarPorNome(this.form.value.nome as string)
      .subscribe({
        next: (data) => {
          this.clientes = data;
        },
        error: (e) => {
          console.log(e);
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }

  gerarRelatorio() : void {

    if(this.form.valid && this.clientes.length > 0) {
      
      this.clienteService 
        .obterRelatorio(this.form.value.nome as string, this.tipoRelatorio) 
        .subscribe({ 
          next : (data) => {
            this.downloadHelper.downloadFile (data, this.tipoRelatorio, 'relatorio'); 
          }, 
          error: (e) => { 
            console.log(e); 
          } 
        })
        .add(() => { 
          this.spinnerService.hide(); 
        })
    }
    else{
      alert('Por favor, realize uma pesquisa de clientes.');
    }
  }
}