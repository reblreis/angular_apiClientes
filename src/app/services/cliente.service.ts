import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClienteModel } from "../models/cliente.model";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(
        private httpClient: HttpClient
    ){}

    cadastrar(formData: FormData): Observable<ClienteModel> {
        return this.httpClient
            .post<ClienteModel>(`${environment.apiUrl}/cadastrar`, formData);
    }

    consultarPorNome(nome: string) : Observable<ClienteModel[]> {
        return this.httpClient
            .get<ClienteModel[]>(`${environment.apiUrl}/consultar/${nome}`);
    }

    obterRelatorio(nome: string, tipo: number) : Observable<Blob> {

        var request = '';
        if(tipo == 1) {
            request = `${environment.apiUrl}/relatorio-excel/${nome}`;
        }
        else if(tipo == 2) {
            request = `${environment.apiUrl}/relatorio-pdf/${nome}`;
        }

        const options = { responseType: 'blob' as 'json' }; 
        return this.httpClient.get<Blob>(request, options);        
    }
}