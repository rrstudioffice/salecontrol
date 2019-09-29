import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss']
})
export class ImagePage implements OnInit {
  @ViewChild('cropper') cropper: any;
  croppedImage: any;
  currentUpload = 0;
  imageChangedEvent: any;
  imageDefault: string;
  selectedFile: File;
  modelImage: any;

  constructor(
    private afS: AngularFireStorage,
    private modalCtrl: ModalController,
    private params: NavParams
  ) {}

  ngOnInit() {
    this.modelImage = this.params.data.image;
    const URL = this.params.data.url.split('/');
    // IMAGEM DEFAULT DE ACORDO COM A URL
    if (URL[1] === 'users' || URL[1] === 'goalkeepers' || URL[1] === 'coaches') {
      this.imageDefault = './assets/imgs/noavatar.png';
    } else {
      this.imageDefault = './assets/imgs/default.png';
    }
  }

  detectFiles(event) {
    this.imageChangedEvent = event;
    this.selectedFile = event.target.files[0] as File;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageLoaded() {}
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  save() {
    const doc = this.params.data.url; // URL DAS ACTIONS
    const storageRef = this.afS.storage.ref();
    const uploadTask = this.croppedImage
      ? // Se houver imagem redimensionada
        storageRef.child(`${doc}`).putString(this.croppedImage.split(',')[1], 'base64')
      : // Imagem Normal
        storageRef.child(`${doc}`).put(this.selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot: any) => {
        this.currentUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      () => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          if (this.currentUpload === 100) {
            this.modalCtrl.dismiss(downloadURL);
          }
        });
      }
    );
  }

  flipHorizontal() {
    this.cropper.flipHorizontal();
  }
  flipVertical() {
    this.cropper.flipVertical();
  }
  rotateLeft() {
    this.cropper.rotateLeft();
  }
  rotateRight() {
    this.cropper.rotateRight();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
