export default async function getPostDetails(query) {

  try {
    const response = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      next: {tags:['post']},
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseData = await response.json();
    return responseData.data.publication.post;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}
