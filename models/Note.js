const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
	{
		RegisterName:{
			
			type:String
		},
		Description:{
			type:String
		},
		CreatedAt:{
			type: String,
		},
		LastUpdate:{
			type: String,
		},
		SubRegister:[
            {
                NoteName:{
                    type:String
                },
                Data:{
                    type:String
                }
            }

        ],
		Assigne:{
			type:String
		},
        Tag:[ ]
		
	}
)	

const Note = mongoose.model("MyNotebook", NoteSchema);

module.exports = Note;