import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Res() res: Response, @Body() userLogin: LoginDto) {
    const response = await this.authService.login(userLogin);
    res.statusCode = response.statusCode;
    res.send(response);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  findAll(@Req() req: Request) {
    return req.user;
  }
}
