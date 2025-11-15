import ProductModel from "../Models/products.model.js";

export const getAllProducts = async (req, res, next) => {
  try {
    let currPage = +req.query.currPage;
    let limit = +req.query.limit;
    let skip = (currPage - 1) * limit;
    // serach
    let search = req.query.search;
    // filter
    // console.log(req.query, currPage, limit, skip);

    let brand = req.query.brand;
    let price = +req.query.price;
    let rating = +req.query.rating;
    let sortBy = req.query.sortBy;
    let sortDir = req.query.sortDir === "asc" ? 1 : -1;

    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }
    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (price) filter.price = { $lte: price };
    if (rating) filter.rating = { $lte: rating };

    console.log(filter);

    const products = await ProductModel.find(filter)
      .sort({ [sortBy]: sortDir })
      .skip(skip)
      .limit(limit);
    const totalDocs = await ProductModel.countDocuments(filter);

    res.status(200).json({
      success: true,
      msg: "Products fetched successfully!",
      currentPageContains: products.length,
      totalDocs,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
