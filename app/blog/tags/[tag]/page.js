import React from "react";
import fetchPosts from "../../../../helper/getPosts";
import AllBlogs from "../../../../components/AllBlogs";

const BlogTag = async ({ params, searchParams }) => {
  const pageSize = 9;

  const currentPage = 1;

  const getPostsBtTag = `
  query GetPostsByTag {
    user(username: "bhuvaneshprasad") {
      id,
      posts(page:${searchParams.page || currentPage}, pageSize:${pageSize}, filter:{tagSlugs:["${(params.tag).toLowerCase()}"]}){
        edges{
          node{
            coverImage{
                url
              }
              title
              slug
              tags{
                name
              }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          previousPage
          nextPage
        }
      }
    }
  }`;

  const posts = await fetchPosts(getPostsBtTag);

  return (
    <>
      <AllBlogs title={params.tag} posts={posts} page={currentPage} />
    </>
  );
};

export default BlogTag;
