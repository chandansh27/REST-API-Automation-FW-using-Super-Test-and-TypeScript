import AdminController from "../controller/admin.controller";
import CategoriesController from "../controller/Categories.controller";

const adminController = new AdminController();
const categoriesController = new CategoriesController();

export const login = async (email: string, password: string) => {
    const body = {"email": email,"password": password}
    const res = await adminController.postAdminLogin(body);
    return res.body.token;
}

export const getCategoriyId =  async (token: string) => {
    const body = { "name": "Test Category " + Math.floor(Math.random() * 10000)}
    const res = await categoriesController.postCategories(body)
    .set("Authorization", "Bearer " + token);
    return res.body._id;

}
