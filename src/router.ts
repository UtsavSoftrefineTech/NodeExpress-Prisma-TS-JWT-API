import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import {
  getUpdatePoint,
  getUpdatePoints,
  createUpdatePoint,
  updateUpdatePoint,
  deleteUpdatePoint,
} from "./handlers/updatepoint";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */

router.get("/updatepoint", getUpdatePoints);
router.get("/updatepoint/:id", getUpdatePoint);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  updateUpdatePoint
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  createUpdatePoint
);
router.delete("/updatepoint/:id", deleteUpdatePoint);

export default router;
