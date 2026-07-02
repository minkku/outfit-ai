import { Injectable } from '@nestjs/common';
import type { AuthUser } from '../auth/interfaces/auth-provider.interface';
import type { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getMe(authUser: AuthUser) {
    return this.usersRepository.findOrCreate({
      id: authUser.id,
      email: authUser.email,
    });
  }

  updateMe(id: string, dto: UpdateUserDto) {
    return this.usersRepository.update(id, dto);
  }
}
