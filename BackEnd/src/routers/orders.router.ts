import { Router } from "express";
import { sample_orders} from '../data';
import expressAsyncHandler from 'express-async-handler';
import auth from '../middlewares/auth'
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();

router.get("/seed", expressAsyncHandler(
    async (req,res) => {
    const supplierCount = await OrderModel.countDocuments();
    if(supplierCount > 0){
        res.send("Seed is already done!");
        return;
    }
    await OrderModel.create(sample_orders);
    res.send("Seed is done");
}));

// todo: add auth
router.get("/:email", expressAsyncHandler(
    async (req, res) =>{
        const orders = await OrderModel.find({user: req.params.email});
        res.send(orders)
    }
));

router.post("/:email", expressAsyncHandler(
    async (req, res) =>{
        const order = req.body;
        await OrderModel.insertMany(order);
    }
));

router.get("/viewOrder/:id", expressAsyncHandler(
    async (req, res) =>{
        const order = await OrderModel.findById(req.params.id);
        res.send(order)
    }
));

export default router;
