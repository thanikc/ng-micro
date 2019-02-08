import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {
    private _notification$: Subject<string> = new Subject();

    get notification$(): Observable<string> {
        return this._notification$.asObservable();
    }

    sendMessage(message: string) {
        this._notification$.next(message);
    }
}