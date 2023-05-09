import Loading from './Loading';
import { useFetch } from '../hooks/useFetch';

// Display a list of posts
const FetchingDataStarter = () => {
    const {data: posts, loading, error} = useFetch('posts');

    if(error){
        return <p>An error occured: {error}</p>
    }

    if(loading){
        return <Loading />
    }


    return (
        <>
            {posts.length &&
            posts.map((post) => {
                return(
                    <div key={post.id}>
                        <p>{post.title}</p>
                        <p>{post.body}</p>
                    </div>
                );
            })}
        </>
    );
  };
  
  export default FetchingDataStarter;