/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entity/users.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByKakaoId(kakaoId: string): Promise<Users | null> {
    return this.userRepository.findOne({ where: { kakaoId } });
  }

  // 회원가입
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    // 이메일 중복 체크
    const existingUserByEmail = await this.findByEmail(createUserDto.email);
    if (existingUserByEmail) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    // 이름이 제공되지 않은 경우 이메일에서 추출
    if (!createUserDto.name) {
      createUserDto.name = createUserDto.email.split('@')[0];
    }

    // 카카오 회원가입인 경우 카카오 ID 중복 체크
    if (createUserDto.kakaoId) {
      const existingUserByKakaoId = await this.findByKakaoId(
        createUserDto.kakaoId,
      );
      if (existingUserByKakaoId) {
        throw new ConflictException('이미 가입된 카카오 계정입니다.');
      }
    }

    // 일반 회원가입인 경우 비밀번호 필수 체크
    if (!createUserDto.kakaoId && !createUserDto.password) {
      throw new ConflictException('비밀번호는 필수 입력 항목입니다.');
    }

    // 비밀번호가 있는 경우 bcrypt로 해시 처리
    if (createUserDto.password) {
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    }

    try {
      const newUser = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(newUser);

      // 비밀번호 필드 제외하고 반환
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword as Users;
    } catch (error) {
      Logger.error('회원 가입 중 오류가 발생했습니다.', error);
      throw new InternalServerErrorException(
        '회원 가입 중 오류가 발생했습니다.',
      );
    }
  }
}
