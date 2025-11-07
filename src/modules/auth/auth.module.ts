/* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { PrismaService } from '../../infrastructure/database/prisma.service';
// import { AuthController } from '../../presentation/controllers/auth.controller';
// import { AuthService } from './auth.service';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { UserRepository } from '../../infrastructure/database/repositories/user.repository';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       // eslint-disable-next-line @typescript-eslint/require-await
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: {
//           expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
//         },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy, PrismaService, UserRepository],
//   exports: [AuthService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { AuthController } from '../../presentation/controllers/auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
