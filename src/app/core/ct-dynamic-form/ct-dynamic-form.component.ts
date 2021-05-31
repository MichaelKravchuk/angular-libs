import { Component, OnInit } from '@angular/core';
import { createDynamicForm } from '../../../../projects/ct-dynamic-form/src/lib/common';
import { ExtendedFormGroup } from '../../../../projects/ct-dynamic-form/src/lib/form-controls';
import { TextField } from './fields';

@Component({
    selector: 'app-ng-dynamic-form',
    templateUrl: './ct-dynamic-form.component.html',
    styleUrls: ['./ct-dynamic-form.component.scss']
})
export class CtDynamicFormComponent implements OnInit {
    public readonly form: ExtendedFormGroup;

    constructor() {
        this.form = createDynamicForm([
            new TextField({
                key: 'search',
                label: 'IFA',
                relatedFields: [{
                    checkVisibility: '2',
                    configs: [
                        new TextField({
                            key: 'search2',
                            label: 'IFA2',
                        })
                    ]
                }]
            })
        ]);

        console.log(this.form);
    }


    ngOnInit() {
    }

}
