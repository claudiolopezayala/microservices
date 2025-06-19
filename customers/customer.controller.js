import Customer from "./customer.model.js";

export const service = (req, res) => {
  res.send("This is Customer Service");
}

export const create = async (req, res) => {
  const { name, age, address } = req.body;
  console.log(name, age, address);
  console.log(req.body);

  if (!name || !age || !address) {
    return res.status(400).send('Name, Age, and Address are required');
  }

  try{
    const book = new Customer({ name, age, address });
    await book.save();
    res.status(200).send(book);
  }
  catch(err){
    res.status(400).send(err);
  }

}

export const findAll = async (req, res) => {
  try{
    const customers = await Customer.find();
    res.status(200).send(customers);
  }
  catch(err){
    res.status(400).send(err);
  }
}

export const findOne = async (req, res) => {
  const { id } = req.params;
  try{
    const customer = await Customer.findById(id);
    if(customer){
      res.status(200).send(customer);
    }
    else{
      res.status(404).send("No such customer found");
    }
  }
  catch(err){
    res.status(400).send(err);
  }
}

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  try{
    const customer = await Customer.findByIdAndDelete(id);
    if(customer){
      res.status(200).send(customer);
    }
    else{
      res.status(404).send("No such customer found");
    }
  }
  catch(err){
    res.status(400).send(err);
  }
}

