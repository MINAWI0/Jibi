import {Injectable} from '@angular/core';
import {CloudinaryImage} from '@cloudinary/url-gen';
import {map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilestoreService {

  img!: CloudinaryImage
  constructor(private http: HttpClient) {
  }

  public uploadFile(file: File): Observable<string> {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "d1zmuabv");
      data.append("cloud_name", "dlkvn0fpz");

      return this.http.post("https://api.cloudinary.com/v1_1/dlkvn0fpz/image/upload", data)
        .pipe(
          map((response: any) => response.secure_url)
        );
    }
    return of("");
  }
}
