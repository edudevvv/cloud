import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { CreateAccountController } from './controllers/accounts/create-account-controller';
import { DeleteAccountController } from './controllers/accounts/delete-account-controller';
import { CreateUploadController } from './controllers/uploads/create-upload-controller';
import { LoginAccountController } from './controllers/accounts/login-account-controller';
import { ListUploadController } from './controllers/uploads/list-upload-controller';
import { DeleteUploadController } from './controllers/uploads/delete-upload-controller';
import { DownloadUploadController } from './controllers/uploads/download-upload-controller';
import { DownloadUploadService } from './services/download-upload-service';
import { ConfirmAccountService } from './services/confirm-account-service';
import { ConfirmAccountController } from './controllers/accounts/confirm-account-controller';

@Module({
  controllers: [CreateAccountController, DeleteAccountController, LoginAccountController, ConfirmAccountController, CreateUploadController, ListUploadController, DeleteUploadController, DownloadUploadController],
  providers: [PrismaService, DownloadUploadService, ConfirmAccountService]
})

export class AppModule {}
