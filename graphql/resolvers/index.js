const postsResolvers = require('./Post');
const usersResolvers = require('./Users')
const commentsResolvers = require('./Comments')

module.exports = {
    Post:{

        likeCount(parent){
            console.log(parent);
            return parent.likes.length;
        },
        commentCount(parent){
            return parent.comments.length;
        }
    },
    Query:{
        ...postsResolvers.Query
    },

    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription:{
        ...postsResolvers.Subscription
    }

}
