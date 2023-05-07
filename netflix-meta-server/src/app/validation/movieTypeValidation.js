const Joi = require("joi");

module.exports = {
	// Xác thực dữ liệu tạo movie type mới
	create(data) {
		const schema = Joi.object({
			name: Joi.string().trim().required().empty().strict().messages({
				"string.trim":
					"Tên thể loại không được chứa khoảng trắng đầu và cuối",
				"any.required": "Bắt buộc phải có tên thể loại",
				"string.empty": "Tên thể loại không được để trống",
			}),
		});

		return schema.validate(data);
	},

	// Xác thực dữ liệu cập nhật movie type
	update(data) {
		const schema = Joi.object({
			name: Joi.string().trim().required().empty().strict().messages({
				"string.trim":
					"Tên thể loại không được chứa khoảng trắng đầu và cuối",
				"any.required": "Bắt buộc phải có tên thể loại",
				"string.empty": "Tên thể loại không được để trống",
			}),
		});

		return schema.validate(data);
	},
};
