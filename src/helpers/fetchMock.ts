const fetchMock = (data: Object) => {
  const TIMEOUT = 1000; // 1 second

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      return resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(data),
      });
    }, TIMEOUT);
  }) as unknown as Promise<Response>;
};

export default fetchMock;
