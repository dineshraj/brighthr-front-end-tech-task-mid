const fetchMock = (data: any) => {
  const TIMEOUT = 1000; // 1 second
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      return resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(data)
      })
    }, TIMEOUT)
  })
}

export default fetchMock;