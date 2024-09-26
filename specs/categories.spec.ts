import CategoriesController from "../controller/Categories.controller";
import Config from "../config/base.config";
import { getCategoriyId, login } from "../utils/helper";

const categoriesController = new CategoriesController();

describe('Categories', () => {

    it('Get/ categories', async () => {
        const res = await categoriesController.getCategories();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(1);
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
    });

    describe('Create Categories', () => {
        let token;

        beforeAll(async () => {
         token =  await login(Config.email, Config.password);

        })
        
        it('POST /categories', async () => {
            const body = {"name": "Test Category " + Math.floor(Math.random() * 10000)}
            const res = await categoriesController.postCategories(body)
            .set("Authorization", "Bearer " + token)
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(body.name);
        });
    });

    describe('Update Categories', () => {
        let token, categoryId;

        beforeAll(async () => {
            token =  await login(Config.email, Config.password);
            categoryId = await getCategoriyId(token); 

        })

        it('PUT /categories/id', async () => {
            const body = {"name": "Test Category Updated " + Math.floor(Math.random() * 10000)}
            const res = await categoriesController.putCategories(categoryId, body )
            .set("Authorization", "Bearer " + token)
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(body.name);
            
        });
    });

    describe('Delete Categories', () => {
        let token, categoryId;

        beforeAll(async () => {
            token =  await login(Config.email, Config.password);
            categoryId = await getCategoriyId(token);
           
        });

        it('Delete /categories', async () => {
            const res = await categoriesController.deleteCategories(categoryId)
            .set('Authorization', 'Bearer ' + token);

            expect(res.statusCode).toEqual(200);
        });
    });
});