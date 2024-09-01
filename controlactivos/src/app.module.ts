import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { LicitacionModule } from './licitacion/licitacion.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345',
    database: 'controlactivos',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    UserModule,
    LicitacionModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
