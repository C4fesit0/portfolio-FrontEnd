import { Component, Input, OnInit } from '@angular/core';
import { IProfile } from '../../interfaces/IProfile.interface';
import { ProfileService } from '../../services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { IProfileDto } from '../../interfaces/IProfileDto.interface';
import { ImageService } from '../../services/image.service';
import { Storage, getDownloadURL, list, ref, uploadBytes } from '@angular/fire/storage';


@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {

  @Input() edit:boolean = false;

  profile:IProfile = {
    id: 1,
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

  event:any;
  existeArchivo:boolean = false;

  constructor(private profileService:ProfileService,
      private modalService: NgbModal,
      private storage:Storage) { }

  ngOnInit(): void {
    this.profileService.getProfileData().subscribe((data)=>{
      console.log(data)
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

    const name = "perfil_"+1;
    const file = this.event.target.files[0];
    const imageRef= ref(this.storage, `images/`+name);
    uploadBytes(imageRef,file)
    .then(res =>{
      console.log(res)
      const imagesRef = ref(this.storage,'images/'+name);
      getDownloadURL(imagesRef).then((url)=>{
        console.log(url)
        this.profileDto.foto_perfil = url;
        console.log(this.profileDto);
        this.profileService.actualizarPerfil(this.profileDto).subscribe(e =>{
          this.profile = e;
        });
      })
      .catch(err =>{console.log(err)});
    })
    .catch(err=>{
      console.log(err);
    })



  }

  cargaImagen($event:any){
      const name = "perfil_"+this.profile.id;
      this.event = $event;
  }


}
