import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';

@Injectable()
@Activities()
export class PaymentClientActivity {
  constructor() {}

  @Activity()
  async withdrawPayment(): Promise<{ recordId: number }> {
    // network calling
    return { recordId: 1 };
  }
}

export type IPaymentClientActivity = {
  withdrawPayment(): Promise<{ recordId: number }>;
};
