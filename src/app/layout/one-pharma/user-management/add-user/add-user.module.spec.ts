import { AddUserModule } from './add-user.module';

describe('ChartsModule', () => {
    let chartsModule: AddUserModule;

    beforeEach(() => {
        chartsModule = new AddUserModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
