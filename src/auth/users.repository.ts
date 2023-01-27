/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt =  await bcrypt.genSalt(); //gera um prefixo para a senha codificada
    const hashedPassword =  await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
        await this.save(user);
    } catch (error) {
        if (error.code === '23505') { //username duplicado no postgres
            throw new ConflictException('username already exists');
        } else {
            throw new InternalServerErrorException();
        }
    }
  }
}
