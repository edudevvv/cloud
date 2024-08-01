import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDtos {
    @IsEmail() @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    name: string;

    @IsString()
    avatar: string;
    lang: string;
}