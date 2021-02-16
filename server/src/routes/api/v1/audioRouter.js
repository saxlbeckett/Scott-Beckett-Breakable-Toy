import express from "express"
import upload from "../../../services/audio-upload.js"
import Audio from "../../../models/Audio.js"
import FileSerializer from "../../serializers/FileSerializer.js"
const audioRouter = new express.Router()

audioRouter.post('/', upload.single('audio'), async (req, res) => {
    
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

audioRouter.get("/:id", async (req, res) => {
    const trackId = req.params.id
    try {
        const track = await Audio.query().findById(trackId);
        const serializedTrack = await FileSerializer.showData(track);
        return res.status(200).json({ track: serializedTrack });
      } catch (error) {
        return res.status(500).json({ errors: error });
      }
})

audioRouter.delete("/:id", async (req, res) => {
    const trackId = req.params.id
    try {
        const track = await Audio.query().deleteById(trackId);
        return res.status(200).json({message: "Track deleted"});
      } catch (error) {
        return res.status(500).json({ errors: error });
      }
})


audioRouter.patch('/:id', upload.single('audio'), async (req, res) => {
    const name = req.file.originalname
    const type = req.file.mimetype
    const audioFilePath = req.file.location
    const userId = req.user.id
    const trackId = req.params.id
    try {
        const update = await Audio.query()
        .updateAndFetchById( trackId, {name: name, type: type, audioFilePath: audioFilePath, userId: userId})
        return res.status(201).json({ update: update })
    } catch (error) {
       console.log(error)
        return res.status(500).json({ errors: error })
    }
})
export default audioRouter;