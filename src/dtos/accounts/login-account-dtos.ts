import { IsEmail, IsNotEmpty } from 'class-validator';

export class AccountLoginDto {
    @IsEmail() @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}