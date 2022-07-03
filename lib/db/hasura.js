export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
      publicAddress
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'isNewUser',
    {
      issuer,
    },
    token
  );
  console.log({ response, issuer });
  return response?.user?.length === 0;
}

export async function queryHasuraGQL(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
      // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
