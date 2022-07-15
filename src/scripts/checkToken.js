export const checkToken = () => {
  const token = localStorage.getItem('token')

  if (
    token === null &&
    location.pathname !== '/index.html' &&
    location.pathname !== '/'
  )
    return location.replace('index.html')
}
