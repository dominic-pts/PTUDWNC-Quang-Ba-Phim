const MovieSchema = require("../models/MovieModel");
const { movieValidation } = require("../validation");

class MovieController {
	// [GET] /movies
	async getAll(req, res, next) {
		try {
			// Lấy danh sách phim
			const moviesFound = await MovieSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách phim
			const allMoviesFound = await MovieSchema.find({}).searchable(req);

			if (moviesFound) {
				res.json({
					code: 1,
					data: moviesFound,
					totalLength: allMoviesFound.length,
					message: "Lấy danh sách phim thành công",
				});
			} else {
				res.json({
					code: 2,
					message: "Lấy danh sách phim thất bại",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [GET] /movies/:id
	async findById(req, res, next) {
		try {
			// Lấy id từ params
			const movieId = req.params.id;

			// Tìm phim theo id
			const movieFound = await MovieSchema.findOne({
				_id: movieId,
			});

			if (movieFound) {
				res.json({
					code: 1,
					data: movieFound,
					message: "Đã tìm thấy phim",
				});
			} else {
				res.json({
					code: 2,
					message: "Không tìm thấy phim",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /movies
	async create(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = movieValidation.create(payload);
			if (error) {
				res.json({
					code: 2,
					message: error.message,
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newMovieType = new MovieSchema(payload);
			const saveMovieTypeResult = await MovieSchema.create(newMovieType);

			res.json({
				code: 1,
				message: "Tạo phim thành công",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /movies/:id
	async update(req, res, next) {
		try {
			// Lấy id từ params
			const movieId = req.params.id;
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = movieValidation.update(payload);
			if (error) {
				res.json({
					code: 3,
					message: error.message,
				});
				return;
			}

			// Cập nhật dữ liệu mới cho movie type theo id
			const updateMovieTypeResult = await MovieSchema.updateOne(
				{
					_id: movieId,
				},
				payload
			);

			if (updateMovieTypeResult.modifiedCount > 0) {
				res.json({
					code: 1,
					message: "Cập nhật phim thành công",
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

	// [DELETE] /movies/:id
	async deleteById(req, res, next) {
		try {
			// Lấy id từ params
			const movieId = req.params.id;

			// Xóa phim trong CSDL
			const deleteResult = await MovieSchema.deleteOne({
				_id: movieId,
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 1,
					message: "Xóa phim thành công",
				});
			} else {
				res.json({
					code: 2,
					message: "Không tìm thấy phim cần xóa",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new MovieController();
