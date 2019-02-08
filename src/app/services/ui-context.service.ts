import { UIContext } from 'projects/ui-context/src/public_api';
import { NotificationService } from 'app/services/notification.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UIContextService implements UIContext {
    constructor(private notificationService: NotificationService) {}
    
    alert(message: string): void {
        this.notificationService.sendMessage(message);
    }
}
