import React from "react";
import BlogHeader from "../../../components/BlogHeader";
import BlogToc from "../../../components/BlogToc";
import BlogContent from "../../../components/BlogContent";
import getPostDetails from "../../../helper/getPostDetails";

const BlogPage = async ({params}) => {
  const query = `
    query GetPostDetails {
        publication(host:"bhuvaneshprasad.hashnode.dev"){
        post(slug:"${params.slug}"){
          coverImage{
            url
          }
          title
          subtitle
          readTimeInMinutes
          author{
            name
            profilePicture
          }
          publishedAt
          features{
            tableOfContents{
              isEnabled
              items{
                id
                title
                slug
                parentId
                level
              }
            }
          }
          content{
            html
          }
        }
      }
      }`;

  const post = await getPostDetails(query);

  return (
    <>
      <BlogHeader
        coverImage={post.coverImage.url}
        title={post.title}
        subtitle={post.subtitle}
        readTimeInMinutes={post.readTimeInMinutes}
        authorName={post.author.name}
        authorImage={post.author.profilePicture}
        publishedAt={post.publishedAt}
      />
      {/* <BlogToc toc={post.features.tableOfContents} /> */}
      <BlogContent content={post.content} />
    </>
  );
};

export default BlogPage;
