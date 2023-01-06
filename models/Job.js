const { string } = require('joi')
const moongose = require('mongoose')

const jobSchema = new moongose.Schema({
    company:{
        type:String,
        required:[true, 'please provide company name'],
        maxlenght:69
    },

    position:{
        type:String,
        required:[true, 'please provide company name'],
        maxlenght:420
    },

    status:{
        type:String,
        enum:['interview','declined','pending'],
        deafult: 'pending'
    },

    createdBy:{
        type:moongose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide a user']
    }

},{timestamps:true})

module.exports = moongose.model('Job',jobSchema) 