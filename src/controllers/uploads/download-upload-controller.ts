import { Controller, Get, Request, Response } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import fs from "fs";

import { PrismaService } from "src/prisma/prisma.service";
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import path from "path";
import { DownloadUploadService } from "src/dtos/uploads/download-upload-dtos";


@Controller("/uploads")
export class DownloadUploadController {
    constructor (private prisma: PrismaService, private dowloadService: DownloadUploadService) {}
    @Get("/download/:id")
    async handlerDownload(@Request() req: ExpressRequest, @Response() res: ExpressResponse) {    
        const token = req.headers['x-token'] as string;
        if (!token) return { message: "Token is mandatory", error: true };
        
        const id = req.params['id'];
        return await verify(token, process.env.JWT_SECRET, async (err, validToken: any) => {    
            if (err) return { message: "Token is invalid", error: true };
            
            const findUser: any = await this.prisma.users.findUnique({ where: { token } });
            if (!findUser) return { message: "User not exists.", error: true };

            const uploads = await this.prisma.upload.findMany({ where: { id, userId: findUser.id } });
            if (uploads.length === 0) return { message: "Upload not found.", error: true };

            const upload = uploads[0];
            const fPath = await this.dowloadService.saveFile(upload.buffer, upload.name);

            await res.download(fPath, async () => {
                await this.dowloadService.deleteFile(fPath)
            });
            
            return { message: "File downloaded successfully", error: false };
        });
    }
} 