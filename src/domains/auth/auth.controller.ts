import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from '../shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginCredentialsDto: LoginCredentialsDto) {
    const user = await this.authService.validateUser(loginCredentialsDto);
    if (user) {
      return { message: 'Login successful', user };
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}
