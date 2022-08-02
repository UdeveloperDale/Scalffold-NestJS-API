import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
import { response } from 'express';
import { ErrorDetailModel } from 'src/domain/models/error-detail.model';
import { ResponseDataModel } from 'src/domain/models/response-data.model';
  
  @Catch()
  export class GlobalExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();


      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

          const errorException =
          exception instanceof HttpException
            ? exception?.message
            : "Problema general";
  

          const errorDetails = Array<ErrorDetailModel>();
          const error = new ErrorDetailModel();
          error.timestamp = new Date().toISOString();
          error.code = 'Ns01';
          error.message = errorException;
          error.details = httpAdapter.getRequestUrl(ctx.getRequest());
          errorDetails.push(error);
      
          const responseError = new  ResponseDataModel<any>;
          responseError.succeeded = false;
          responseError.errorDetails = errorDetails;

          console.log(exception);
          httpAdapter.reply(ctx.getResponse(), responseError, httpStatus);
    }
  }
  