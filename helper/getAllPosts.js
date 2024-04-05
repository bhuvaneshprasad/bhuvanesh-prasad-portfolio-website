export default async function getAllPosts(username) {
  let posts = [];
  let hasNextPage = true;
  let page = 1;

  while (hasNextPage) {
    const query = `
        query GetAllPosts {
          user(username: "${username}") {
            id
            posts(pageSize: 1, page: ${page}) {
              edges {
                node {
                  coverImage {
                    url
                  }
                  slug
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

    try {
      const response = await fetch("https://gql.hashnode.com/", {
        method: "POST",
        next: {tags:["allPosts"]},
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const responseData = await response.json();
      const userData = responseData.data.user;

      // Add posts from current page to the posts array
      posts = [...posts, ...userData.posts.edges];

      // Update hasNextPage and page for next iteration
      hasNextPage = userData.posts.pageInfo.hasNextPage;
      page = userData.posts.pageInfo.nextPage;
    } catch (error) {
      console.error("Error fetching posts:", error);
      break;
    }
  }

  return posts;
}