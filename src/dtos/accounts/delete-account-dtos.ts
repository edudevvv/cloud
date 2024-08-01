import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteAccountDtos {
    @IsEmail() @IsNotEmpty()
    email: string;
}