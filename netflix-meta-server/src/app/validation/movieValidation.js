const Joi = require("joi");

module.exports = {
	// Xác thực dữ liệu tạo movie type mới
	create(data) {
		const schema = Joi.object({
			name: Joi.string().trim().required().empty().strict().messages({
				"string.trim": "Tên phim không được chứa khoảng trắng đầu và cuối",
				"any.required": "Bắt buộc phải có tên phim",
				"string.empty": "Tên phim không được để trống",
			}),
			imageUrl: Joi.string().trim().messages({
				"string.trim": "imageUrl không được chứa khoảng trắng đầu và cuối",
			}),
			videoUrl: Joi.string().trim().messages({
				"string.trim": "videoUrl không được chứa khoảng trắng đầu và cuối",
			}),
			description: Joi.string().trim().messages({
				"string.trim":
					"description không được chứa khoảng trắng đầu và cuối",
			}),
			premieredAt: Joi.string().trim().messages({
				"string.trim":
					"premieredAt không được chứa khoảng trắng đầu và cuối",
			}),
			time: Joi.string().trim().messages({
				"string.trim": "time không được chứa khoảng trắng đầu và cuối",
			}),
			ageLimit: Joi.number(),
			producer: Joi.string().trim().messages({
				"string.trim": "producer không được chứa khoảng trắng đầu và cuối",
			}),
			director: Joi.string().trim().messages({
				"string.trim": "director không được chứa khoảng trắng đầu và cuối",
			}),
			performer: Joi.string().trim().messages({
				"string.trim": "performer không được chứa khoảng trắng đầu và cuối",
			}),
			movieTypeId: Joi.string().trim().messages({
				"string.trim":
					"movieTypeId không được chứa khoảng trắng đầu và cuối",
			}),
		});

		return schema.validate(data);
	},

	// Xác thực dữ liệu cập nhật movie type
	update(data) {
		const objValidate = {
			imageUrl: Joi.string().trim().messages({
				"string.trim": "imageUrl không được chứa khoảng trắng đầu và cuối",
			}),
			videoUrl: Joi.string().trim().messages({
				"string.trim": "videoUrl không được chứa khoảng trắng đầu và cuối",
			}),
			description: Joi.string().trim().messages({
				"string.trim":
					"description không được chứa khoảng trắng đầu và cuối",
			}),
			premieredAt: Joi.string().trim().messages({
				"string.trim":
					"premieredAt không được chứa khoảng trắng đầu và cuối",
			}),
			time: Joi.string().trim().messages({
				"string.trim": "time không được chứa khoảng trắng đầu và cuối",
			}),
			ageLimit: Joi.number(),
			producer: Joi.string().trim().messages({
				"string.trim": "producer không được chứa khoảng trắng đầu và cuối",
			}),
			director: Joi.string().trim().messages({
				"string.trim": "director không được chứa khoảng trắng đầu và cuối",
			}),
			performer: Joi.string().trim().messages({
				"string.trim": "performer không được chứa khoảng trắng đầu và cuối",
			}),
			movieTypeId: Joi.string().trim().messages({
				"string.trim":
					"movieTypeId không được chứa khoảng trắng đầu và cuối",
			}),
		};

		if (data.name) {
			objValidate.name = Joi.string()
				.trim()
				.required()
				.empty()
				.strict()
				.messages({
					"string.trim":
						"Tên phim không được chứa khoảng trắng đầu và cuối",
					"any.required": "Bắt buộc phải có tên phim",
					"string.empty": "Tên phim không được để trống",
				});
		}

		const schema = Joi.object(objValidate);
		return schema.validate(data);
	},
};
