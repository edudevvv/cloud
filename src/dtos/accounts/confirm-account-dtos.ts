import { IsEmail, IsNotEmpty, IsNumber, Length } from "class-validator";


export class ConfirmAccountDtos {
    @IsNotEmpty() @IsEmail()
    email: string;

    @IsNotEmpty() @Length(6)
    code: string;
}