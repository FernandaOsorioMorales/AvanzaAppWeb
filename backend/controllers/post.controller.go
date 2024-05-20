package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"
	va "backend/tools/validation"

	"github.com/gofiber/fiber/v2"

	"strconv"
)

func GetPost(c *fiber.Ctx) error {
	if !tools.IsLoggedIn(c) {
		return ApiError(c, "Not logged in", 400)
	}

	urlParams := c.AllParams()
	postId, ok := urlParams["id"]
	if !ok {
		return ApiError(c, "ID not found", 404)
	}

	var post models.Post
	
	query := db.Orm().Preload("Author.BaseUser").First(&post, postId)

	if query.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	return ApiSuccess(c, fiber.Map {
		"id": post.ID,
		"title": post.Title,
		"content": post.Content,
		"authorAlias": post.Author.BaseUser.Alias,
		"authorPhoto": post.Author.BaseUser.Photo,
	})
}

func CreatePost(c *fiber.Ctx) error {
	isLoggedIn, id := tools.GetCurrentUserId(c)
	if !isLoggedIn {
		return ApiError(c, "Not logged in", 400)
	}

	vaErrs := va.Check(c, va.Rmap {
		"title": "required",
		"content": "required",
		"forum": "required,numeric",
	})
	if vaErrs != nil {
		return ApiError(c, "Invalid data", 400)
	}

	forumId, parseErr := strconv.ParseUint(c.FormValue("forum"), 10, 32)
	if parseErr != nil {
		return ApiError(c, "Invalid data", 400)
	}

	var trainer models.Trainer
	trainerQ := db.Orm().Where("base_user_id = ?", id).First(&trainer)
	if trainerQ.Error != nil {
		return ApiError(c, "DB Error", 500)
	}

	post := models.Post {
		Title: c.FormValue("title"),
		Content: c.FormValue("content"),
		ForumID: uint(forumId),
		AuthorID: trainer.ID,
	}

	query := db.Orm().Save(&post)
	if query.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	return ApiSuccess(c, nil)
}

func GetLike(c *fiber.Ctx) error {
	isLoggedIn, id := tools.GetCurrentUserId(c)
	if !isLoggedIn {
		return ApiError(c, "Not logged in", 400)
	}

	urlParams := c.AllParams()
	postId, ok := urlParams["id"]
	if !ok {
		return ApiError(c, "ID not found", 404)
	}

	var trainer models.Trainer
	trainerQ := db.Orm().Where("base_user_id = ?", id).First(&trainer)
	if trainerQ.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	var post models.Post
	postQ := db.Orm().First(&post, postId)
	if postQ.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	likeCount := db.Orm().Model(&trainer).Where("posts.id = ?", postId).Association("Likes").Count()

	return ApiSuccess(c, fiber.Map {
		"like": likeCount > 0,
	})
}

func GetTotalLikes(c *fiber.Ctx) error {
	isLoggedIn, _ := tools.GetCurrentUserId(c)
	if !isLoggedIn {
		return ApiError(c, "Not logged in", 400)
	}

	urlParams := c.AllParams()
	postId, ok := urlParams["id"]
	if !ok {
		return ApiError(c, "ID not found", 404)
	}

	var post models.Post
	postQ := db.Orm().First(&post, postId)
	if postQ.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	likeCount := db.Orm().Model(&post).Association("Likes").Count()

	return ApiSuccess(c, fiber.Map {"count": likeCount})
}

func LikePost(c *fiber.Ctx) error {
	isLoggedIn, id := tools.GetCurrentUserId(c)
	if !isLoggedIn {
		return ApiError(c, "Not logged in", 400)
	}

	// getting the post id
	urlParams := c.AllParams()
	postId, ok := urlParams["id"]
	if !ok {
		return ApiError(c, "ID not found", 404)
	}

	//Get actors
	var trainer models.Trainer
	trainerQ := db.Orm().Where("base_user_id = ?", id).First(&trainer)
	if trainerQ.Error != nil {
		return ApiError(c, "DB Error", 500)
	}
	var post models.Post
	postQ := db.Orm().First(&post, postId)
	if postQ.Error != nil {
		return ApiError(c, "DB Error", 500)
	}

	// register or de-register like
	likeCount := db.Orm().Model(&trainer).Where("posts.id = ?", postId).Association("Likes").Count()
	var err error
	if likeCount > 0 {
		err = db.Orm().Model(&trainer).Association("Likes").Delete(&post)
	} else {
		err = db.Orm().Model(&trainer).Association("Likes").Append(&post)
	}

	if err != nil {
		return ApiError(c, "DB Error", 500)
	}

	return ApiSuccess(c, fiber.Map {
		"like": ! (likeCount > 0),
	})
}
