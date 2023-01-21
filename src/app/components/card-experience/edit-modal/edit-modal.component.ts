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
  image!:File;
  @Output() actualizarEvent= new EventEmitter<IExperienceDto>();

  constructor(private modalService: NgbModal) {

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  actualizarExperiencia(data: NgForm){
    console.log(data.value);
    console.log(this.experience);
    //this.actualizarEvent.emit(this.experience);
  }

  cargaImagen(event:any){
    this.image = event.target.files[0];
    console.log(this.image);
  }

  actualidad(event: any):void{
    this.experience.actualidad=event.target.checked;
  }

}


