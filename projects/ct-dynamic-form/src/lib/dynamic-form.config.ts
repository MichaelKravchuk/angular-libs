import { Component } from '@angular/core';
import { BaseField } from './base.field';
import { BaseFieldInterface } from './interfaces/field-config.interface';


interface NewComponent {
    new (...params: any): Component;
}

interface NewBaseField {
    new (options: BaseFieldInterface): BaseField;
}

export interface DynamicFieldConfig {
    component: NewComponent;
    config: NewBaseField;
}

export type DynamicFormConfig = DynamicFieldConfig[];
