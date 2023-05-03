import { Failure } from "../failure";

export class ProgramCategoryFailure extends Failure {}

export const enum programCategoryFailuresEnum {
  programCategoriesNotFound = "PROGRAM_CATEGORIES_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
