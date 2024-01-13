import { mediaResource } from "./../../../webServices/resources"
const uploadURI = mediaResource.FILE_UPLOAD_API.url
const fetMediaURI = mediaResource.GET_MEDIA_LIST_API.url
export async function getMediaSource(conds = {}, url = null) {
	let response = await fetch(url || fetMediaURI, { method: 'POST', headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}, body: JSON.stringify(conds)})
	let res = await response.json()
	return !res.code ? res.data : []
}
export async function uploadFile(file, url = null) {
	// set up the request data
	let formData = new FormData()
	formData.append('file', file.file)

	// track status and upload file
	file.status = 'loading'
	let response = await fetch(url || uploadURI, { method: 'POST', body: formData })

	// change status to indicate the success of the upload request
	file.status = response.ok
	let res = await response.json()
	return !res.code ? res.data : null
}

export function uploadFiles(files, url = null) {
	return Promise.all(files.map((file) => uploadFile(file, url)))
}

export default function createUploader(url = null) {
	return {
		uploadFile: function (file) {
			return uploadFile(file, url)
		},
		uploadFiles: function (files) {
			return uploadFiles(files, url)
		}
	}
}
