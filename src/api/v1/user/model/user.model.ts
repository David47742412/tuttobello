import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable({ scope: Scope.REQUEST })
export class UserModel {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _repository: Repository<UserEntity>,
  ) {}

  async findByUserNameOrEmailAsync(emailOrUsername: string) {
    const validEmail = () => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return isEmail.test(emailOrUsername);
    };
    if (!validEmail())
      return await this._repository.findOne({
        where: { username: emailOrUsername },
      });

    return await this._repository.findOne({
      where: { email: emailOrUsername },
    });
  }
}
