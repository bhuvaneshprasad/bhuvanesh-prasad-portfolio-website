import { ImageResponse } from "next/og";

export const size = {
  width: 1280,
  height: 720,
};

export const contentType = "image/png";

export default async function og() {

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0 bg-black">
          {/* Overlay */}
          <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
        </div>
        <div tw="flex flex-col text-neutral-50">
          {/* Title */}
          <div tw="text-9xl font-bold">
            {"Blog"}
          </div>
          {/* Tags */}
          <div tw="flex justify-center items-center mt-6 text-xl">
            <div tw="text-center">{"By Bhuvanesh Prasad"}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
