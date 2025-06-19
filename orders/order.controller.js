import mongoose from "mongoose";
import Order from "./order.model.js";
import axios from "axios";

const bookUrl = process.env.BOOK_URL || "http://book:3000/book/";
const customerUrl =
  process.env.CUSTOMER_URL || "http://customer:4000/customer/";


export const service = (req, res) => {
  mongoose.Types
  res.send("This is Orders Service");
}

export const create = async (req, res) => {
  const { customerId, bookId } = req.body;

  if (!customerId || !bookId) {
    return res.status(400).send('CustomerID and BookID are required');
  }
  const initialDate = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(new Date().getDate() + 7);

  try {
    const order = new Order({
      customerId: customerId,
      bookId: bookId,
      initialDate: initialDate,
      deliveryDate: deliveryDate,
    });
    await order.save();
    res.status(200).send(order);
  }
  catch (err) {
    res.status(400).send(err);
  }

}

export const findAll = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  }
  catch (err) {
    res.status(400).send(err);
  }
}

export const findOne = async (req, res) => {
  const { id } = req.params;

  Order.findById(id)
    .then(async (order) => {
      if (order) {
        const orderObj = {
          ...order._doc,
          customerName: "",
          bookTitle: "",
        };
        await axios
          .get(`${customerUrl}${order.customerId}`)
          .then((response) => {
            orderObj.customerName = response.data.name;
          }).catch((err) => {
            res.send("Invalid customer id");
          });
        await axios
          .get(`${bookUrl}${order.bookId}`)
          .then((response) => {
            orderObj.bookTitle = response.data.title;
          }).catch((err) => {
            res.send("Invalid book id");
          })
          .catch((err) => {
            res.status(400).send(err);
          });
        res.status(200).send(orderObj);
      }
      else {
        res.status(404).send("No such order found");
      }
    })
}
export const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (order) {
      res.status(200).send(order);
    }
    else {
      res.status(404).send("No such order found");
    }
  }
  catch (err) {
    res.status(400).send(err);
  }
}

