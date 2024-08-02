import { Body, Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfirmAccountDtos } from "src/dtos/accounts/confirm-account-dtos";
import { ConfirmAccountService } from "src/services/confirm-account-service";

@Controller("/accounts")
export class ConfirmAccountController {
    constructor (private prisma: PrismaService, private account: ConfirmAccountService) {}

    @Post("/confirm")
    async handlerConfirm(@Body() body: ConfirmAccountDtos) {
        const { email, code } = body;

        const findUser = await this.prisma.users.findFirst({ where: { email } });
        if (!findUser) return { message: 'User not exists.', error: false };

        return await this.account.validateCode(email, code);
    }
}