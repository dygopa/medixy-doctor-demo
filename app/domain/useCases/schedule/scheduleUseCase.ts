import { ScheduleFailure } from 'domain/core/failures/schedule/scheduleFailure';
import { ScheduleRepository } from 'infrastructure/repositories/schedule/scheduleRepository';

export default class ScheduleUseCase {
  private _repository: ScheduleRepository = new ScheduleRepository();
}
