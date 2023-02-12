const mongoose = require('mongoose')
const Bread = require('./bread')
const bakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: {
        type: String
    }
}, {
    toJSON: { virtuals: true }
})

bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})
// DELETE hook
bakerSchema.post('findOneAndDelete', async function(){
//delete associated bread
await Bread.deleteMany({baker: this._conditions._id})

})
module.exports = mongoose.model('Baker', bakerSchema)