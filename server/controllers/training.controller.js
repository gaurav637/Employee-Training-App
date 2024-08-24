const {TrainingService} = require('../services');

module.exports.createTraining = async (req,res) =>{
    try{
        const training = await TrainingService.createNewTraining(req.body);
        if(!training){
            return res.status(500).json({
                message: "failed to create ",
                success: false,
                error: true,
            })
        }
        return res.status(201).json({
            message: "create",
            success: true,
            training: training,
        });
    }catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}

module.exports.getAllTraining = async (req,res) =>{
    try{
        const trainings = await TrainingService.getAllTraining();
        if(!trainings){
            return res.status(500).json({
                message: "failed to create ",
                success: false,
                error: true,
            })
        }
        return res.status(200).json({
            message: "get all Trainings",
            success: true,
            training: trainings,
        });

    }catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}

module.exports.searchTrainings = async (req,res) =>{
    try{
        const searchTrainings = await TrainingService.serachTraining(req.body);

    }catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}