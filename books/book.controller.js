import Book from "./book.model.js";

export const service = (req, res) => {
    res.send("This is books service");
}

export const create = async (req, res) => {
    const { title, author, numberPages, publisher } = req.body;
    console.log(title, author, numberPages, publisher);
    console.log(req.body);

    if(!title || !author || !numberPages || !publisher) {
        return res.status(400).send('Title, Author, NumberPages, and publisher are required');
    }

    try{
        const book = new Book({ title, author, numberPages, publisher });
        await book.save();
        res.status(200).send(book);
    }
    catch(err){
        res.status(400).send(err);
    }
}

export const findAll = async (req, res) => {
    try{
        const books = await Book.find();
        res.status(200).send(books);
    }
    catch(err){
        res.status(400).send(err);
    }
}

export const findOne = async (req, res) => {
    const { id } = req.params;

    try{
        const book = await Book.findById(id);
        if(book){
            res.status(200).send(book);
        }
        else{
            res.status(404).send("No such book found");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
}

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    try{
        const book = await Book.findByIdAndDelete(id);
        if(book){
            res.status(200).send(book);
        }
        else{
            res.status(404).send("No such book found");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
}

