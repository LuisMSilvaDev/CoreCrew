"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
describe('AppController', () => {
    let appController;
    beforeEach(async () => {
        const app = await testing_1.Test.createTestingModule({
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        }).compile();
        appController = app.get(app_controller_1.AppController);
    });
    describe('root', () => {
        it('should return "Welcome to CoreCrew API! 🚀"', () => {
            expect(appController.getHello()).toBe('Welcome to CoreCrew API! 🚀');
        });
    });
    describe('health', () => {
        it('should return health status', () => {
            const result = appController.getHealth();
            expect(result).toHaveProperty('status', 'ok');
            expect(result).toHaveProperty('message', 'CoreCrew API is running');
            expect(result).toHaveProperty('timestamp');
        });
    });
});
//# sourceMappingURL=app.controller.spec.js.map