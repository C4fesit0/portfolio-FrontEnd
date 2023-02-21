import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { IExperience } from '../../../interfaces/IExperience.interface';
import { IExperienceDto } from '../../../interfaces/IExperienceDto.interface';
import { ExperienceService } from '../../../services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() edit:boolean = false;
  @Input() experience!:IExperience;
  @Output() deleteExp = new EventEmitter<IExperience>();

  experienceDto:IExperienceDto = {
    id_persona:1,
    puesto: '',
    empresa: '',
    fecha_inicio: '',
    fecha_final: '',
    actualidad: false,
    descripcion: '',
    imagen: ''
  }

  image!:string | undefined;

  archivo!:File;

  constructor(private experienceService:ExperienceService) { }

  ngOnInit(): void {
  }

  eliminarExperiencia(){
    this.deleteExp.emit(this.experience);
  }


  actualizarExperiencia(experiencia:IExperience){
    //console.log(experiencia);
   //console.log('CARD EXPERIENCE');
    this.setExperienceDto(experiencia);

    this.experienceService.updateExperience(experiencia.id,this.experienceDto).subscribe((e)=>{
        if(this.archivo){
          //console.log('hay imagen');
          this.experienceService.uploadImage(this.archivo,experiencia.id).subscribe((e)=>{
            //console.log('SE SUBIO LA IMAGEN');
            this.experience = e;
            this.convertirArchivo(this.archivo);
          })
        }else{
          //console.log('no hay imagen');
          this.experience = e;
        }
    })
  }

  actualizarImagen(image:File){
    console.log('CARD-EXP')
    console.log(image);
    this.archivo = image;
  }


  convertirArchivo(file:File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.image =reader.result?.toString();
    };
  }

  setExperienceDto(experiencia:IExperience){
    this.experienceDto.puesto = experiencia.puesto;
    this.experienceDto.actualidad = experiencia.actualidad;
    this.experienceDto.empresa = experiencia.empresa;
    this.experienceDto.descripcion = experiencia.descripcion;
    this.experienceDto.fecha_inicio = experiencia.fecha_inicio;
    this.experienceDto.fecha_final = experiencia.fecha_final;
    this.experienceDto.imagen =this.image?this.image:'';
  }

}

