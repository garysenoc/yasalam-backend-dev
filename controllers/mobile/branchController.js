const UserOutlet = require('../../models/UserOutlet')
const Outlet = require('../../models/Outlet')
const Branch = require('../../models/Branch')
const Transaction = require('../../models/Transaction')
const catchAsync = require("../../utils/catchAsync");

//top 5 newest outlet 

  //live tracker with all outlet  
 
  const branchLiveTracker = catchAsync(async (req, res, next) => {

    const outlet = req.body.outlet

    let branch = await Branch.find({outlet:outlet})
  
    for(i in branch){
      branch[i] = {...branch[i]._doc}
    }
  
    let outletIDs = []
  
    for(let i in outlet){
        outletIDs.push(branch[i]._id)
    }
  
    let count = 0;
    const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dubai' })
  
    for(let i in outletIDs){
        count = await Visitor.count({branch:outletIDs[i],date:currentDate})
        branch[i] =  {...branch[i], totalDayVisitor:count}
    }
  
  res.status(200).json({
    status: "success",
    data: {
      branch
    },
  });
  })

  const getBranch = catchAsync(async (req, res, next) => {

    const id = req.params.id;
  
    const branch = await Branch.findById(id).select("-password")
  
    res.status(200).json({
      status: "success",
      data: {
        branch
      },
    });
  });



  const getBranchesByOutletId = catchAsync(async (req, res, next) => {

    const id = req.params.id;
  
    const branch = await Branch.find({outlet:id}).select("name address latitude longitude region")
  
    res.status(200).json({
      status: "success",
      data: {
        branch
      },
    });
  });
  




module.exports = {
    branchLiveTracker,
    getBranchesByOutletId,
    getBranch
}

