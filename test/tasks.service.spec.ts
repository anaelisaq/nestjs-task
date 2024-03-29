/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from '../src/tasks/tasks-status.enum';
import { TasksRepository } from '../src/tasks/tasks.repository';
import { TasksService } from '../src/tasks/tasks.service';

const mockTasksRepository = () => ({
 getTasks: jest.fn(),
 findOne: jest.fn(),
});

const mockUser = {
    username: 'Joe Doe',
    id: 'someId',
    password: 'somePassword',
    tasks: [],
};

const mockTask = {
    title: 'test title',
    description: 'test desc',
    id: 'someId',
    status: TaskStatus.OPEN,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        providers: [
            TasksService,
            { provide: TasksRepository, useFactory: mockTasksRepository },
        ],
    }).compile();

    tasksService = await module.get(TasksService);
    tasksRepository = await module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
        tasksRepository.getTasks.mockResolvedValue('someValue');
        const result = await tasksService.getTasks(null, mockUser);;
        expect(result).toEqual('someValue');
    });
  });

  describe('getTasksById', ()=> {
    it('calls TasksRepository.findOne and returns the result', async () => {
        tasksRepository.findOne.mockResolvedValue(mockTask);
        const result = await tasksService.getTaskById('someId', mockUser);
        expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
        tasksRepository.findOne.mockResolvedValue(null);
        expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});
