import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsDate } from "class-validator";

export class CreateExpenseDto {
  @ApiProperty({ description: "Title of the expense" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: "Amount of the expense" })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: "Category of the expense" })
  @IsNotEmpty()
  @IsString()
  category: string;
}
