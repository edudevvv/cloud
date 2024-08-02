import { Body, Controller, Delete, Post } from "@nestjs/common";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { AccountLoginDto } from "src/dtos/accounts/login-account-dtos";
import { PrismaService } from "src/prisma/prisma.service";


@Controller("/accounts")
export class LoginAccountController {
    constructor (private prisma: PrismaService) {}
    @Post("/login")
    async handlerLogin(@Body() AccountDto: AccountLoginDto) {
        const { email, password } = AccountDto;

        const findUser = await this.prisma.users.findFirst({ where: { email } });
        if (!findUser) return { message: 'User not exists.', error: false }; 

        const hashCompared = await compareSync(password, findUser.password); 
        if (!hashCompared) return { message: 'Invalid password.', error: false };

        const token = await sign(findUser, process.env.JWT_SECRET);
        await this.prisma.users.update({ 
            where: { email: findUser.email },
            data: { token: token }
        });

        return { message: 'Logged successfully.', error: false, token: token };
    }
} 