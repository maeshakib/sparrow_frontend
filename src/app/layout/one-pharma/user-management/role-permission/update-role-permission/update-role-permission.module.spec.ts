import { UpdateRolePermissionModule } from './update-role-permission.module';

describe('ChartsModule', () => {
    let chartsModule: UpdateRolePermissionModule;

    beforeEach(() => {
        chartsModule = new UpdateRolePermissionModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
