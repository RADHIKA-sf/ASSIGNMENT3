import {userclass} from "./user";

export interface Crud {
    create(): void;
    read() : void;
    update(event:Event) : void;
    delete(event:Event) : void; 
  }