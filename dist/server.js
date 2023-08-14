"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.grizk.mongodb.net/?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const run = async () => {
    try {
        const db = client.db("book-catalog");
        const productCollection = db.collection("books");
        // app.get("/products", async (req: Request, res: Response) => {
        //   const cursor = productCollection.find({});
        //   const product = await cursor.toArray();
        //   res.send({ status: true, data: product });
        // });
        // app.post("/product", async (req: Request, res: Response) => {
        //   const product = req.body;
        //   const result = await productCollection.insertOne(product);
        //   res.send(result);
        // });
        // app.get("/product/:id", async (req: Request, res: Response) => {
        //   const id = req.params.id;
        //   const result = await productCollection.findOne({ _id: ObjectId(id) });
        //   console.log(result);
        //   res.send(result);
        // });
        // app.delete("/product/:id", async (req: Request, res: Response) => {
        //   const id = req.params.id;
        //   const result = await productCollection.deleteOne({ _id: ObjectId(id) });
        //   console.log(result);
        //   res.send(result);
        // });
        // app.post("/comment/:id", async (req: Request, res: Response) => {
        //   const productId = req.params.id;
        //   const comment = req.body.comment;
        //   console.log(productId);
        //   console.log(comment);
        //   const result = await productCollection.updateOne(
        //     { _id: ObjectId(productId) },
        //     { $push: { comments: comment } }
        //   );
        //   console.log(result);
        //   if (result.modifiedCount !== 1) {
        //     console.error("Product not found or comment not added");
        //     res.json({ error: "Product not found or comment not added" });
        //     return;
        //   }
        //   console.log("Comment added successfully");
        //   res.json({ message: "Comment added successfully" });
        // });
        // app.get("/comment/:id", async (req: Request, res: Response) => {
        //   const productId = req.params.id;
        //   const result = await productCollection.findOne(
        //     { _id: ObjectId(productId) },
        //     { projection: { _id: 0, comments: 1 } }
        //   );
        //   if (result) {
        //     res.json(result);
        //   } else {
        //     res.status(404).json({ error: "Product not found" });
        //   }
        // });
        // app.post("/user", async (req: Request, res: Response) => {
        //   const user = req.body;
        //   const result = await userCollection.insertOne(user);
        //   res.send(result);
        // });
        // app.get("/user/:email", async (req: Request, res: Response) => {
        //   const email = req.params.email;
        //   const result = await userCollection.findOne({ email });
        //   if (result?.email) {
        //     return res.send({ status: true, data: result });
        //   }
        //   res.send({ status: false });
        // });
    }
    finally {
    }
};
run().catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
