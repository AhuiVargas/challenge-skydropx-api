function client(method, endpoint, body = {}) {
  const config = {
    method: method,
    headers: {
      'Authorization': `Token token=${process.env.REACT_APP_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body,
  }

  return  window
  .fetch(`${process.env.REACT_APP_CURL}${endpoint}/`, config)
  .then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}