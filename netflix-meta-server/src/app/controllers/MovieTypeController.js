const MovieTypeSchema = require("../models/MovieTypeModel");
const { movieTypeValidation } = require("../validation");

class MovieTypeController {
	// [GET] /movieTypes
	async getAll(req, res, next) {
		try {
			// Lấy danh sách thể loại phim
			const movieTypesFound = await MovieTypeSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách thể loại phim
			const allMovieTypesFound = await MovieTypeSchema.find({}).searchable(
				req
			);

			if (movieTypesFound) {
				res.json({
					code: 1,
					data: movieTypesFound,
					totalLength: allMovieTypesFound.length,
					message: "Lấy danh sách thể loại phim thành công",
				});
			} else {
				res.json({
					code: 2,
					message: "Lấy danh sách thể loại phim thất bại",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [GET] /movieTypes/:id
	async findById(req, res, next) {
		try {
			// Lấy id từ params
			const movieTypeId = req.params.id;

			// Tìm thể loại phim theo id
			const movieTypeFound = await MovieTypeSchema.findOne({
				_id: movieTypeId,
			});

			if (movieTypeFound) {
				res.json({
					code: 1,
					data: movieTypeFound,
					message: "Đã tìm thấy thể loại phim",
				});
			} else {
				res.json({
					code: 2,
					message: "Không tìm thấy thể loại phim",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /movieTypes
	async create(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = movieTypeValidation.create(payload);
			if (error) {
				res.json({
					code: 2,
					message: error.message,
				});
				return;
			}

			// Kiểm tra thể loại phim đã tồn tại chưa
			const movieTypeExist = await MovieTypeSchema.findOne({
				name: payload.name,
			});
			if (movieTypeExist) {
				res.json({
					code: 3,
					message: "Tên thể loại phim đã tồn tại",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newMovieType = new MovieTypeSchema(payload);
			const saveMovieTypeResult = await MovieTypeSchema.create(newMovieType);

			res.json({
				code: 1,
				message: "Tạo thể loại phim thành công",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /movieTypes/:id
	async update(req, res, next) {
		try {
			// Lấy id từ params
			const movieTypeId = req.params.id;
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = movieTypeValidation.update(payload);
			if (error) {
				res.json({
					code: 3,
					message: error.message,
				});
				return;
			}

			// Cập nhật dữ liệu mới cho movie type theo id
			const updateMovieTypeResult = await MovieTypeSchema.updateOne(
				{
					_id: movieTypeId,
				},
				payload
			);

			if (updateMovieTypeResult.modifiedCount > 0) {
				res.json({
					code: 1,
					message: "Cập nhật thể loại phim thành công",
				});
			} else {
				res.json({
					code: 2,
					message: "Không phát hiện dữ liệu cần chỉnh sửa",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [DELETE] /movieTypes/:id
	async deleteById(req, res, next) {
		try {
			// Lấy id từ params
			const movieTypeId = req.params.id;

			// Xóa thể loại phim trong CSDL
			const deleteResult = await MovieTypeSchema.deleteOne({
				_id: movieTypeId,
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 1,
					message: "Xóa thể loại phim thành công",
				});
			} else {
				res.json({
					code: 2,
					message: "Không tìm thấy thể loại phim cần xóa",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new MovieTypeController();
