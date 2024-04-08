
// Function to fetch posts based on page number
export default async function fetchPosts(query) {

  try {
    const response = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      next: {tags:['posts', 'all']},
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseData = await response.json();
    return responseData.data.user.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}
