const express = require("express");
const router = express();
const authController = require("../controllers/authController");

//importing category model
const categoryControllers = require("../controllers/categoryController");

/**
 * @swagger
 * components:
 *  schemas:
 *   category:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      example: "Fashion"
 *      required: true
 *      description: "Category for item "
 *     icon:
 *      type: file
 *      example: ""
 *     color:
 *      type: string
 *     image:
 *      type: file
 */

/**
 * @swagger
 * /category:
 *  get:
 *   tags:
 *    - Category
 *   summary: "For Getting all list of category "
 *   description: Get all the category  listed
 *   responses:
 *    200:
 *     description: "List of all category "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/category"
 *    400:
 *     description: "Error creating user "
 *
 *
 */

//initializing route
router.get("/", categoryControllers.getCategory);

/**
 * @swagger
 * /category:
 *  post:
 *   tags:
 *    - Category
 *   summary: "Forposting new Category  "
 *   description: Post the new Category required name and image
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *        schema:
 *         type: object
 *         properties:
 *           name:
 *            type: string
 *            required: true
 *           image:
 *            type: file
 *            required: true
 *         example:
 *          name: "Fashion"
 *          image:
 *   responses:
 *    200:
 *     description: "List of all category "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/category"
 *     400:
 *    description: "Error creating user "
 *
 *
 */
router.post(
  "/",
  categoryControllers.uploadOptions.single("image"),
  categoryControllers.postCategory
);

/**
 * @swagger
 * /category/{id}:
 *  put:
 *   tags:
 *    - Category
 *   summary: "To update the category   "
 *   description: user can update the category need to provide the name and image
 *   parameters:
 *   - name: id
 *     in: path
 *     description: Enter the specific category id in parameter to access
 *     required: true
 *     schema:
 *      type: string
 *      example: 2345ei
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *        schema:
 *         type: object
 *         properties:
 *           name:
 *            type: string
 *            required: true
 *           image:
 *            type: file
 *            required: true
 *         example:
 *          name: "Fashion"
 *          image:
 *   responses:
 *    202:
 *     description: "category updated "
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: "#/components/schemas/category"
 *     400:
 *      description: "Error updating user  "
 *
 *
 */
router.put(
  "/:id",
  categoryControllers.uploadOptions.single("image"),
  categoryControllers.updateCategory
);

/**
 * @swagger
 * /category/{id}:
 *  delete:
 *   tags:
 *    - Category
 *   summary: "For Deleting the Selected Category  "
 *   description: Deleting Selected Category
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Entet the category id in parameter to delete the selected Category
 *      required: true
 *      schema:
 *       type: string
 *       example : "2343_2345r34wef23_34"
 *   responses:
 *    200:
 *     description: "Category of selected id Deleted  "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/category"
 *    400:
 *     description: "Error occured"
 *
 *
 */
router.delete("/:id", categoryControllers.deleteCategory);

/**
 * @swagger
 * /category/{id}:
 *  get:
 *   tags:
 *    - Category
 *   summary: "For Getting all list of category "
 *   description: Get all the category  listed
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Entet the category id in parameter to get only category of selected id
 *      required: true
 *      schema:
 *       type: string
 *       example : "2343_2345r34wef23_34"
 *   responses:
 *    200:
 *     description: "List of selected Category  "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/category"
 *    400:
 *     description: "Error Occured"
 *
 *
 */
router.get("/:id", categoryControllers.getCategoryById);

module.exports = router;
