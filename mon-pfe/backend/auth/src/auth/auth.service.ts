import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  // Récupère l'utilisateur depuis le microservice user par email
  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3002/user/email/${email}`)
      );
      const user = response.data;

      if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
      }

      // Compare le mot de passe fourni avec le hash récupéré
      const passwordMatches = await bcrypt.compare(pass, user.password);

      if (!passwordMatches) {
        throw new UnauthorizedException('Email et/ou mot de passe sont incorrects');
      }

      return user;
    } catch (error) {
      // Erreur globale (ex: microservice down ou pas trouvé)
      throw new UnauthorizedException('Email et/ou mot de passe sont incorrects');
    }
  }

  // Login : valide l'utilisateur et génère un token JWT
  async login(user: AuthUserDto) {
    // validateUser lance une erreur si échec
    const userData = await this.validateUser(user.email, user.password);

    const payload = {
      id: userData.id,
      email: userData.email,
    };

    const expiresIn = user.rememberMe ? 24 * 60 * 60 : 2 * 60 * 60; // en secondes

    return {
      idUser: userData.id,
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn,
      }),
    };
  }
}

