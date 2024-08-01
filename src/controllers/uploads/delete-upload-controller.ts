import { Controller, Delete, Request } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { PrismaService } from "src/prisma/prisma.service";
import { Request as ExpressRequest } from 'express';


@Controller("/uploads")
export class DeleteUploadController {
    constructor (private prisma: PrismaService) {}
    @Delete("/delete/:id")
    async handlerDelete(@Request() req: ExpressRequest) {    
        const token = req.headers['x-token'].toString();
        if (!token) return { message: "Token is mandatory", error: true };
        
        const id = req.params['id'];
        return await verify(token, process.env.JWT_SECRET, async (err, validToken: any) => {    
            if (err) return { message: "Token is invalid", error: true };
            
            const findUser: any = await this.prisma.users.findUnique({ where: { token } });
            if (!findUser) return { message: "User not exists.", error: true };

            const findUpload = await this.prisma.upload.findMany({ where: { id, userId: findUser.id } });
            if (findUpload.length === 0) return { message: "Upload not found.", error: true };
            
            await this.prisma.upload.delete({ where: { id, userId: findUser.id } });
            return { message: "Upload deleted successfully", error: false };
        });
    }
} 