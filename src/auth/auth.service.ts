import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {3
        const user = await this.userService.findUserByEmail(email);

        const encriptedPassword = await bcrypt.hash(pass, 10);

        if (await bcrypt.compare(encriptedPassword, user.password)) {
            throw new UnauthorizedException();
        }

        return {
            token: await this.jwtService.signAsync({ id: user.id }, {
                secret: 'topSecret512'
            }), id: user.id
        }
    }

    async createUser(email: string, pass: any, name: string): Promise<any> {
        const user: CreateUserDto | undefined = await this.userService.findUserByEmail(email);

        if (user != null) {
            return {
                'message': 'This user exist'
            };
        }

        const password = await bcrypt.hash(pass, 10);

        const payload: CreateUserDto = { email: email, password: password, name: name };

        const id = await this.userService.createNewUser(payload);

        return {
            token: await this.jwtService.signAsync({ id: id }, {
                secret: 'topSecret512'
            }), id: id
        }
    }
}
