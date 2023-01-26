import { Component, Input, OnInit } from '@angular/core';
import { EducationService } from '../../services/education.service';
import { IEducation } from '../../interfaces/IEducation.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { IEducationDto } from 'src/app/interfaces/IEducationDto.interface';

@Component({
  selector: 'app-card-education',
  templateUrl: './card-education.component.html',
  styleUrls: ['./card-education.component.css'],
  host:{
    "class": "card card--experience"
  }
})
export class CardEducationComponent implements OnInit {

  @Input() edit:boolean = false;
  educationData:IEducation[] = [];

  educacionDto: IEducationDto = {
  id_persona:1,
  titulo:'',
  fecha_inicio:'',
  fecha_final:'',
  actualidad:false,
  institucion:'',
  imagen:'',
  id_nivel_estudio:0,
  }

  constructor(private educationService:EducationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.educationService.getEducationData().subscribe((data)=>{
      //console.log(data);
      this.educationData= data;
    })
  }

  public open(modal: any): void {
    this.modalService.open(modal);
    this.resetEducacionDto();
  }

  agregarEducacion(data: NgForm){
    console.log(data.value);

    this.resetEducacionDto();
  }

  eliminarEducacion(data:any){
    console.log(data);
    this.educationService.deleteEducation(data).subscribe((e)=>{
     this.educationData = this.educationData.filter((education)=> {
      return education.id!=data
     });
    })
  }

  cargarImagen(data:any){
    console.log(data.target.file[0])
  }

  actualidad(data: any){
    console.log(data.target)

  }

  nivelEstudio(data:any){
    console.log(data.target.value);
  }

  resetEducacionDto(){
    this.educacionDto = {
      id_persona:1,
      titulo:'',
      fecha_inicio:'',
      fecha_final:'',
      actualidad:false,
      institucion:'',
      imagen:'',
      id_nivel_estudio:0,
      }
  }

}
