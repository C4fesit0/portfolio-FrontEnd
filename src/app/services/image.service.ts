import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, list, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private storage:Storage) { }

  	url:string = '';

  uploadImage($event:any, name:string): void{
    const file = $event.target.files[0];
    const imageRef= ref(this.storage, `images/`+name);
    uploadBytes(imageRef,file)
    .then(res =>{
      this.getImages();
    })
    .catch(err=>{
      console.log(err);
    })
  }

  getImages(){
    const imagesRef = ref(this.storage,'images');
    list(imagesRef)
    .then(async res=>{
      for(let item of res.items){
        this.url = await getDownloadURL(item);
      }
    })
    .catch(err =>{console.log(err)});
  }

}
