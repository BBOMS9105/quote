import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8) // 카카오 로그인 dto는 비밀번호 없어도 되게 구현
  password: string;
}
