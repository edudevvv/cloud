import { Body, Controller, Post, Request } from "@nestjs/common";
import { hash } from "bcryptjs";
import { CreateAccountDtos } from "src/dtos/accounts/create-account-dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { Request as ExpressRequest } from "express";

@Controller("/accounts")
export class CreateAccountController {
    constructor (private prisma: PrismaService) {}

    @Post("/create")
    async handlerCreate(@Body() AccountDto: CreateAccountDtos, @Request() req: ExpressRequest) {
        const { email, password, name, avatar, lang } = AccountDto;

        const findUser = await this.prisma.users.findUnique({ where: { email } });
        if (findUser) return { message: 'User already exists.', error: false }; 

        const hashedPassword = await hash(password, 8);
        const user = await this.prisma.users.create({ 
            data: {
                email,
                password: hashedPassword,
                token: "",
                name,
                avatar,
                lang
            }
        }); 

        await this.prisma.logs.create({ 
            data: {
                ip: req.ip.toString().replace("::ffff:", ""),
                msg: "Account created",
                userId: user.id
            }
        })
        
        return { message: 'User created successfully.', error: false };
    }    
}