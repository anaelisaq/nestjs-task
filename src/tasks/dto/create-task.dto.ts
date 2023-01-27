/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

//encapsular dados para facilitar a manutenção/update do código