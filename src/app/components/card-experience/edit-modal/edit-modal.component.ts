import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExperience } from '../../../interfaces/IExperience.interface';
import { NgForm } from '@angular/forms';
import { IExperienceDto } from '../../../interfaces/IExperienceDto.interface';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

  @Input() experience!: IExperience;
  experienceUpdated:IExperience = {
    id: 0,
    puesto: '',
    empresa: '',
    fecha_inicio: '',
    fecha_final: '',
    actualidad: false,
    descripcion: '',
    imagen: ''
  };
  image!:File;
  existeImagen:boolean =false;
  @Output() actualizarEvent= new EventEmitter<IExperience>();
  @Output() actualizarImageEvent= new EventEmitter<File>();

  constructor(private modalService: NgbModal) {

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  actualizarExperiencia(data: NgForm){
    //console.log(data.value);
    this.setExperienciaData(data.value);
    this.actualizarEvent.emit(this.experienceUpdated);
    if(this.existeImagen){
      console.log('SENDING IMAGE')
      this.actualizarImageEvent.emit(this.image);
      this.existeImagen =false;
    }
  }

  setExperienciaData(data: IExperience){
    this.experienceUpdated.id = this.experience.id;
    this.experienceUpdated.puesto = data.puesto;
    this.experienceUpdated.empresa = data.empresa;
    this.experienceUpdated.fecha_inicio = data.fecha_inicio;
    this.experienceUpdated.actualidad = data.actualidad;
    this.experienceUpdated.fecha_final = data.fecha_final;
    this.experienceUpdated.descripcion = data.descripcion;

    console.log(this.image);
    if(this.image)
    {
      this.experienceUpdated.imagen = this.image.name;
    }else{
      this.experienceUpdated.imagen = this.experience.imagen;
    }
    console.log(this.experienceUpdated)
  }

  cargaImagen(event:any){
    this.existeImagen =true;
    this.image = event.target.files[0];
    console.log(this.image);
  }

  actualidad(event: any):void{
    this.experience.actualidad=event.target.checked;
  }

}


