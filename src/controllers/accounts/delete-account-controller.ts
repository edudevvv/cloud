import { Body, Controller, Delete } from "@nestjs/common";
import { DeleteAccountDtos } from "src/dtos/accounts/delete-account-dtos";
import { PrismaService } from "src/prisma/prisma.service";


@Controller("/accounts")
export class DeleteAccountController {
    constructor (private prisma: PrismaService) {}
    @Delete("/delete")
    async handlerDelete(@Body() AccountDto: DeleteAccountDtos) {
        const { email } = AccountDto;

        const findUser = await this.prisma.users.findFirst({ where: { email } });
        if (!findUser) return { message: 'User not exists.', error: false }; 

        await this.prisma.users.delete({ where: { email } });
        return { message: 'User deleted successfully.', error: false };
    }
} 