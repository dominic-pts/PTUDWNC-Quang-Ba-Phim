const usersRoute = require("./usersRoute");
const adminsRoute = require("./adminsRoute");
const movieTypesRoute = require("./movieTypesRoute");
const moviesRoute = require("./moviesRoute");
const favoritesRoute = require("./favoritesRoute");

function createRouter(app) {
	if (!app) return;

	app.use("/users", usersRoute);
	app.use("/admins", adminsRoute);
	app.use("/movieTypes", movieTypesRoute);
	app.use("/movies", moviesRoute);
	app.use("/favorites", favoritesRoute);
}

module.exports = createRouter;
