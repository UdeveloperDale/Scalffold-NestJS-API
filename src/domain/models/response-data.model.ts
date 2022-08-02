import { ErrorDetailModel } from "./error-detail.model";

export class ResponseDataModel<T> {

   constructor(){}

    public succeeded: boolean = true;
    public result: T;
    public errorDetails: Array<ErrorDetailModel>;
}