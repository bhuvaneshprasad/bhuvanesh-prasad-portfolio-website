import React from "react";
import fetchPosts from "../../helper/getPosts";
import AllBlogs from "../../components/AllBlogs";

export async function generateMetadata() {
  return {
    title: `Blogs`,
    description:
      "Blogs from Bhuvanesh Prasad",
    keywords: ["Bhuvanesh Prasad Blogs", "Blogs", "Bhuvanesh Blogs", "Data Analyst Blogs", "Data Science Blogs", "Finance Blogs"],
    applicationName: "Bhuvanesh Prasad",
  };
}

const Blog = async ({ searchParams }) => {
  const pageSize = 9;

  const currentPage = 1;

  const getPosts = `
    query Followers {
      user(username: "bhuvaneshprasad") {
        id
        posts(pageSize: ${pageSize}, page: ${
    searchParams.page || currentPage
  }) {
          edges {
            node {
              coverImage {
                url
              }
              title
              slug
              tags{
                name
              }
              publishedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            nextPage
            previousPage
          }
        }
      }
    }
  `;

  const posts = await fetchPosts(getPosts);

  return (
    <>
      <AllBlogs title="Blogs" posts={posts} page={currentPage} />
    </>
  );
};

export default Blog;
