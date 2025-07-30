"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("./../src/app.module");
describe('AppController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();
    });
    it('/api (GET)', () => {
        return request(app.getHttpServer())
            .get('/api')
            .expect(200)
            .expect('Welcome to CoreCrew API! 🚀');
    });
    it('/api/health (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/health')
            .expect(200)
            .expect((res) => {
            expect(res.body).toHaveProperty('status', 'ok');
            expect(res.body).toHaveProperty('message', 'CoreCrew API is running');
            expect(res.body).toHaveProperty('timestamp');
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=app.e2e-spec.js.map