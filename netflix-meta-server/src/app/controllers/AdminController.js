const AdminSchema = require("../models/AdminModel");
const { adminValidation } = require("../validation");

class AdminController {
	// [GET] /admins
	async getAll(req, res, next) {
		try {
			// Lấy danh sách tài khoản quản trị viên
			const adminsFound = await AdminSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách tài khoản quản trị
			const allAdminsFound = await AdminSchema.find({}).searchable(req);

			if (adminsFound) {
				res.json({
					code: 1,
					data: adminsFound,
					totalLength: allAdminsFound.length,
					message: "Lấy danh sách quản trị viên thành công",
				});
			} else {
				res.json({
					code: 2,
					message: "Lấy danh sách quản trị viên thất bại",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [GET] /admins/:id
	async findById(req, res, next) {
		try {
			// Lấy id từ params
			const adminId = req.params.id;

			// Tìm tài khoản quản trị viên theo id
			const adminFound = await AdminSchema.findOne({
				_id: adminId,
			});

			if (adminFound) {
				res.json({
					code: 1,
					data: { ...adminFound._doc, password: null },
					message: "Đã tìm thấy tài khoản quản trị viên",
				});
			} else {
				res.json({
					code: 2,
					message: "Không tìm thấy tài khoản quản trị viên",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /admins/register
	async register(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = adminValidation.register(payload);
			if (error) {
				res.json({
					code: 2,
					message: error.message,
				});
				return;
			}

			// Kiểm tra tài khoản quản trị viên đã tồn tại chưa
			const adminExist = await AdminSchema.findOne({
				email: payload.email,
			});
			if (adminExist) {
				res.json({
					code: 3,
					message: "Email đã tồn tại",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newAdmin = new AdminSchema(payload);
			const saveAdminResult = await newAdmin.save();

			res.json({
				code: 1,
				data: { ...saveAdminResult._doc, password: null },
				message: "Tạo tài khoản quản trị viên thành công",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /admins/login
	async login(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = adminValidation.login(payload);
			if (error) {
				res.json({
					code: 2,
					message: error.message,
				});
				return;
			}

			// Kiểm tra tài khoản quản trị viên đã tồn tại chưa
			const adminExist = await AdminSchema.findOne({
				email: payload.email,
			});
			if (!adminExist) {
				res.json({
					code: 3,
					message: `Không tìm thấy tài khoản có email: ${payload.email}`,
				});
				return;
			}

			// Kiểm tra mật khẩu
			const isMatchPassword = await adminExist.isMatchPassword(
				payload.password
			);
			if (!isMatchPassword) {
				res.json({
					code: 4,
					message: `Sai mật khẩu`,
				});
				return;
			}

			res.json({
				code: 1,
				data: { ...adminExist._doc, password: null },
				message: "Đăng nhập thành công",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /admins/:id/updatePasswordById
	async updatePasswordById(req, res, next) {
		try {
			// Lấy id từ params
			const adminId = req.params.id;
			// Lấy password mới từ body của request
			const newPassword = req.body.password;

			// Xác thực password mới
			const { error } = adminValidation.updatePassword(newPassword);
			if (error) {
				res.json({
					code: 4,
					message: error.message,
				});
				return;
			}

			// Tìm tài khoản quản trị viên để cập nhật mật khẩu mới (newPassword)
			const adminFound = await AdminSchema.findOne({
				_id: adminId,
			});
			if (!adminFound) {
				res.json({
					code: 5,
					message: "Không tìm thấy tài khoản quản trị viên",
				});
				return;
			}

			// Cập nhật mật khẩu mới (newPassword)
			adminFound.password = newPassword;
			const saveAdminResult = await adminFound.save();

			res.json({
				code: 1,
				message: "Cập nhật mật khẩu tài khoản quản trị viên thành công",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [DELETE] /admins/:id
	async deleteById(req, res, next) {
		try {
			// Lấy id từ params
			const adminId = req.params.id;

			// Xóa tài khoản quản trị viên trong CSDL
			const deleteResult = await AdminSchema.deleteOne({
				_id: adminId,
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 1,
					message: "Xóa quản trị viên thành công",
				});
			} else {
				res.json({
					code: 2,
					message: "Không tìm thấy quản trị viên cần xóa",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new AdminController();
