import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGE } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'users'): any {

    let url = URL_IMAGE;
    if (!img) {
      return url + '/users/xxx';
     }

    if (img.indexOf('https') >= 0) {
      return img;
     }

    switch (tipo) {
      case 'users':
        url += '/users/' + img;
        break;
      case 'hospitals':
        url += '/hospitals/' + img;
        break;
      case 'doctors':
        url += '/doctors/' + img;
        break;
      default:
        console.log('tipo de imagen no existe: users, hospitals, doctors');
        url += '/users/xxx';
    }
    return url;
  }

}
