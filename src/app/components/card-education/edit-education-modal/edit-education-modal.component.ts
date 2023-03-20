import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEducation } from '../../../interfaces/IEducation.interface';

@Component({
  selector: 'app-edit-education-modal',
  templateUrl: './edit-education-modal.component.html',
  styleUrls: ['./edit-education-modal.component.css']
})
export class EditEducationModalComponent implements OnInit {

  @Input() educacion:IEducation =  {
    id: 0,
    titulo: '',
    fecha_inicio: '',
    fecha_final: '',
    actualidad: false,
    institucion: '',
    imagen: '',
    nivel: {
      id: 1,
      nombre: ''
    }
  }
  educacionActualizada:IEducation =  {
    id: 0,
    titulo: '',
    fecha_inicio: '',
    fecha_final: '',
    actualidad: false,
    institucion: '',
    imagen: '',
    nivel: {
      id: 1,
      nombre: ''
    }
  }
  @Output() updateEducation = new EventEmitter<IEducation>();
  @Output() updateImage = new EventEmitter<any>();
  event:any;
  existeImagen:boolean = false;

  constructor(private modalService: NgbModal){}

  ngOnInit(){}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  actualizarEducacion(data:any){
    console.log(data.value);
    console.log(this.educacion)
    this.setEducacionActualizada(data.value);
    if(this.existeImagen)  this.updateImage.emit(this.event)
    this.updateEducation.emit(this.educacionActualizada);
    this.existeImagen = false;
  }

  setEducacionActualizada(data:any){
    this.educacionActualizada.id = this.educacion.id;
    this.educacionActualizada.titulo = data.titulo;
    this.educacionActualizada.nivel.id = data.nivel_estudio;
    this.educacionActualizada.institucion = data.institucion;
    this.educacionActualizada.imagen = this.educacion.imagen;
    this.educacionActualizada.fecha_inicio = data.fecha_inicio;
    this.educacionActualizada.fecha_final = data.fecha_final;
    this.educacionActualizada.actualidad = data.actualidad;
    console.log(this.educacionActualizada);
  }

  cargarImagen($event:any){
    this.existeImagen = true;
    this.event = $event;
  }

  actualidad(data:any){
    console.log(data.target.checked);
  }

  nivelEstudio(data:any){
    console.log(data.target.value);
  }

}
