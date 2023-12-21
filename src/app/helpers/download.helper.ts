import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DownloadHelper {

    //função para realizar o download do arquivo
    downloadFile(arquivo: Blob, tipo: number, filename: string) {

        var blob = null;
   
        if(tipo == 1) {
            blob = new Blob([arquivo], { type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            filename += '.xlsx';
        }
        else if(tipo == 2) {
            blob = new Blob([arquivo], { type : 'application/pdf' });
            filename += '.pdf';
        }
       
        var url = window.URL.createObjectURL(blob as Blob);
        var downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename;
   
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.removeChild(downloadLink);
    }

}