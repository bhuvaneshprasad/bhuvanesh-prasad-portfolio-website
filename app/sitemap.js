import getAllPosts from '../helper/getAllPosts'

export default async function sitemap(){

    const allBlogs = await getAllPosts("bhuvaneshprasad")

    const allPosts = allBlogs?.map((item)=>{
        return({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${item?.node?.slug}`,
            lastModified: item?.node?.publishedAt,
            changeFrequency: 'monthly',
            priority:1
    })
    }) ?? [];


    return[
        {
            url: process.env.NEXT_PUBLIC_BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority:0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority:0.9,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority:1,
        },
        ...allPosts,
    ];
}