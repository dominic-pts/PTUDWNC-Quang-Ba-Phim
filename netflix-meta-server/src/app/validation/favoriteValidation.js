const Joi = require("joi");

module.exports = {
	// Xác thực dữ liệu tạo movie type mới
	add(data) {
		const schema = Joi.object({
			userId: Joi.string().trim().required().empty().strict().messages({
				"string.trim":
					"ID tài khoản người dùng không được chứa khoảng trắng đầu và cuối",
				"any.required": "Bắt buộc phải có ID tài khoản người dùng",
				"string.empty": "ID tài khoản người dùng không được để trống",
			}),
			movieId: Joi.string().trim().required().empty().strict().messages({
				"string.trim":
					"ID phim không được chứa khoảng trắng đầu và cuối",
				"any.required": "Bắt buộc phải có ID phim",
				"string.empty": "ID phim không được để trống",
			}),
		});

		return schema.validate(data);
	},
};
