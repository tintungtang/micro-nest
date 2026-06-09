import { IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class ProductDTO {
    @IsString()
    @MinLength(2)
    @MaxLength(120)
    readonly name: string;

    @IsNumber()
    @IsPositive()
    readonly price: number;

    @IsString()
    @MaxLength(1000)
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly image?: string;
}
