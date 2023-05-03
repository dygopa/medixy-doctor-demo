import { Failure } from "../failure";
import { IMessage } from "domain/core/entities/chatEntity";

export class MessageFailure extends Failure {
  public data?: IMessage | null = null;

  constructor(code: string, data: IMessage | null) {
    super(code);
    this.data = data
  }
}

export const enum messageFailuresEnum {
  serverError = "SERVER_ERROR"
}
