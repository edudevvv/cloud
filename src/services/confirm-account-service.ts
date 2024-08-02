import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { createTransport } from "nodemailer";

@Injectable()
export class ConfirmAccountService {
    constructor (private prisma: PrismaService) {}

    async sendMail(email: string) {
        try { 
            const findUser = await this.prisma.users.findUnique({ where: { email } });
            if (!findUser) return { message: "User not exists.", error: true };
            if (findUser.emailConfirmed) return { message: "Email already confirmed", error: true };

            const findMail = await this.prisma.validators.findUnique({ where: { userEmail: email } });
            if (findMail) return { message: "Email validation already sent.", error: true };

            const code = await this.generateCode();
            await this.prisma.validators.create({
                data: { userEmail: email, emailCode: code }
            });

            const trasporter = await createTransport({ 
                service: "gmail",
                auth: {
                    user: "",
                    pass: ""
                }
            });

            const emailBody = {
                from: '"Hello Kitty Cloud" <team@hellokittymeowmeow.xyz>',
                to: email,
                subject: "Verification email - Hello Kitty Cloud",
                html: `<p> Your verification code is: <b>${code}</b></p>`
            }

            await trasporter.sendMail(emailBody, (err, info) => {
                if (err) return console.log(err)
            
                console.log(info)
            })

            return { message: "Email sent successfully.", error: false }
        } catch (e: any) {
            console.log(e);
        }
    }

    async validateCode(email: string, code: string) {
        try { 
            const findUser = await this.prisma.users.findUnique({ where: { email } });
            if (!findUser) return { message: "User not exists.", error: true };

            const findCode = await this.prisma.validators.findUnique({ where: { userEmail: email } });
            if (code !== findCode.emailCode) return { message: "Code is not valid", error: true };

            await this.prisma.users.update({ where: { email: findUser.email }, data: { emailConfirmed: true } });
            await this.prisma.validators.delete({ where: { userEmail: email } });

            return { message: "Email valited successfully", error: false };
        } catch (e: any) {
            console.log(e);
        }
    }

    async generateCode() {
        return Math.floor(Math.random() * 999999).toString();
    }
}