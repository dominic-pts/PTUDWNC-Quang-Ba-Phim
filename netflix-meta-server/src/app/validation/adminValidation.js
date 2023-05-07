const Joi = require("joi");

module.exports = {
	// Xác thực dữ liệu đăng ký
	register(data) {
		const schema = Joi.object({
			email: Joi.string()
				.trim()
				.required()
				.empty()
				.strict()
				.email()
				.messages({
					"string.trim": "Email không được chứa khoảng trắng đầu và cuối",
					"any.required": "Bắt buộc phải có Email",
					"string.empty": "Email không được để trống",
					"string.email": "Email không hợp lệ",
				}),
			password: Joi.string()
				.trim()
				.required()
				.empty()
				.strict()
				.min(5)
				.messages({
					"string.trim":
						"Mật khẩu không được chứa khoảng trắng đầu và cuối",
					"any.required": "Bắt buộc phải có mật khẩu",
					"string.empty": "Mật khẩu không được để trống",
					"string.min": "Mật khẩu phải chứa ít nhất 5 ký tự",
				}),
		});

		return schema.validate(data);
	},

	// Xác thực dữ liệu đăng nhập
	login(data) {
		const schema = Joi.object({
			email: Joi.string()
				.trim()
				.required()
				.empty()
				.strict()
				.email()
				.messages({
					"string.trim": "Email không được chứa khoảng trắng đầu và cuối",
					"any.required": "Bắt buộc phải có Email",
					"string.empty": "Email không được để trống",
					"string.email": "Email không hợp lệ",
				}),
			password: Joi.string()
				.trim()
				.required()
				.empty()
				.strict()
				.min(5)
				.messages({
					"string.trim":
						"Mật khẩu không được chứa khoảng trắng đầu và cuối",
					"any.required": "Bắt buộc phải có mật khẩu",
					"string.empty": "Mật khẩu không được để trống",
					"string.min": "Mật khẩu phải chứa ít nhất 5 ký tự",
				}),
		});

		return schema.validate(data);
	},

	// Xác thực mật khẩu khi cập nhật mật khẩu mới
	updatePassword(password) {
		const schema = Joi.string()
			.trim()
			.required()
			.empty()
			.strict()
			.min(5)
			.messages({
				"string.trim": "Mật khẩu không được chứa khoảng trắng đầu và cuối",
				"any.required": "Bắt buộc phải có mật khẩu",
				"string.empty": "Mật khẩu không được để trống",
				"string.min": "Mật khẩu phải chứa ít nhất 5 ký tự",
			});

		return schema.validate(password);
	},
};
