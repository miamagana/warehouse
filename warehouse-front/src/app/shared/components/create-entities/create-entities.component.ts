import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-create-entities',
  templateUrl: './create-entities.component.html',
  styleUrls: ['./create-entities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEntitiesComponent {
  @Input() mini!: boolean;
  @Output() create: EventEmitter<File> = new EventEmitter<File>();
  constructor() {}

  fileChange(event: any): void {
    this.create.emit(event.target.files[0]);
  }
}
