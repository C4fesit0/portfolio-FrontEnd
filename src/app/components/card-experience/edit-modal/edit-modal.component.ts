import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExperience } from '../../../interfaces/IExperience.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

  @Input() edit:boolean=false;
  @Input() experience!: IExperience;
  image!:File;
  experiences:IExperience[]= [];

  constructor(private modalService: NgbModal) {

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  actualizarExperiencia(data: NgForm){
    console.log(data.value)
  }

  cargaImagen(event:any){
    this.image = event.target.files[0];
    console.log(this.image);
  }

  actualidad(event: any):void{
    this.experience.actualidad=event.target.checked;
  }

}


