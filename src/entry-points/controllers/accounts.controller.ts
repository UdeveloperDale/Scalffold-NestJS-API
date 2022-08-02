import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseFilters,
  Version,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from 'src/domain/dtos/account/create-account.dto';
import { UpdateAccountDto } from 'src/domain/dtos/account/update-account.dto';
import {
  ACCOUNT_SERVICE,
  IAccountService,
} from 'src/domain/interfaces/services/account.service';
import { ResponseDataModel } from 'src/domain/models/response-data.model';
import { GlobalExceptionsFilter } from 'src/infraestructure/helpers/global-exception.filter';
import { Account } from '../../domain/entities/account.entity';


@Controller('api/accounts')
@UseFilters(GlobalExceptionsFilter)
@ApiTags('Accounts')
export class AccountsController {
  constructor(
    @Inject(ACCOUNT_SERVICE)
    private readonly accountService: IAccountService
  ) { }

  @ApiResponse({ status: 200, description: 'List All Accounts'})
  @ApiResponse({ status: 401, description: 'Recurso de Account no autorizado'})
  @ApiOperation({description: 'List All Accounts' })
  @Get()
  getAccounts(): ResponseDataModel<Account[]> {
    const response = new ResponseDataModel<Account[]>();
    response.result = this.accountService.getAccounts();
    return response;
  }

  @Version('5')
  @Get()
  getAccountsV2(): ResponseDataModel<Account[]> {
    const response = new ResponseDataModel<Account[]>();
    response.result = this.accountService.getAccounts();
    response.succeeded = false;
    return response;
  }

  @Get(':id')
  getAccountById(@Param('id') id: string): ResponseDataModel<Account> {
    const response = new ResponseDataModel<Account>();
    response.result = this.accountService.getAccountById(id);
    return response;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createAccount(@Body() account: CreateAccountDto): ResponseDataModel<Account> {
    const response = new ResponseDataModel<Account>();
    response.result = this.accountService.createAccount(account);
    return response;
  }

  @Patch(':id')
  updateAccount(
    @Param('id') id: string,
    @Body() account: UpdateAccountDto,
  ): ResponseDataModel<Account> {
    const response = new ResponseDataModel<Account>();
    response.result = this.accountService.updateAccount(id, account);
    return response;
  }

  @Delete(':id')
  deleteAccount(@Param('id') id: string): ResponseDataModel<string> {
    const response = new ResponseDataModel<string>();
    this.accountService.deleteAccount(id);
    response.result = `Cuenta con ${response.result} eliminada`;
    return response;
  }

  @Delete(':id')
  deleteAccountV2(@Param('id') id: string): ResponseDataModel<string> {
    const response = new ResponseDataModel<string>();
    this.accountService.deleteAccount(id);
    response.result = `Cuenta con ${response.result} eliminada`;
    return response;
  }

}
