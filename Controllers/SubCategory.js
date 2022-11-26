import Subcategory from "../Models/SubCategory.js";

//create subCategory
export const createSubCategory = async (req, res) => {
  const newSubCategory = new Subcategory(req.body);
  try {
    const savedSubCategory = await newSubCategory.save();
    res.status(201).send({ success: true, data: savedSubCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get subCategory

export const getSubCategory = async (req, res) => {
  try {
    const subCategories = await Subcategory.find();
    res.status(200).send({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for admin
export const getSubCategoryForAdmin = async (req, res) => {
  try {
    const subCategories = await Subcategory.find().populate('categoryId');
    res.status(200).send({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get single subCategory

export const getSingleSubCategory = async (req, res) => {
  try {
    const subCategory = await Subcategory.findById(req.params.id);
    res.status(200).send({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all subcategory af a category
export const getAllSubCategoryOfCategory = async (req, res) => {
  try {
    const subCategories = await Subcategory.find({categoryId:req.params.id});
    res.status(200).send({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update subCategory

export const updateSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const UpdatedCategory = await Subcategory.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({ success: true, data: UpdatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete  subCategory

export const deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Subcategory.findByIdAndDelete(id);
    res.status(200).send("subcategory successfully deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
