const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	name: { type: String, maxLength: 255, required: true },
	imageUrl: { type: String, maxLength: 255 },
	videoUrl: { type: String, maxLength: 255 },
	description: { type: String },
	premieredAt: { type: String, maxLength: 255 },
	time: { type: String, maxLength: 255 },
	ageLimit: { type: Number },
	producer: { type: String, maxLength: 255 },
	director: { type: String, maxLength: 255 },
	performer: { type: String, maxLength: 1000 },
	movieTypeId: { type: String },
});

// Custom query
MovieSchema.query.sortable = function (req) {
	const isSort =
		req.query.hasOwnProperty("sortColumn") &&
		req.query.hasOwnProperty("sortType");

	if (isSort) {
		const sortColumn = req.query.sortColumn;
		const sortType = ["asc", "desc"].includes(req.query.sortType)
			? req.query.sortType
			: "asc";

		return this.sort({
			[sortColumn]: sortType,
		});
	}

	return this;
};
MovieSchema.query.searchable = function (req) {
	const isSearch =
		req.query.hasOwnProperty("searchType") &&
		req.query.hasOwnProperty("searchValue");

	if (isSearch) {
		const searchType = req.query.searchType;
		const searchValue = req.query.searchValue;

		return this.regex(searchType, new RegExp(".*" + searchValue + ".*", "i"));
	}

	return this;
};
MovieSchema.query.limitable = function (req) {
	const isLimit = req.query.hasOwnProperty("limit");
	const isOffset = req.query.hasOwnProperty("offset");

	if (isLimit && isOffset) {
		const limit = +req.query.limit;
		const offset = +req.query.offset;
		return this.skip(offset).limit(limit);
	} else if (isLimit) {
		const limit = +req.query.limit;
		return this.limit(limit);
	} else if (isOffset) {
		const offset = +req.query.offset;
		return this.skip(offset);
	}

	return this;
};

module.exports = mongoose.model("movies", MovieSchema);
