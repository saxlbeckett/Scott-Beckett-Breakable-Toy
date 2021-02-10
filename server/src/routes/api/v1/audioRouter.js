import express from "express"
import upload from "../../../services/audio-upload.js"
import Audio from "../../../models/Audio.js"
import FileSerializer from "../../serializers/FileSerializer.js"
const audioRouter = new express.Router()

audioRouter.post('/', upload.single('audio'), async (req, res) => {
    //debugger
    const name = req.file.originalname
    const type = req.file.mimetype
    const audioFilePath = req.file.location
    const userId = req.user.id
    try {
        const newAudio = await Audio.query().insertAndFetch({name: name, type: type, audioFilePath: audioFilePath, userId: userId})
        return res.status(201).json({ newAudio: newAudio })
    } catch (error) {
       console.log(error)
        return res.status(500).json({ errors: error })
    }
})

audioRouter.get('/', async (req, res) => {

    try {
        const files = await Audio.query()
        const serializedFiles = [];
        for (const file of files) {
          const serializedFile = await FileSerializer.showData(file);
          serializedFiles.push(serializedFile);
        }

        return res.status(201).json({ allAudio: serializedFiles })
    } catch (error) {
       console.log(error)
        return res.status(500).json({ errors: error })
    }
})
export default audioRouter;