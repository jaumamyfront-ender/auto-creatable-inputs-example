const apiRoot = process.env.NEXT_PUBLIC_API_URL

if (!apiRoot) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined!')
}

const get = async <TData = any>(url: string, lng: string): Promise<TData> => {
  try {
    const res = await fetch(apiRoot + url, {
      headers: { Area: 'Landing', Language: lng || 'en' },
    })
    return res.json()
  } catch (err) {
    throw new Error(JSON.stringify(err))
  }
}

const post = async <TData = any, TRespone = any>(
  url: string,
  data: TData,
  lng: string,
): Promise<TRespone> => {
  try {
    const res = await fetch(apiRoot + url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Area: 'Landing',
        Language: lng || 'en',
      },
    })

    if (!res.ok) {
      const { Message: errorMessage } = await res.json()
      throw errorMessage
    }

    return res.json()
  } catch (err) {
    throw new Error(err === 'unknown' ? err : '')
  }
}

export { get, post }
