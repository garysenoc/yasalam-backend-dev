const UserOutlet = require('./../../models/UserOutlet')
const Outlet = require('./../../models/Outlet')
const Transaction = require('./../../models/Transaction')
const catchAsync = require("../../utils/catchAsync");

//top 5 newest outlet 
const topNewestOutlet = async (req, res) => {
    try {
      const outlet = await Outlet.find().populate('category').sort({ _id: -1 }).limit(5)
  
      res.status(200).json({
        status: "success",
        results: outlet.length,
        data: {
          outlet,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  //live tracker with all outlet  
 
const outletLiveTracker= catchAsync(async (req, res, next) => {
  var populateQuery = [{path:'category', select:'name'}, {path:'feature', select:'name'}];

  let outlet = await Outlet.find().select("-password").populate(populateQuery)

  for(i in outlet){
    outlet[i] = {...outlet[i]._doc}
  }

  let outletIDs = []

  for(let i in outlet){
      outletIDs.push(outlet[i]._id)
  }

  let count = 0;
  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })

  for(let i in outletIDs){
      count = await Transaction.count({outlet:outletIDs[i],date:currentDate})
      outlet[i] =  {...outlet[i], totalDayVisitor:count}
  }

  res.status(200).json({
    status: "success",
    data: {
    outlet
    },
  });
})



const outletSingleLiveTracker= catchAsync(async (req, res, next) => {
  var populateQuery = [{path:'category', select:'name'}, {path:'feature', select:'name'}];

  let outlet = await Outlet.findById(req.params.id).select("-password").populate(populateQuery)

  
  let count = 0;
  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })

  
  count = await Transaction.count({outlet:outlet._id,date:currentDate})
  outlet=  {...outlet._doc, totalDayVisitor:count}
  

  res.status(200).json({
    status: "success",
    data: {
    outlet,
    },
  });
})

//get all experience 
const getOutletExperience= catchAsync(async (req, res, next) => {

  let outlet = await Outlet.find({havePromo:true}).populate("category")

  for(i in outlet){
    outlet[i] = {...outlet[i]._doc}
  }

  let outletIDs = []

  for(let i in outlet){
      outletIDs.push(outlet[i]._id)
  }

  let count = 0;
  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })

  for(let i in outletIDs){
      count = await Transaction.count({outlet:outletIDs[i],date:currentDate})
      outlet[i] =  {...outlet[i], totalDayVisitor:count}
  }

res.status(200).json({
  status: "success",
  data: {
   outlet
  },
});
})

//get outlet by category
const getOutletByCategory = async (req, res) => {
  try {
    const cat_id = req.params.id
    const outlet = await Outlet.find({category:cat_id}).select("-password").populate("category", "name").sort({ _id: -1 }).limit(5)

    res.status(200).json({
      status: "success",
      results: outlet.length,
      data: {
        outlet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};








const test = (req, res) => {
	res.send('mobile testing route')
}




module.exports = {
    test,
    outletLiveTracker,
    outletSingleLiveTracker,
    topNewestOutlet,
    getOutletExperience,
    getOutletByCategory
}

