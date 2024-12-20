import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    let refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    if (!refreshToken) {
      const cookies = req.cookies;
      console.log(cookies);
      console.log(refreshToken);
      if (!cookies) {
        throw new UnauthorizedException();
      }
      if (!cookies.token) {
        throw new UnauthorizedException();
      }
      refreshToken = cookies.token;
    }
    return { ...payload, refreshToken };
  }

  private static extractJWT(req: Request): string | null {
    console.log(req.cookies);
    if (req.cookies && 'token' in req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  }
}
