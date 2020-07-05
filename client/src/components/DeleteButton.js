import React, {useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'


import {Button, Confirm, Icon, Popup} from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../util/graphQL';

function DeleteButton({postId, commentId, callback}){

    const [confirmOpen, setConfirmOpen] = useState(false);
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostorMutation] = useMutation(mutation,{
        variables: {
            postId,
            commentId
        },
        update(proxy){
            setConfirmOpen(false);

            if(!commentId){
            //REMOVES THE POST FROM CACHE
            let data = proxy.readQuery({
                query:FETCH_POSTS_QUERY
            });
            const resPosts = data.getPosts.filter(p=>p.id!==postId);
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts:[...resPosts]}
            });
            }
 
            if(callback){
                callback();
            }
        },
    });

    return(
        <>
            <Popup
            content={commentId ? "Delete Comment": "Delete Post"}
            trigger={
                <Button 
                as="div" 
                color="red" 
                onClick={()=>setConfirmOpen(true)}
                floated="right"
                >
                    <Icon name = "trash" style={{margin: 0}}/>
                </Button>
            }
            inverted
            />
            <Confirm
            open={confirmOpen}
            onCancel={()=> setConfirmOpen(false)}
            onConfirm={deletePostorMutation}
            />
        </>
    )

}

const DELETE_POST_MUTATION = gql`

    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id 
            comments{
                id username createdAt body
            }
            commentCount
        }
    }
`;


export default DeleteButton;