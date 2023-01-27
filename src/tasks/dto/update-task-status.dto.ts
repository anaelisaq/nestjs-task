/* eslint-disable prettier/prettier */
//validar o status
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
