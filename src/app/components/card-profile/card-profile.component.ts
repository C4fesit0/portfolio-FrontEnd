import { Component, Input, OnInit } from '@angular/core';
import { IProfile } from '../../interfaces/IProfile.interface';
import { ProfileService } from '../../services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { IProfileDto } from '../../interfaces/IProfileDto.interface';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {

  @Input() edit:boolean = false;
  profile:IProfile = {
    id: 0,
    nombre: "",
    telefono: "",
    email: "",
    sobre_mi: "",
    titulo: "",
    foto_perfil: "",
    tecnologias: []
  };

  profileDto:IProfileDto = {
    nombre: "",
    telefono: "",
    email: "",
    sobre_mi: "",
    titulo: "",
    foto_perfil: "",
  };

  foto_perfil!:string | undefined;

  archivo!:File;

  constructor(private profileService:ProfileService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.profileService.getProfileData().subscribe((data)=>{
      this.profile=data;
    })
  }


  public open(modal: any): void {
    this.modalService.open(modal);
  }

  actualizarPerfil(data: NgForm):void{
    console.log("Perfil Actualizado: ");
    this.profileDto.nombre=data.value.nombre;
    this.profileDto.telefono=data.value.telefono;
    this.profileDto.email=data.value.email;
    this.profileDto.sobre_mi=data.value.sobre_mi;
    this.profileDto.titulo=data.value.titulo;


    console.log(this.profileDto);
     if(this.archivo){
      this.profileDto.foto_perfil=this.archivo.name;
      this.profileService.subirFoto(this.archivo,this.profile.id).subscribe(e =>{
        console.log(e);
      })
    }else{
      this.profileDto.foto_perfil = this.profile.foto_perfil
    }


    this.profileService.actualizarPerfil(this.profileDto).subscribe(e =>{
      console.log(e);
    });

  }

  cargaImagen(event:any){
    this.archivo = event.target.files[0];
    //console.log(this.archivo);
    this.convertirArchivo(this.archivo);
  }

  convertirArchivo(file:File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.foto_perfil =reader.result?.toString();
    };
}


}
