import { Component } from "@angular/core";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  ngOnInit() {
    this.status.subscribe(val => {
      this.showProgress = val;
    });
  }
  files: any;
  showAlert: boolean = false;
  showProgress: boolean = false;
  progressValue: any = 0;

  constructor(private http: HttpClient) {}

  status = new BehaviorSubject<boolean>(false);

  display(f: boolean) {
    this.status.next(f);
  }

  onFileDropped($event) {
    if (
      $event[0].type === "image/png" ||
      $event[0].type === "image/jpg" ||
      $event[0].type === "image/jpeg"
    ) {
      console.log($event);

      this.showAlert = false;
      let fileCollection = [];
      for (const item of $event) {
        fileCollection.push(item);
      }
      this.files = fileCollection[0];
    } else {
      this.files = false;
      this.showAlert = true;
    }
  }

  uploadData() {
    this.display(true);
    let formData: FormData = new FormData();
    formData.append("image", this.files, this.files.name);
    this.http
      .post("https://image-upload-demo-2.herokuapp.com/image", formData, {
        responseType: "text",
        reportProgress: true,
        observe: "events"
      })
      .pipe(
        map((event: HttpEvent<any>): void => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * event.loaded) / event.total);
            this.progressValue = percentDone;
            this.display(true);
          }
        })
      );
  }
}
