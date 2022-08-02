import { Inject, Module } from '@nestjs/common';
import { AccountModule } from './modules/account.module';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { HealthModule } from './modules/health.module';
import config from './config';

@Module({
  imports: [AccountModule, ConfigModule.forRoot(
    { isGlobal: true,     
      envFilePath: [
        `environments/${process.env.NODE_ENV}.env` ||
          'environments/development.env',
      ],
      load: [config]
    }
    ),HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
   static port: number;
   constructor( @Inject(config.KEY) private configService: ConfigType<typeof config>){
      AppModule.port = +this.configService.port
   }
}