import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter
} from "@angular/core";

@Directive({
  selector: "[appDnd]"
})
export class DndDirective {
  constructor() {}
  @HostBinding("class.bg-primary") fileOver: Boolean;
  @Output() fileDropped: EventEmitter<any> = new EventEmitter();
  @HostListener("dragover", ["$event"])
  onDragover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = true;
  }

  @HostListener("dragleave", ["$event"]) onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = false;
  }

  @HostListener("drop", ["$event"]) onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Drag");
    this.fileOver = false;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
