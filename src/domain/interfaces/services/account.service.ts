import { CreateAccountDto } from 'src/domain/dtos/account/create-account.dto';
import { UpdateAccountDto } from 'src/domain/dtos/account/update-account.dto';
import { Account } from '../../entities/account.entity';

// This will be our injection token.
export const ACCOUNT_SERVICE = 'ACCOUNT SERVICE';

export interface IAccountService {
  getAccounts(): Account[];
  getAccountById(id: string): Account;
  createAccount(account: CreateAccountDto): Account;
  updateAccount(id: string, accountUpdate: UpdateAccountDto): Account;
  deleteAccount(id: string): string;
}