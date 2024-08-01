import { IsNotEmpty } from 'class-validator';

export class ListUploadDtos {
    @IsNotEmpty()
    token: string;
}