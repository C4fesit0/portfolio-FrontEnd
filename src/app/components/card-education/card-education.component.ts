import { Component, Input, OnInit } from '@angular/core';
import { EducationService } from '../../services/education.service';
import { IEducation } from '../../interfaces/IEducation.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  archivo!:File;

  constructor(private educationService:EducationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.educationService.getEducationData().subscribe((data)=>{
      console.log(data);
      this.educationData= data;
    })
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  agregarEducacion(data: any){
    console.log(data.value);
    this.setEducationDtoData(data.value);
    console.log('EDUCACION DTO');
    console.log(this.educacionDto);
    console.log(this.archivo);



   this.educationService.createEducation(this.educacionDto).subscribe((education)=>{
      if(this.archivo){
        this.educationService.uploadImage(this.archivo,education.id).subscribe((e)=>{
          console.log(e);
          this.educationData.push(education);
        })
      }else{
        this.educationData.push(education);
      }

    })
    this.resetEducationDto();
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
    console.log(data.target.files[0])
    this.archivo = data.target.files[0];
  }

  actualidad(data: any){
    console.log(data.target.checked)
    this.educacionDto.actualidad = data.target.checked;
  }

  nivelEstudio(data:any){
    console.log(data.target.value);
  }

  setEducationDtoData(data:any){
    this.educacionDto.actualidad = data.actualidad;
    this.educacionDto.fecha_inicio = data.fecha_inicio;
    this.educacionDto.fecha_final = data.fecha_final;
    this.educacionDto.id_nivel_estudio = data.nivel_estudio;
    this.educacionDto.institucion = data.institucion;
    this.educacionDto.titulo =data.titulo;
    this.educacionDto.imagen = data.imagen;
  }

  resetEducationDto(){
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
