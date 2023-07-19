import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _config: ConfigService) {
    super({
      algorithms: 'HS384',
      secretOrKey: _config.getOrThrow<string>('jwt_secret'),
      ignoreExpiration: false,
      issuer: _config.getOrThrow('host_app'),
      audience: _config.getOrThrow('host_app'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(user: any) {
    return user;
  }
}
