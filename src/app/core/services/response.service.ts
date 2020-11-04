import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  protected success: boolean;
  protected data: any;
  protected errorCode: string;
  protected messages: string[] = [];

  constructor() { }

  getData(): any {
    return this.data;
  }

  getErrorCode(): string {
    return this.errorCode;
  }

  getMessages(): string[] {
    return this.messages.filter(val => !!val);
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
