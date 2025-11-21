import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import { IOrderActivity } from '../activities/order.activity';
import { IPaymentClientActivity } from '../activities/payment-client.activity';
import { Compensation } from '../types/temporal.type';

const { createOrderInDb, rollbackCreateOrderInDb } =
  proxyActivities<IOrderActivity>({
    startToCloseTimeout: '1 minute',
  });
const { withdrawPayment } = proxyActivities<IPaymentClientActivity>({
  startToCloseTimeout: '1 minute',
});

export async function createOrderWorkflow(
  customArgument: string,
): Promise<void> {
  const compensations: Compensation[] = [];

  console.log('customArgument', customArgument);

  try {
    const result = await createOrderInDb();
    compensations.push({
      callback: () => rollbackCreateOrderInDb(result.orderId),
      name: 'rollbackCreateOrderInDb',
    });

    await withdrawPayment();
    compensations.push(); //rollback
    // ... rest
  } catch (error) {}
}
