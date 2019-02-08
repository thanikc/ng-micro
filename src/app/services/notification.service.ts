import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
    public noticifation: Subject<string> = new Subject();
}