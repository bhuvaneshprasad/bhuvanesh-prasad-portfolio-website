import { ImageResponse } from "next/og";

import getPostDetails from "../../../helper/getPostDetails";

export const size = {
  width: 1280,
  height: 720,
};

export const contentType = "image/png";

export default async function og({params}) {
    const query = `
    query GetPostDetails {
        publication(host:"bhuvaneshprasad.hashnode.dev"){
        post(slug:"${params.slug}"){
          coverImage{
            url
          }
          title
          readTimeInMinutes
          author{
            name
            profilePicture
          }
          publishedAt
          tags{
            name
          }
        }
      }
      }`;
      const post = await getPostDetails(query);
      const date = new Date(post.publishedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1"
            src={`${post.coverImage.url}`}
            alt={`${post.title}`}
            width={1280}
            height={720}
          />
          {/* Overlay */}
          <div tw="absolute flex inset-0 bg-black bg-opacity-80" />
        </div>
        <div tw="flex flex-col text-neutral-50">
          {/* Title */}
          <div tw="text-8xl font-bold text-center">
            {`${post.title}`}
          </div>
          {/* Tags */}
          <div tw="flex justify-center items-center mt-6 text-4xl">
            <div tw="text-center">{`${post.author.name}`}</div>
            <div tw="text-center">{`|${post.readTimeInMinutes} min read`}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
