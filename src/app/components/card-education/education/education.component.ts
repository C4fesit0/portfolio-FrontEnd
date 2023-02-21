import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEducation } from '../../../interfaces/IEducation.interface';
import { IEducationDto } from '../../../interfaces/IEducationDto.interface';
import { EducationService } from '../../../services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input() edit:boolean = false;
  @Input() education!:IEducation;
  @Output() deleteEducation = new EventEmitter<number>();
  archivo!:File;
  imagen!:string | undefined;
  educacionDto:IEducationDto= {
    id_persona:1,
    titulo:'',
    fecha_inicio:'',
    fecha_final:'',
    actualidad:false,
    institucion:'',
    imagen:'',
    id_nivel_estudio:1,
  }


  constructor(private eduacionService:EducationService) { }

  ngOnInit(): void {
  }

  eliminarExperiencia(){
    this.deleteEducation.emit(this.education.id);
  }

  actualizarEducacion(data:IEducation){
    console.log('ACTUALIZAR EDUCACION');
    console.log(data);
    console.log(this.imagen);
    console.log('--------------------------');
    this.setEducacionDto(data);
    this.eduacionService.updateEducation(this.educacionDto,data.id).subscribe((res)=>{
      if(this.archivo){
        this.eduacionService.uploadImage(this.archivo,data.id).subscribe((resI)=>{
          this.convertirArchivo(this.archivo);
          console.log(res);
          console.log(resI);
          this.education = res
        })
      }else{
        this.education = res
      }
    })
  }

  actualizarImagen(imagen:File){
    console.log(imagen)
      this.archivo = imagen;
  }

   convertirArchivo(file:File){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.imagen = reader.result?.toString();
      };
  }

  setEducacionDto(data:IEducation){
    this.educacionDto.actualidad = data.actualidad;
    this.educacionDto.fecha_final=data.fecha_final;
    this.educacionDto.fecha_inicio=data.fecha_inicio;
    this.educacionDto.id_nivel_estudio=data.nivel.id
    this.educacionDto.imagen=this.education.imagen;
    this.educacionDto.id_persona=1;
    this.educacionDto.institucion=data.institucion;
    this.educacionDto.titulo=data.titulo;
  }

}


