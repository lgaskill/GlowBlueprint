const express = require("express");

const auth = require("../services/auth");

const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const imageRoutes = require("./imageRoutes");
const configRoutes = require("./configRoutes");
const healthHistoryRoutes = require("./healthHistoryRoutes");
const emailRoutes = require("./emailRoutes");
const paypalRoutes = require("./paypalRoutes");

const router = express.Router();

router.all("/#/*", auth.optional, (req, res) => {
  // Send the transpiled angular page for any routes under the hash
  res.sendFile("dist/index.html", { root: __dirname });
});

//
// User
//
router.get("/users", auth.required, auth.admin, userRoutes.getAll);
router.post("/authenticate", auth.optional, userRoutes.authenticate);
router.get("/user", auth.required, userRoutes.getByToken);
router.post("/user", auth.optional, userRoutes.create);
router.patch("/user", auth.required, userRoutes.updateByToken);

//
// Blog
//
router.get("/blog_post", auth.optional, blogRoutes.getAll);
router.get("/blog_post/categories", auth.optional, blogRoutes.getCategories);
router.get("/blog_post/:id", auth.optional, blogRoutes.get);
router.post("/blog_post", auth.required, auth.admin, blogRoutes.create);
router.patch("/blog_post/:id", auth.required, auth.admin, blogRoutes.update);

//
// Images
//
router.get("/image/:id", auth.optional, imageRoutes.get);
router.post("/image", auth.optional, auth.admin, imageRoutes.create);
router.delete("/image/:id", auth.optional, auth.admin, imageRoutes.delete);

//
// Config
//
router.get("/config", auth.optional, configRoutes.get);
router.post("/config", auth.required, auth.admin, configRoutes.create);
router.patch("/config/:id", auth.required, auth.admin, configRoutes.update);

//
// Health History
//
router.get(
  "/health-history/:id",
  auth.required,
  auth.admin,
  healthHistoryRoutes.getByUserId
);
router.get("/health-history", auth.required, healthHistoryRoutes.getByToken);
router.post("/health-history", auth.required, healthHistoryRoutes.create);
router.patch(
  "/health-history/:id",
  auth.required,
  auth.admin,
  healthHistoryRoutes.updateById
);
router.patch(
  "/health-history",
  auth.required,
  healthHistoryRoutes.updateByToken
);
router.get(
  "/health-histories",
  auth.required,
  auth.admin,
  healthHistoryRoutes.getAll
);

//
// Email
//
router.post("/subscribe_mc/:id", auth.optional, emailRoutes.mc_subscribe);
router.post("/add_tag_mc", auth.optional, emailRoutes.mc_tag);

//
// PayPal
//
router.post("/pay", auth.required, paypalRoutes.pay);
router.post("/execute-payment", auth.required, paypalRoutes.execute);
router.post(
  "/merch_item",
  auth.required,
  auth.admin,
  paypalRoutes.createMerchItem
);

//
// Misc
//
router.get("/test", auth.optional, (req, res) => {
  res.status(200).send("Alive");
});
router.all("*", auth.optional, (req, res) => {
  res.status(404).send("LOL, wut");
});

module.exports = router;
