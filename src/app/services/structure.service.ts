import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StructureHttp } from 'app/models/http/structure-http.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class StructureService {
  structureUrl = `${environment.apiUrl}structure.json`;

  constructor(private http: HttpClient) {}

  getStructure(): Observable<StructureHttp> {
    return this.http.get<StructureHttp>(this.structureUrl);
  }

}
