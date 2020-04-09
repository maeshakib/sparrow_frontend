import { RolePermissionModule } from './role-permission.module';

describe('ChartsModule', () => {
    let roleModule: RolePermissionModule;

    beforeEach(() => {
        roleModule = new RolePermissionModule();
    });

    it('should create an instance', () => {
        expect(roleModule).toBeTruthy();
    });
});
