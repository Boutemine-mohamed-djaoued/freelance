//client
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDU3Njg5MzQzNzQ1ZjI5MzdhMWZkNmZmNDY3ZjQ1IiwidHlwZSI6InVzZXIiLCJpYXQiOjE3MTQ1NzIzNTAsImV4cCI6MTcxNzE2NDM1MH0.SA_S_05xKn_dQ-DVXag0aBU4oS6baRPD9Ar_ObbbyPI";
// let id = "5e057689343745f2937a1fd6ff467f45";
//freelancer
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlNGQzMTAxNzBkMjQ5NzdiMzY1Yjg5NDBkOGU4MGVjIiwidHlwZSI6InVzZXIiLCJpYXQiOjE3MTQ4MzI2NDAsImV4cCI6MTcxNzQyNDY0MH0.OUeHacm73VRAP7FJE_3et9STYIqEkabQL8OuS-vIF5U";
let id = "7e4d310170d24977b365b8940d8e80ec";

export default async function fetchData(input) {
  try {
    const response = fetch('http://localhost:8000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        query: `
            mutation PostJob($input: jobInput!, $user: ID!) {
              postJob(input: $input, user: $user) {
                title
              }
            }
							`,
        variables: {
          "input": input,
          "user": id,
        }
      })
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.error(error));
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}