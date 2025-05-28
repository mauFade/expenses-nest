import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@ApiTags("expenses")
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new expense" })
  @ApiResponse({
    status: 201,
    description: "The expense has been successfully created.",
  })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all expenses with optional filters" })
  @ApiResponse({ status: 200, description: "Return all expenses." })
  findAll(
    @Query("month") month?: string,
    @Query("year") year?: string,
    @Query("category") category?: string
  ) {
    return this.expensesService.findAll(month, year, category);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an expense by id" })
  @ApiResponse({ status: 200, description: "Return the expense." })
  @ApiResponse({ status: 404, description: "Expense not found." })
  findOne(@Param("id") id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an expense" })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  update(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an expense" })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  remove(@Param("id") id: string) {
    return this.expensesService.remove(id);
  }
}
