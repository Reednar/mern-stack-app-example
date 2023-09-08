const ExampleModel = require("../models/exampleModel");

const getAllExample = async (req, res) => {
  try {
    const examples = await ExampleModel.find();
    res.status(200).json(examples);
    console.log("[GET] -> get all examples -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[GET] -> get all examples -> error -> \n", error.message)
  }
};

const getOneExample = async (req, res) => {
  try {
    const example = await ExampleModel.findById(req.params.id);
    res.status(200).json(example);
    console.log("[GET] -> get one example -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[GET] -> get one example -> error -> \n", error.message)
  }
};

const createExample = async (req, res) => {
  try {
    const example = new ExampleModel(req.body);
    const savedExample = await example.save();
    res.status(201).json(savedExample);
    console.log("[POST] -> create one example -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[POST] -> create one example -> error -> \n", error.message)
  }
};

const updateExample = async (req, res) => {
  try {
    const updatedExample = await ExampleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedExample);
    console.log("[PUT] -> update one example -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[PUT] -> update one example -> error -> \n", error.message)
  }
};

const deleteExample = async (req, res) => {
  try {
    const deletedExample = await ExampleModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedExample);
    console.log("[DELETE] -> delete one example -> success")
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("[DELETE] -> delete one example -> error -> \n", error.message)
  }
};

module.exports = {
  getAllExample,
  getOneExample,
  createExample,
  updateExample,
  deleteExample,
};
