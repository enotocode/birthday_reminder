export function decodeJsonApi(jsonApi) {
	let collection = [];

	if (typeof jsonApi.data === 'undefined') {
		throw new Error("Bad server response: 'data' property is undefided!");
	}

	if (typeof jsonApi.data.length === 0) {
		return collection;
	}

	let response = jsonApi.data;

	for (let i in response) {

		if (
			typeof response[i].data !== 'object' ||
			response[i].data === null 
		) {
			continue;
		}

		let data = response[i].data;
		let object = {};

		object.id = data.id;

		if (
			typeof data.attributes === 'object' &&
			data.attributes !== null
		) {
			for (let key in data.attributes) {
				object[key] = data.attributes[key];
			}
		}

		collection.push(object);
	}

	return collection;
}