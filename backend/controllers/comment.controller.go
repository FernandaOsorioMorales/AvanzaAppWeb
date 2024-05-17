package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"
	va "backend/tools/validation"

	"github.com/gofiber/fiber/v2"

	"strconv"
)

func GetComments(c *fiber.Ctx) error {
	if !tools.IsLoggedIn(c) {
		return ApiError(c, "Not logged in", 400)
	}

	urlParams := c.AllParams()
	postId, ok := urlParams["id"]
	if !ok {
		return ApiError(c, "ID not found", 404)
	}

	var post models.Post

	postQ := db.Orm().
		Preload("Comments.Author.BaseUser").
		First(&post, postId)

	if postQ.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	comments := make([]fiber.Map, 0)
	for _,c := range post.Comments {
		comments = append(comments, fiber.Map {
			"id": c.ID,
			"content": c.Content,
			"authorAlias": c.Author.BaseUser.Alias,
			"authorPhoto": c.Author.BaseUser.Photo,
		})
	}

	return c.Status(200).JSON(comments)
}

func CreateComment(c *fiber.Ctx) error {
	isLoggedIn, id := tools.GetCurrentUserId(c)
	if !isLoggedIn {
		return ApiError(c, "Not logged in", 400)
	}

	vaErr := va.Check(c, va.Rmap {
		"content": "required",
		"post": "required,numeric",
	})
	if vaErr != nil {
		return ApiError(c, "Invalid data 1", 500)
	}

	postId, parseErr := strconv.ParseUint(c.FormValue("post"), 10, 32)
	if parseErr != nil {
		return ApiError(c, "Invalid data 2", 400)
	}

	//TODO: validate existance of post ?

	var author models.Trainer
	authorQ := db.Orm().Where("base_user_id = ?", id).First(&author)
	if authorQ.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	comment := models.Comment {
		Content: c.FormValue("content"),
		Author: author,
		PostId: uint(postId),
	}

	if db.Orm().Save(&comment).Error != nil {
		return ApiError(c, "DB error", 500)
	}

	return ApiSuccess(c, nil)
}
