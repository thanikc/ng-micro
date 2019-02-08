import { UIContext } from 'projects/ui-context/src/public_api';

export class UIContextImpl implements UIContext {
    alert(message: string): void {
        alert(message);
    }
}
