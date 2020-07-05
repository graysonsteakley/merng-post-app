import React, {useContext} from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Grid, Transition} from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import {AuthContext} from '../context/auth'
import PostForm from '../components/PostForm'
import {FETCH_POSTS_QUERY} from '../util/graphQL'


function Home() {

    const {user} = useContext(AuthContext);


    let posts = ''
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    
    console.log(`Loading: ${loading}`)
    console.log(data)
    
    if (data) {
        posts = { data: data.getPosts }
    }
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            {user && (
                <Grid.Column>
                    <PostForm/>
                </Grid.Column>
            )}
            {loading ? (
                <h1>Loading posts..</h1>
            ) : (
                posts.data &&
                posts.data.map(post => (
                <Transition.Group key={post.id} >
                    <Grid.Column style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                    </Grid.Column>
                </Transition.Group>
                ))
            )}
            <Grid.Row></Grid.Row>
        </Grid>
    )
}



export default Home;