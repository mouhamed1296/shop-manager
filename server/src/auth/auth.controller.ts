import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwtAuthGuard';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

type RequestWithUser = Request & { user: Partial<User> };

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  //Route pour l'inscription
  @Post('register')
  async register(@Body() registerUserDto: CreateUserDto) {
    return await this.userService.createUser(registerUserDto);
  }

  //Route pour l'authentification
  /*@Post('login')
  async login(@Body() loginUserDto: AuthDto) {
    const payload = await this.userService.login(loginUserDto);
    const { access_token } = await this.authService.generateAccesToken(payload);
    return {
      access_token,
      user: payload,
    };
  }*/

  //Route pour l'authentification d'une agence
  @Post('login')
  async login(@Body() loginDto: AuthDto, @Res() res: Response) {
    // login payload
    const payload = await this.userService.login(loginDto);

    //console.log(payload);

    const roles = this.authService.rolesToNumbers(payload.roles);

    // generate tokens
    const { access_token } = await this.authService.generateAccesToken(
      {
        email: payload.email,
        id: payload.id,
        roles: payload.roles,
        permissions: payload.permissions,
      },
      '15s',
    );
    const { refresh_token } = await this.authService.generateRefreshToken({
      email: payload.email,
      roles: payload.roles,
      id: payload.id,
      permissions: payload.permissions,
    });

    const result = await this.userService.updateUserRefreshToken(
      payload.email,
      refresh_token,
    );

    console.log(result);

    // set cookies
    res.cookie('token', refresh_token, {
      httpOnly: false,
      //path: '/auth/refresh_token',
      sameSite: 'none',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ access_token, roles });
  }

  @Get('/refreshToken')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    // cookies
    const cookie = req.cookies;

    console.log(req.cookies);

    // refresh token
    const refreshToken = cookie.token;

    // if no refresh token
    if (!refreshToken) {
      throw new ForbiddenException();
    }

    // verify refresh token
    const payload = await this.userService.verifyRefreshToken(refreshToken);

    const roleNames = payload.roles.map((role) => role.name);
    const permissions = payload.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.name),
    );

    // if no payload
    if (!payload) {
      throw new ForbiddenException();
    }

    // generate new access token
    const { access_token } = await this.authService.generateAccesToken(
      {
        email: payload.email,
        roles: roleNames,
        permissions,
        id: payload.id,
      },
      '1d',
    );

    const roles = this.authService.rolesToNumbers(roleNames);

    // send new access token
    res.json({ access_token, roles });
  }

  //Route pour la déconnexion d'une agence
  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    Object.keys(req.cookies).forEach((cookie) => {
      res.cookie(cookie, '', {
        httpOnly: false,
        secure: false, // Secure only in production
        sameSite: 'none', // Adjust as needed
        expires: new Date(0),
      });
    });

    // Optionally, you can clear cookies by specifying them individually
    // res.clearCookie('refreshToken', { path: '/' });
    // res.clearCookie('accessToken', { path: '/' });

    res.status(200).json({ message: 'Logged out and all cookies cleared' });
    // cookies
    /*const cookie = req.cookies;

    if (!cookie?.token) return res.sendStatus(204);

    // refresh token
    const refreshToken = cookie.token;

    // verify refresh token
    const payload = await this.userService.verifyRefreshToken(refreshToken);
    console.log(payload);

    if (!payload) {
      res.clearCookie('token', {
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        maxAge: 0, // delete cookie
      });
      return res.sendStatus(204);
    }

    // remove refresh token
    await this.userService.updateUserRefreshToken('sarr@gmail.com', null);

    // delete cookies
    res.clearCookie('token', {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      maxAge: 0, // delete cookie
    });

    // send response
    res.sendStatus(204);*/
  }

  //Route pour le profil de l'utilisateur
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Req() request: RequestWithUser) {
    console.log(request.user);

    const user = await this.userService.findOneByEmail(request.user.email);

    // remove password
    const userWithoutPassword = this.userService.getUserWithoutPassword(user);

    return userWithoutPassword;
  }
}
