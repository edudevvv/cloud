import { Controller, Get, Request } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { ListUploadDtos } from "src/dtos/uploads/list-upload-dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { Request as ExpressRequest } from 'express';


@Controller("/uploads")
export class ListUploadController {
    constructor (private prisma: PrismaService) {}
    @Get("/list")
    async handlerList(@Request() req: ExpressRequest<ListUploadDtos>) {    
        const token = req.headers['x-token'].toString();
        if (!token) return { message: "Token is mandatory", error: true };
        
        return await verify(token, process.env.JWT_SECRET, async (err, validToken: any) => {    
            if (err) return { message: "Token is invalid", error: true };
            
            const findUser: any = await this.prisma.users.findUnique({ where: { token } });
            if (!findUser) return { message: "User not exists.", error: true };

            const uploads = await this.prisma.upload.findMany({ where: { userId: findUser.id } });
            return uploads;
        });
    }
} 