import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEntitiesComponent } from './components/create-entities/create-entities.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CreateEntitiesComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  exports: [CreateEntitiesComponent],
})
export class SharedModule {}
