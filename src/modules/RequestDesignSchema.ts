import mongoose from 'mongoose';

const RequestDesignSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    designDescription: {
        type: String,
        required: true
    },
    fileOne: {
        type: String
    },
    fileTwo: {
        type: String
    },
    functionality: {
        type: Boolean,
        default: false
    },
    functionalityDescription: {
        type: String
    },
    functionalityType: {
        type: String 
    },
    dimentions:{
        type: String
    }
})

export default mongoose.model('ReqDesign', RequestDesignSchema)