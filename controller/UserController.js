const Note = require("../models/Note");
const createError = require("http-errors");
module.exports = {
  Usertask: async (req, res, next) => {
    
    const search = req.query.Assignedtask
   
    try {
      console.log("search",search)
      
      let result;     
      
      if (search !== "undefined" && search !== "") {
        result = await Note.find({ Assigne:search})
      }
   
        
         if (!result) throw createErrror(404, "task not exits");
         
         res.status(200).send(result)

    } catch (error) {
      next(error);
    }
  },
}
