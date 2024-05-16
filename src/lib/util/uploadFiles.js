import { MB } from './consts.js';
export default async function (formData) {
  try {
    const response = await fetch(`${MB}/uploads`, {
      method: 'POST',
      'content-type': 'multipart/form',
      headers: {
        Authorization: 'mok'
      },
      body: formData
    });
    let links = (await response.json()).uploadedFilepaths;
    return links;
  } catch (error) {
    console.error(error);
    alert('failed to upload file');
  }
};