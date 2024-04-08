import React from "react";
import BlogHeader from "../../../components/BlogHeader";
import BlogContent from "../../../components/BlogContent";
import getPostDetails from "../../../helper/getPostDetails";

export async function generateMetadata({params}) {
  const query = `
    query GetPostDetails {
        publication(host:"bhuvaneshprasad.hashnode.dev"){
        post(slug:"${params.slug}"){
          id
          coverImage{
            url
          }
          title
          subtitle
          readTimeInMinutes
          author{
            id
            name
            profilePicture
          }
          publishedAt
          tags{
            id
            name
          }
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
  return {
    title: `${post.title}`,
    description:
      `${post.subtitle}`,
    keywords: [`${post.tags.map(tag=>tag.name)}`],
    applicationName: "Bhuvanesh Prasad",
  };
}

const BlogPage = async ({params}) => {
  const query = `
    query GetPostDetails {
        publication(host:"bhuvaneshprasad.hashnode.dev"){
        post(slug:"${params.slug}"){
          id
          coverImage{
            url
          }
          title
          subtitle
          readTimeInMinutes
          author{
            id
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
      <BlogContent content={post.content} />
    </>
  );
};

export default BlogPage;
