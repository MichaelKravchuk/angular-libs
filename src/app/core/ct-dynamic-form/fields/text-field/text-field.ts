import { BaseField } from '../../../../../../projects/ct-dynamic-form/src/lib/base.field';
import { ExtendedFormGroup } from '../../../../../../projects/ct-dynamic-form/src/lib/form-controls';
import { BaseFieldInterface } from '../../../../../../projects/ct-dynamic-form/src/lib/interfaces/field-config.interface';

export type TextFieldInterface = BaseFieldInterface;

export class TextField extends BaseField {
    public readonly type = 'text';

    constructor(options: TextFieldInterface) {
        super(options);
    }
}
