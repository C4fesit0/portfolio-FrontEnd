import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEducation } from '../../../interfaces/IEducation.interface';

@Component({
  selector: 'app-edit-education-modal',
  templateUrl: './edit-education-modal.component.html',
  styleUrls: ['./edit-education-modal.component.css']
})
export class EditEducationModalComponent implements OnInit {

  @Input() educacion!:IEducation;
  educacionActualizada!:IEducation;
  @Output() updateEducation = new EventEmitter<IEducation>();
  @Output() updateImage = new EventEmitter<File>();
  imagen!:File;

  constructor(private modalService: NgbModal){}

  ngOnInit(){}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  actualizarEducacion(data:any){
    console.log(data.value);
    console.log(this.educacion)
    this.updateEducation.emit(this.educacion);
  }



  cargarImagen(data:any){
    console.log(data.target.files[0]);
  }

  actualidad(data:any){
    console.log(data.target.checked);
  }

  nivelEstudio(data:any){
    console.log(data.target.value);
  }

}
