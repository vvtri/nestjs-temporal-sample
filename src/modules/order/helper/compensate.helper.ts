import { Compensation } from '../types/temporal.type';

export async function compensate(compensations: Compensation[]) {
  let compensation: Compensation;
  while ((compensation = compensations.pop())) {
    console.log(`Starting rollback for ${compensation.name}`);
    await compensation.callback();
  }
}
