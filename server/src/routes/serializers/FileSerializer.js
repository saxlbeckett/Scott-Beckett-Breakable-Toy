import UserSerializer from "./UserSerializer.js"

class FileSerializer {
  static async showData(file) {
    const allowedAttributes = ["name", "type", "audioFilePath"];

    let serializedFile = {};
    for (const attribute of allowedAttributes) {
      serializedFile[attribute] = file[attribute];
    }
    const user = await file.$relatedQuery("user");
    const serializedUser = UserSerializer.showData(user);
    serializedFile.user = serializedUser;
    return serializedFile;
  }
}

export default FileSerializer;