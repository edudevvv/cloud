import { Body, Controller, Delete, Post, Request } from "@nestjs/common";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { Request as ExpressRequest } from "express";
import { AccountLoginDto } from "src/dtos/accounts/login-account-dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfirmAccountService } from "src/services/confirm-account-service";


@Controller("/accounts")
export class LoginAccountController {
    constructor (private prisma: PrismaService, private account: ConfirmAccountService) {}
    @Post("/login")
    async handlerLogin(@Body() AccountDto: AccountLoginDto, @Request() req: ExpressRequest) {
        const { email, password } = AccountDto;

        const findUser = await this.prisma.users.findFirst({ where: { email } });
        if (!findUser) return { message: 'User not exists.', error: false }; 

        const hashCompared = await compareSync(password, findUser.password); 
        if (!hashCompared) return { message: 'Invalid password.', error: false };

        if (!findUser.emailConfirmed) return { message: 'Plase confirm your email.', error: false } && await this.account.sendMail(findUser.email);
        const token = await sign(findUser, process.env.JWT_SECRET);
        
        await this.prisma.users.update({ 
            where: { email: findUser.email },
            data: { token: token }
        });

        await this.prisma.logs.create({ 
            data: {
                ip: req.ip.toString().replace("::ffff:", ""),
                msg: "New Login",
                userId: findUser.id
            }
        });

        return { message: 'Logged successfully.', error: false, token: token };
    }
} 