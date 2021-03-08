import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule
]

@NgModule({
  imports: [modules],
  exports: [modules]
})
export class AppCommonModule { }
