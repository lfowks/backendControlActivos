import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LicitacionModule } from './licitacion/licitacion.module';
import { LeyModule } from './ley/ley.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { DonadorModule } from './donador/donador.module';
import { RolModule } from './rol/rol.module';
import { ActivoModule } from './activo/activo.module';
import { LicenciaModule } from './licencia/licencia.module';
import { AuthModule } from './Auth/auth.module';  
import { ConfigModule } from '@nestjs/config';
import { PrestamoModule } from './prestamo/prestamo.module';

//mysql://root:NYRELvMsHdSXWVXBrLwDsHLMwVkyNpXi@autorack.proxy.rlwy.net:42891/railway

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    LicitacionModule,
    LeyModule,
    ProveedorModule,
    UbicacionModule,
    DonadorModule,
    RolModule,
    ActivoModule,
    LicenciaModule,
    AuthModule,
    PrestamoModule,          
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
