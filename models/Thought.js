const { Schema, model } = require('mongoose');
const reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
    return `REACTION COUNT: ${this.reactions.length}`
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;