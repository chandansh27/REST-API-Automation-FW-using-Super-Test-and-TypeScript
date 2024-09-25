import AdminController from "../controller/admin.controller";
import CategoriesController from "../controller/Categories.controller";
import Config from "../config/base.config";

const categoriesController = new CategoriesController();
const adminController = new AdminController();

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
            const data = {"email": Config.email,"password": Config.password}
            const res = await adminController.postAdminLogin(data);
            token = res.body.token;

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
        let token, postRes;

        beforeAll(async () => {
            const data = {"email": Config.email,"password": Config.password}
            const res = await adminController.postAdminLogin(data);
            token = res.body.token;

            const body = {"name": "Test Category " + Math.floor(Math.random() * 10000)}
            postRes = await categoriesController.postCategories(body)
            .set("Authorization", "Bearer " + token)

        })

        it('PUT /categories/id', async () => {
            const body = {"name": "Test Category Updated " + Math.floor(Math.random() * 10000)}
            const res = await categoriesController.putCategories(postRes.body._id, body )
            .set("Authorization", "Bearer " + token)
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(body.name);
            
        });
    });

    describe('Delete Categories', () => {
        let token, categoryId;

        beforeAll(async () => {
            const body = {"email": Config.email,"password": Config.password}
            const res = await adminController.postAdminLogin(body);
            token = res.body.token;

            const postBody = {"name": "Test Category " + Math.floor(Math.random() * 10000)}
            const postRes = await categoriesController.postCategories(postBody)
            .set("Authorization", "Bearer " + token);
            categoryId = postRes.body._id;
           
        });

        it('Delete /categories', async () => {
            const res = await categoriesController.deleteCategories(categoryId)
            .set('Authorization', 'Bearer ' + token);

            expect(res.statusCode).toEqual(200);
        });
    });
});