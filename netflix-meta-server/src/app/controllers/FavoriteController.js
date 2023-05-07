const FavoriteSchema = require("../models/FavoriteModel");
const MovieSchema = require("../models/MovieModel");
const { favoriteValidation } = require("../validation");

class FavoriteController {
	// [GET] /favorites/:userId
	async getMoviesByUserId(req, res, next) {
		try {
			// Lấy userId từ params
			const userId = req.params.userId;

			// Lấy tất cả phim trong danh sách thích
			const favoritesFound = await FavoriteSchema.find({
				userId
			})
				.sortable(req)
				.searchable(req)
				.limitable(req);
			
			// Lấy danh sách id phim trong danh sách thích
			const movieIdList = favoritesFound.map(f => f.movieId);

			// Lấy tổng document tất cả phim trong danh sách thích
			const allFavoritesFound = await FavoriteSchema.find({}).searchable(req);

			// Lấy danh sách phim trong danh sách thích
			const moviesInFavorite = await MovieSchema.find({
				_id: { "$in": movieIdList }
			}).searchable(req);

			if (favoritesFound) {
				res.json({
					code: 1,
					data: moviesInFavorite,
					totalLength: allFavoritesFound.length,
					message: "Lấy danh sách thích thành công",
				});
			} else {
				res.json({
					code: 2,
					message: "Lấy danh sách thích thất bại",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /favorites
	async add(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = favoriteValidation.add(payload);
			if (error) {
				res.json({
					code: 2,
					message: error.message,
				});
				return;
			}

			// Kiểm tra phim đã tồn tại trong danh sách thích chưa
			const movieExist = await FavoriteSchema.findOne({
				userId: payload.userId,
				movieId: payload.movieId,
			});
			if (movieExist) {
				res.json({
					code: 3,
					message: "Phim đã tồn tại trong danh sách thích",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newFavorite = new FavoriteSchema(payload);
			const saveFavoriteResult = await FavoriteSchema.create(newFavorite);

			res.json({
				code: 1,
				message: "Thêm phim vào danh sách thích thành công",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [DELETE] /favorites/:userId
	async remove(req, res, next) {
		try {
			// Lấy userId từ params
			const userId = req.params.userId;
			// Lấy movieId từ body của request
			const movieId = req.body.movieId;

			// Xóa phim trong danh sách thích
			const deleteResult = await FavoriteSchema.deleteOne({
				userId,
				movieId
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 1,
					message: "Xóa phim trong danh sách thích thành công",
				});
			} else {
				res.json({
					code: 2,
					message: "Không tìm thấy phim cần xóa trong danh sách thích",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new FavoriteController();
