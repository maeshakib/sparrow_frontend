import { AddRolePermissionModule } from './add-role-permission.module';

describe('ChartsModule', () => {
    let chartsModule: AddRolePermissionModule;

    beforeEach(() => {
        chartsModule = new AddRolePermissionModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
