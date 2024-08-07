import { Test, TestingModule } from '@nestjs/testing';
import { SubmitController } from './submit.controller';
import { SubmitService } from './submit.service';
import { SubmitDto } from './submit.dto';

describe('SubmitController', () => {
  let controller: SubmitController;
  let service: SubmitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitController],
      providers: [
        {
          provide: SubmitService,
          useValue: {
            validateSubmission: jest.fn().mockReturnValue({
              title: 'Success',
              message: 'Your request request has been received.',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<SubmitController>(SubmitController);
    service = module.get<SubmitService>(SubmitService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call validateSubmission on service and return result', () => {
    const payload: SubmitDto = {
      username: 'charlie.brown',
      request: 'Chocolate',
    };
    const result = controller.submit(payload);
    expect(service.validateSubmission).toHaveBeenCalledWith(payload);
    expect(result).toEqual({
      title: 'Success',
      message: 'Your request request has been received.',
    });
  });
});
