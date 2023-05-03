import { Failure } from "../failure";
import { IChat } from "domain/core/entities/chatEntity";

export class ChatFailure extends Failure {
  public data?: IChat | null = null;

  constructor(code: string, data: IChat | null) {
    super(code);
    this.data = data
  }
}

export const enum chatFailuresEnum {
  chatIsCreate = "CHAT_IS_CREATE",
  serverError = "SERVER_ERROR"
}
