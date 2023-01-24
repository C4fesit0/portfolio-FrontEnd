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
  @Output() updateExp = new EventEmitter<IExperience>();
  @Output() upadateImageExp = new EventEmitter<File>();

  image!:string | undefined;

  constructor(private experienceService:ExperienceService) { }

  ngOnInit(): void {
    console.log(this.experience);
    this.experienceService.getImagen(this.experience.id).subscribe((e)=>{
      console.log(e);
    })
  }

  eliminarExperiencia(){
    this.deleteExp.emit(this.experience);
  }

  actualizarExperiencia(experiencia:IExperience){
    console.log('Experience Component')
    this.updateExp.emit(experiencia);
  }

  actualizarImagen(image:File){
    console.log(image)
    this.upadateImageExp.emit(image);
    this.convertirArchivo(image);
  }

  convertirArchivo(file:File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.image =reader.result?.toString();
    };
  }



}
