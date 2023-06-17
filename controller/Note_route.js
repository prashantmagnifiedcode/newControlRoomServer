const Note = require("../models/Note");
const createError = require("http-errors");

module.exports = {
    Notes: async (req, res, next) => {
        const{RegisterName,Description,CreatedAt,LastUpdate,Assigne,
          Tag}=req.body
        try {
          console.log("created resgiter")
          const ress= new Note({RegisterName,Description,CreatedAt,LastUpdate,Assigne,
          Tag})
          const done= await ress.save()
         
          if (!done) throw createError(404, "Product not exits");
          res.status(200).json({done:"done"});
        
        } catch (error) {
          console.log(error)
        }
      },
    FetchNotes: async (req, res, next) => {
       
        try {
            const ress= await Note.find()
            res.send({ress})

        } catch (error) {
          console.log(error)
        }
      },
    Addnotes: async (req, res, next) => {
       
        try {
          const{_id,notes,register_name}=req.body
        const note= await Note.updateOne({ _id },{ $push:{
          SubRegister:{
            $each:[
             {NoteName:register_name , Data:notes},
            ]
          }
        }});
        if(!note) throw createError(404, "Product not exits")
        res.status(200).json({done:"done"});
        } catch (error) {

          console.log(error)
          
        }
      },
    updatenotes: async (req, res, next) => {
        try {
          const{content,id,sub_id,LastUpdate}=req.body
          console.log(content,id,sub_id)
          const Renew_note= await Note.updateOne({_id:id,"SubRegister._id":sub_id},{$set:{"SubRegister.$.Data":content,LastUpdate}});
        console.log("save")
         if(!Renew_note){
          throw createError(404, "Product not exits");
         }else{
           res.status(200).send()
         }
        } catch (error) {
          
          
        }
      },
    deletenotes: async (req, res, next) => {
        try {
          console.log(req.params.id)
          console.log(req.params.sub_id)
          const val= req.params.sub_id
          if(typeof(val) === "undefined"){
            const note_d= await Note.deleteOne({_id:req.params.id});
            if (!note_d) throw createError(404, "Product not exits");
            res.status(200).json({done:"done"});
          }else{
            const subnote_d=await Note.updateOne({_id:req.params.id},{$pull:{SubRegister:{_id:req.params.sub_id}}});
            if (!subnote_d) throw createError(404, "Product not exits");
            res.status(200).json({done:"done"});
          }
        } catch (error) {
          console.log(error)
        }
      },
        // view part table
        
  UserRequest: async (req, res, next) => {
    
    const search = req.query.search?.toLowerCase();
   
    try {
      console.log("search",search)
      let regex = new RegExp(search, "i");
      let result;     
      
      if (search !== "undefined" && search !== "") {
        result = await Note.find({
          RegisterName: { $regex: regex },
        })
      }
   
        
         if (!result) throw createError(404, "Product not exits");
         
         res.status(200).send(result)

    } catch (error) {
      next(error);
    }
  },
    deleteSelectednotes: async (req, res, next) => {
        try {
          const result = req.body;
          console.log(result);
          if(result){

            const ids = result.map(item => item._id);
            if(ids.length){

                const note_d= await Note.deleteMany({_id:{$in:ids}});
                if(note_d){
                  res.status(200).send()
                }
            }
            console.log(ids);
          }
          res.status(404).send()
          // console.log("id result",delID)
          // if(typeof(val) === "undefined"){
          //   const note_d= await Note.deleteOne({_id:req.params.id});
          //   if (!note_d) throw createError(404, "Product not exits");
          //   res.status(200).json({done:"done"});
          // }else{
          //   const subnote_d=await Note.updateOne({_id:req.params.id},{$pull:{SubRegister:{_id:req.params.sub_id}}});
          //   if (!subnote_d) throw createError(404, "Product not exits");
          //   res.status(200).json({done:"done"});
          // }
        } catch (error) {
          console.log(error)
        }
      },
}
