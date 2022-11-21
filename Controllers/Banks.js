import Banks from "../Models/Banks.js";

//create Bank
export const createBanks = async (req, res) => {
  const newBank = new Banks(req.body);
  try {
    const savedBank = await newBank.save();
    res.status(201).send({ success: true, data: savedBank });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get banks for admin
export const getBanksForAdmin = async (req, res) => {
  try {
    const banks = await Banks.find()
    res.status(200).send({ success: true, data: banks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get banks for web
export const getBanksForUser = async (req, res) => {
  try {
    const banks = await Banks.find()
    res.status(200).send({ success: true, data: banks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// //get single Category
// export const getSingleCategory = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id).populate(
//       "subCategory"
//     );
//     res.status(200).send({ success: true, data: category });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //update Category

// export const updateCategory = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const UpdatedCategory = await Category.findByIdAndUpdate(
//       id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).send({ success: true, data: UpdatedCategory });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //delete  Category

// export const deleteCategory = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Category.findByIdAndDelete(id);
//     res.status(200).send("category successfully deleted");
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
