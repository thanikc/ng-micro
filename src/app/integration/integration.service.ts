import { Injectable } from "@angular/core";

export interface Structure {
  id: string;
  title: string;
  src: string;
}

@Injectable()
export class IntegrationService {
  /** 
   * mocked structure - this could be loaded from something like a config server
   */
  _structure = [
    { id: 'client-a', title: 'Element A', src: 'client-a/main.js' },
    { id: 'client-b', title: 'Element B', src: 'client-b/main.js' },
  ];

  get structure(): Structure[] {
    return this._structure;
  }

  getStructure(id: string): Structure {
    const res = this.structure.filter(val => val.id === id);
    return res[0];
  }
}