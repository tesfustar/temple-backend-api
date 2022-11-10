import Category from "../Models/Category.js";

//create Category
export const createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(201).send({ success: true, data: savedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Category for admin
export const getCategoryForAdmin = async (req, res) => {
  try {
    const categories = await Category.find().populate("subCategory");
    res.status(200).send({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Category for web
export const getCategoryForUser = async (req, res) => {
  try {
    const categories = await Category.find().populate("subCategory");
    res.status(200).send({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single Category
export const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "subCategory"
    );
    res.status(200).send({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Category

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const UpdatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({ success: true, data: UpdatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete  Category

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).send("category successfully deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
