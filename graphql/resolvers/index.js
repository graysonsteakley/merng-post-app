const postsResolvers = require('./Post');
const usersResolvers = require('./Users')
const commentsResolvers = require('./Comments')

module.exports = {
    Query:{
        ...postsResolvers.Query
    },

    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }

}
