// import npm packages
const express = require('express');

// import project files
const userControllers = require('../controllers/user.controller');
const { jwtauthentication } = require('../middleware/middleware');

const routes = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      login:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: test@testmail.com
 *              password: rajib123
 *      changePass:
 *          type: object
 *          required:
 *              - email
 *              - password
 *              - newPassword
 *          example:
 *              email: test@testmail.com
 *              password: test123
 *              newPassword: test1234
*/

/**
 * @swagger
 * /user/adminLogin:
 *  post:
 *      summary: login for user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/login'
 *      responses:
 *          200:
 *              description: login successfull!
 *          400:
 *              description: invalid email/password
 */
routes.post('/adminLogin', userControllers.adminLogin);

/**
 * @swagger
 * /user/changePassword:
 *  put:
 *      summary: change password for admin.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/changePass'
 *      responses:
 *          200:
 *              description: password changed!
 *          400:
 *              description: invalid email/password
 */

routes.put('/changePassword',jwtauthentication, userControllers.changePassword);

module.exports = routes;