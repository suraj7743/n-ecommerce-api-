const express = require("express");
const router = express();
const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");

/**
 * @swagger
 * components:
 *  schemas:
 *   cart:
 *    type: object
 *    properties:
 *     user:
 *      type: string
 *      example: "1242_234Uhiu3_235"
 *      required: true
 *      description: "Specific user to get the cart product "
 *     product:
 *      type: string
 *      example: "ps4"
 *     quantity:
 *      type: number
 *
 */

/**
 * @swagger
 * /cart:
 *  get:
 *   security:
 *    - Bearer: []
 *   tags:
 *    - Cart
 *   summary: "For Getting list of cart items "
 *   description: Get all cart items listed for specific user
 *   responses:
 *    200:
 *     description: "List Cart items "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/cart"
 *    400:
 *     description: "Error fetching cart item "
 *
 *
 */

router.get("/", authController.protectMiddleware, cartController.getAllCart);

/**
 * @swagger
 * /cart:
 *  post:
 *   security:
 *     - Bearer: []
 *   tags:
 *    - Cart
 *   summary: "Forposting product in the cart  "
 *   description: Post the new product in the cart
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        product:
 *         type: string
 *         required: true
 *        quantity:
 *         type: number
 *         required: true
 *       example:
 *        product: 23423_2342jni2_324
 *        quantity: 4
 *   responses:
 *    200:
 *     description: "Post the product to the cart  "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/category"
 *     400:
 *    description: "Error posting to the cart  "
 *
 *
 */
router.post("/", authController.protectMiddleware, cartController.postCart);
router.put("/:id", authController.protectMiddleware, cartController.updateCart);
router.delete(
  "/:id",
  authController.protectMiddleware,
  cartController.deleteCart
);
router.get(
  "/:id",
  authController.protectMiddleware,
  cartController.getCartWithId
);
