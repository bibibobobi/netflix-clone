const operationsDoc1 = `
  mutation insertStats($favorited: Int!, $userId: String!, $videoId: String!, $watched: Boolean!) {
    insert_stats_one(object: {favorited: $favorited, userId: $userId, videoId: $videoId, watched: $watched}) {
      favorited
      id
      userId
      videoId
      watched
    }
  }
`;

export async function updateStats(
  token,
  { favorited, watched, userId, videoId }
) {
  const operationsDoc = `
  mutation updateStats($favorited: Int!, $userId: String!, $videoId: String!, $watched: Boolean!) {
    update_stats(
      _set: {watched: $watched, favorited: $favorited},
      where: {
        userId: {_eq: $userId}, 
        videoId: {_eq: $videoId}
      }) {
    returning {
      favorited,
      userId,
      videoId,
      watched,
    }     
    }
  }
`;

  return (response = await queryHasuraGQL(
    operationsDoc,
    'updateStats',
    { favorited, watched, userId, videoId },
    token
  ));
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      userId
      videoId
      favorited
      watched
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'findVideoIdByUserId',
    {
      videoId,
      userId,
    },
    token
  );

  return response?.data?.stats?.length > 0;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    'createNewUser',
    {
      issuer,
      email,
      publicAddress,
    },
    token
  );
  console.log({ response, issuer });
  return response;
}

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
  return response?.data?.users?.length === 0;
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
