import { IsNotEmpty } from 'class-validator';

export class CreateUploadDtos {
    @IsNotEmpty()
    token: string;
}