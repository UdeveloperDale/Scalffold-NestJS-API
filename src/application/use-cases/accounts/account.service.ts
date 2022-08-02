import { Injectable, NotFoundException } from '@nestjs/common';

import { faker } from '@faker-js/faker';
import { Account } from 'src/domain/entities/account.entity';
import { IAccountService } from 'src/domain/interfaces/services/account.service';
import { CreateAccountDto } from 'src/domain/dtos/account/create-account.dto';
import { UpdateAccountDto } from 'src/domain/dtos/account/update-account.dto';

@Injectable()
export class AccountsService implements IAccountService {
  private accounts: Account[] = [];

  constructor() {
    for (let index = 0; index < 20; index++) {
      this.accounts.push({
        id: faker.datatype.uuid(),
        accountNumber: faker.finance.account(8),
        accountName: faker.finance.accountName(),
        amount: parseFloat(faker.finance.amount(1000, 100000))
      });
    }
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  getAccountById(id: String): Account {
    const account = this.accounts.find((item) => item.id === id);

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    return account;
  }

  createAccount(account: CreateAccountDto): Account {
    const newAccount: Account = {
      id: faker.datatype.uuid(),
      ...account
    };

    this.accounts.push(newAccount);

    return newAccount;
  }

  updateAccount(id: string, accountUpdate: UpdateAccountDto): Account {
    const index = this.accounts.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }

    const account = this.accounts[index];
    this.accounts[index] = {
      ...account,
      ...accountUpdate
    }
    return this.accounts[index];
  }

  deleteAccount(id: string): string {
    const index = this.accounts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }

    this.accounts.splice(index, 1);
    return id;
  }
}
