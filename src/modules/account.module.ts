import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsService } from 'src/application/use-cases/accounts/account.service';
import config from 'src/config';
import { ACCOUNT_SERVICE } from 'src/domain/interfaces/services/account.service';
import { AccountsController } from 'src/entry-points/controllers/accounts.controller';

@Module({
  imports: [HttpModule],
  controllers: [AccountsController],
  providers: [{ useClass: AccountsService, provide: ACCOUNT_SERVICE },
  {
    provide: 'tasks', useFactory: async (http: HttpService) => {
      const tasks = await http.axiosRef.get('https://jsonplaceholder.typicode.com/todos');
      return tasks.data;
    }, inject: [HttpService]
  }
  ],
})
export class AccountModule { }