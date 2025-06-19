import User from "./user.model.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export const service = (req, res) => {
  res.send("This is User Service");
}

export const create = async (req, res) => {
  const { name, password } = req.body;
  console.log(name, password);
  console.log(req.body);

  if (!name || !password) {
    return res.status(400).send('Name and Password are required');
  }

  try{
    const user = new User({ name, password });
    await user.save();
    res.status(200).send(user);
  }
  catch(err){
    res.status(400).send(err);
  }

}

export const findAll = async (req, res) => {
  try{
    const unfilteredUsers = await User.find();
    const users = unfilteredUsers.map((unfiltereduser) => {
      const { password, ...user } = unfiltereduser._doc;
      return user;
    });
    res.status(200).send(users);
  }
  catch(err){
    res.status(400).send(err);
  }
}


export const deleteOne = async (req, res) => {
  const { id } = req.params;
  try{
    const user = await User.findByIdAndDelete(id);
    if(user){
      res.status(200).send(user);
    }
    else{
      res.status(404).send("No such user found");
    }
  }
  catch(err){
    res.status(400).send(err);
  }
}

export const logIn = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send('Name and Password are required');
  }

  try {
    const unfiltereduser = await User.findOne({ name, password });
    if (unfiltereduser) {
      const { password, ...user } = unfiltereduser._doc;
      const token = sign(user, process.env.JWT_SECRET);
      res.status(200).send({ token });
    } else {
      res.status(404).send("User not found"); 
    }
  } catch (err) {
    res.status(400).send(err);
  }
}
