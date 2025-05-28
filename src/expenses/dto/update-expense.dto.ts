import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsString, IsDate } from "class-validator";

export class UpdateExpenseDto {
  @ApiProperty({ description: "Title of the expense", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: "Amount of the expense", required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ description: "Category of the expense", required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: "Date of the expense", required: false })
  @IsOptional()
  @IsDate()
  date?: Date;
}
