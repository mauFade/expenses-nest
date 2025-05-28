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
  ApiQuery,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@ApiTags("expenses")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: "Criar uma nova despesa" })
  @ApiResponse({
    status: 201,
    description: "A despesa foi criada com sucesso.",
  })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as despesas com filtros opcionais" })
  @ApiResponse({ status: 200, description: "Retorna todas as despesas." })
  @ApiQuery({
    name: "month",
    required: false,
    description: "Mês para filtrar (01-12)",
  })
  @ApiQuery({ name: "year", required: false, description: "Ano para filtrar" })
  @ApiQuery({
    name: "category",
    required: false,
    description: "Categoria para filtrar",
  })
  findAll(
    @Query("month") month?: string,
    @Query("year") year?: string,
    @Query("category") category?: string
  ) {
    return this.expensesService.findAll(month, year, category);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obter uma despesa pelo ID" })
  @ApiResponse({ status: 200, description: "Retorna a despesa." })
  @ApiResponse({ status: 404, description: "Despesa não encontrada." })
  findOne(@Param("id") id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma despesa" })
  @ApiResponse({
    status: 200,
    description: "A despesa foi atualizada com sucesso.",
  })
  @ApiResponse({ status: 404, description: "Despesa não encontrada." })
  update(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Excluir uma despesa" })
  @ApiResponse({
    status: 200,
    description: "A despesa foi excluída com sucesso.",
  })
  @ApiResponse({ status: 404, description: "Despesa não encontrada." })
  remove(@Param("id") id: string) {
    return this.expensesService.remove(id);
  }
}
