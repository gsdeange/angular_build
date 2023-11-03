import { EventEmitter, Inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'}) //shortcut to adding to app.module
export class UserService {
   activatedEmitter = new EventEmitter<boolean>();
}