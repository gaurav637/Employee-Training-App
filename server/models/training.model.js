const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
    {
      title: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String, 
        required: true 
      },
      category: { 
        type: String, 
        required: true 
      },
      startDate: { 
        type: Date, 
        required: true 
      },
      endDate: { 
        type: Date, 
        required: true 
      },
      instructor: { 
        type: String, 
        required: true 
      },
      maxParticipants: { 
        type: Number, 
        default: 20 
      },
      moduleContent:[
        {
          moduleName:{
            type: String,
          },
          summary:{
            type: String,
          },
          video:{
            type: String
          },
          isComplete:{
            type: Boolean,
            default: false,
          },
          complete:{
            type: Number,
            default: 0,
          }
        }
      ]
}, {timestamps: true});
  
const Training = mongoose.model('Training', trainingSchema);
module.exports = Training;