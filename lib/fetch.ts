type FetchAPiType = {
  url: string;
  method?: string;
  body?: any | null;
};

const base_api_url = process.env.NEXT_PUBLIC_API_URL;
export const fetchApi = async ({ url, method, body }: FetchAPiType) => {
  const apiUrl = `${base_api_url}/${url}`;
  try {
    const call = await fetch(apiUrl, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const data = await call.json();
    if (call.ok === false) throw new Error(data.error);
    return data;
  } catch (error) {
    throw error;
  }
  // return await fetch(apiUrl, {
  //   method: method || "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   ...(body ? { body: JSON.stringify(body) } : {}),
  // })
  //   .then(async (result) => {
  //     const data = await result.json();
  //     if (result.ok === false) throw new Error(data.error);
  //     return data;
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });
};
