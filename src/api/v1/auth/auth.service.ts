import { Injectable } from '@nestjs/common';
import { UserModel } from '../user/model/user.model';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { IResponse } from '../interface/response-api.interface';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _repository: UserModel,
    private readonly _jwt: JwtService,
  ) {}

  async login(userLogin: LoginDto) {
    const result = await this._repository.findByUserNameOrEmailAsync(
      userLogin.email,
    );
    const response: IResponse<UserEntity> = {
      message: '',
      body: [],
      count: 0,
      statusCode: 200,
    };
    try {
      if (!result) throw new Error('Exception');

      const isValidPassword = await compare(
        userLogin.password,
        result.password,
      );

      if (!isValidPassword) throw new Error('Exception');
      result.password = undefined;

      result.token = await this._jwt.signAsync({
        email: result.email,
        userId: result.usrId,
        username: result.username,
      });
      response.body.push(result);
    } catch (ex: any) {
      response.message = 'Usuario o contraseña incorrectas';
      response.statusCode = 401;
      console.log(ex.message);
    }
    return response;
  }
}
