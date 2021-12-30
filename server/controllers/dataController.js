const Datamodel = require("../models/dataModel");

exports.getData = async (req, res) => {
  try {
    const fvdata = await Datamodel.find().sort({
      day: 1,
    });

    res.status(200).json({
      status: "success",
      data: {
        fvdata,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getSelectedData = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const fvdata = await Datamodel.find({
      day: { $gte: new Date(startDate), $lt: new Date(endDate) },
    });

    res.status(200).json({
      status: "success",
      data: {
        fvdata,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getSelectedSum = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.params;
    // const {  } = req.body;
    let fvdata;
    if (type === "fruits") {
      fvdata = await Datamodel.find({
        day: { $gte: new Date(startDate), $lt: new Date(endDate) },
      }).select("-vegetables");
    } else if (type === "vegetables") {
      fvdata = await Datamodel.find({
        day: { $gte: new Date(startDate), $lt: new Date(endDate) },
      }).select("-fruits");
    }

    res.status(200).json({
      status: "success",
      message: "Succeeded",
      data: {
        fvdata,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Bad request",
    });
  }
};

exports.createData = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This works",
  });
};
