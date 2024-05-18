package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"
	va "backend/tools/validation"

	"github.com/gofiber/fiber/v2"

)

func ListForums(c *fiber.Ctx) error {
	if !tools.IsLoggedIn(c) {
		return ApiError(c, "Not logged in", 400)
	}

	forums := make([]models.Forum, 0)
	query := db.Orm().Model(&models.Forum{}).Find(&forums)
	if query.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	forumMaps := make([]map[string]interface{}, 0)
	for _,forum := range forums {
		forumMaps = append(forumMaps, map[string]interface{} {
			"id": forum.ID,
			"topic": forum.Topic,
		})
	}

	return c.Status(200).JSON(forumMaps)
}

func GetForum(c *fiber.Ctx) error {
	urlParams := c.AllParams()
	forumId, ok := urlParams["id"]
	if !ok {
		return ApiError(c, "ID not found", 404)
	}
	
	// forum join posts
	var forum models.Forum
	query := db.Orm().Preload("Posts").Where("id = ?", forumId).First(&forum)
	if query.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	posts := make([]map[string]interface{}, 0)
	for _,post := range forum.Posts {
		var author models.BaseUser
		likeCount := db.Orm().Model(&post).Association("Likers").Count()
		authorQ := db.Orm().Table("base_users").Joins("join trainers on base_users.id = trainers.base_user_id").Where("trainers.id = ?", post.AuthorID).First(&author)

		if authorQ.Error == nil {
			var commentCount int64
			db.Orm().Model(models.Comment {}).Where("post_id = ?", post.ID).Count(&commentCount)

			posts = append(posts, map[string]interface{} {
				"id": post.ID,
				"title": post.Title,
				"authorAlias": author.Alias,
				"authorPhoto": author.Photo,
				"commentCount": commentCount,
				"likeCount": likeCount,
			})
		}
	}

	response := make(map[string]interface{})
	response["forum"] = map[string]interface{} {
		"topic": forum.Topic,
		"id": forum.ID,
	}
	response["posts"] = posts

	return c.Status(200).JSON(response)
}

func CreateForum(c *fiber.Ctx) error {
	if !tools.IsLoggedIn(c) {
		return ApiError(c, "Not logged in", 400)
	}

	// validate topic 
	vaErr := va.Check(c, va.Rmap {
		"topic": "required",
	})
	if vaErr != nil {
		return ApiError(c, "Invalid data", 400)
	}

	forum := models.Forum {Topic: c.FormValue("topic")}
	query := db.Orm().Create(&forum)
	if query.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	return ApiSuccess(c, nil)
}
