import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEducation } from '../../../interfaces/IEducation.interface';
import { IEducationDto } from '../../../interfaces/IEducationDto.interface';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input() education!:IEducation;
  @Output() deleteEducation = new EventEmitter<number>();
  imagen!:File;
  educacionDto!:IEducationDto;


  constructor() { }

  ngOnInit(): void {
  }

  eliminarExperiencia(){
    this.deleteEducation.emit(this.education.id);
  }

  actualizarEducacion(data:IEducation){
    console.log(data);
    this.setEducacionDto(data);
  }

  actualizarImagen(imagen:File){
    console.log(imagen)
    this.imagen = imagen;
  }

  setEducacionDto(data:IEducation){
    this.educacionDto.actualidad = data.actualidad;
    this.educacionDto.fecha_final=data.fecha_final;
    this.educacionDto.fecha_inicio=data.fecha_inicio;
    this.educacionDto.id_nivel_estudio=data.nivel.id
    this.educacionDto.imagen=this.imagen.name;
    this.educacionDto.id_persona=1;
    this.educacionDto.institucion=data.institucion;
    this.educacionDto.titulo=data.titulo;
  }

}
