const Model = require("./Model")


class Audio extends Model {
  static get tableName() {
    return "audioFiles";
  }
  static get relationMappings() {
    const { User } = require("./index");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "audioFiles.userId",
          to: "users.id",
        },
      },
    }
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "type", "audioFilePath"],
      name: { type: "string", minLength: 1, maxLength: 300 },
      type: { type: "string" },
      audioFilePath: { type: "string"}
    };
  }
}
module.exports = Audio;