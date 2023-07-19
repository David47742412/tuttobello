import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfig {
  constructor(private readonly _config: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      global: true,
      secret: this._config.getOrThrow<string>('jwt_secret'),
      signOptions: {
        algorithm: 'HS384',
        expiresIn: '7d',
        issuer: this._config.getOrThrow<string>('host_app'),
        audience: this._config.getOrThrow<string>('host_app'),
      },
      verifyOptions: {
        issuer: this._config.getOrThrow<string>('host_app'),
        audience: this._config.getOrThrow<string>('host_app'),
        subject: 'tuttobello',
      },
    };
  }
}
