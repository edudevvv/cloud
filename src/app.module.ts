import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { CreateAccountController } from './controllers/accounts/create-account-controller';
import { DeleteAccountController } from './controllers/accounts/delete-account-controller';
import { CreateUploadController } from './controllers/uploads/create-upload-controller';
import { LoginAccountController } from './controllers/accounts/login-account-controller';
import { ListUploadController } from './controllers/uploads/list-upload-controller';
import { DeleteUploadController } from './controllers/uploads/delete-upload-controller';
import { DownloadUploadController } from './controllers/uploads/download-upload-controller';
import { DownloadUploadService } from './dtos/uploads/download-upload-dtos';

@Module({
  controllers: [CreateAccountController, DeleteAccountController, LoginAccountController, CreateUploadController, ListUploadController, DeleteUploadController, DownloadUploadController],
  providers: [PrismaService, DownloadUploadService]
})

export class AppModule {}
