import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Product) {
    const productImages: any[] = product.productImages;

    const productImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];
      const imageBlob = this.datURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });
      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      productImagesToFileHandle.push(finalFileHandle);
    }
    product.productImages = productImagesToFileHandle;
    return product;
  }

  // Take a picByte and converted into blob
  public datURItoBlob(picByte: string, imageType: any) {
    const byteString = window.atob(picByte);   //window.atob()--> picbytes contains base-64encoded binary data which is converted into binary data
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      const codeUnit = byteString.charCodeAt(i);
      if (!isNaN(codeUnit)) {
        int8Array[i] = codeUnit;
      }
    }
    // Convert to Blob and return
    const blob = new Blob([arrayBuffer], { type: imageType });
    return blob;
  }
}
