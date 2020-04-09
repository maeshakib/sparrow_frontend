import { NotificationMessageModule } from './notification-message.module';

describe('NotificationMessageModule', () => {
  let notificationMessageModule: NotificationMessageModule;

  beforeEach(() => {
    notificationMessageModule = new NotificationMessageModule();
  });

  it('should create an instance', () => {
    expect(notificationMessageModule).toBeTruthy();
  });
});
