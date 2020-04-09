import { UserManagementModule } from './user-management.module';

describe('ChartsModule', () => {
    let chartsModule: UserManagementModule;

    beforeEach(() => {
        chartsModule = new UserManagementModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
