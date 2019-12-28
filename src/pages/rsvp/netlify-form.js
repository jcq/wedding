export const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export const saveToNetlify = ({ payload, formName }) => {
  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({ 'form-name': formName, ...payload })
  })
    .then(res => console.log('form submitted', res))
    .catch(error => alert(error));
};
