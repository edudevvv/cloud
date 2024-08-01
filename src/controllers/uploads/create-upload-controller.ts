import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { verify } from "jsonwebtoken";

import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUploadDtos } from "src/dtos/uploads/create-upload-dtos";
import { PrismaService } from "src/prisma/prisma.service";


@Controller("/uploads")
export class CreateUploadController {
    constructor (private prisma: PrismaService) {}
    @Post("/create")
    @UseInterceptors(FileInterceptor('file'))

    async handlerDelete(@UploadedFile() file: Express.Multer.File, @Body() UserDto: CreateUploadDtos) {        
        const { token } = UserDto;

        return await verify(token, process.env.JWT_SECRET, async (err, validToken: any) => {    
            if (err) return { message: "Token is invalid", error: true };
            if (!file) return { message: "file is mandatory", error: true }; 
    
            const { originalname, buffer, size } = file;
            const fileCreated = await this.prisma.upload.create({
                data: {
                    name: originalname,
                    size: size,
                    buffer: buffer.toString("base64url"),
                    userId: validToken.id
                }
            });
            
            return { message: "Upload created successfully", file: { name: file.originalname, id: fileCreated.id }, error: false };
        });
    }
} 