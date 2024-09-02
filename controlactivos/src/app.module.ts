import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { LicitacionModule } from './licitacion/licitacion.module';
import { LeyModule } from './ley/ley.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';

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
    LeyModule,
    ProveedorModule,
    UbicacionModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
