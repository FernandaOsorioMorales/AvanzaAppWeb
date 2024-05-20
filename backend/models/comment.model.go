package models

import (
	"gorm.io/gorm"
)

// A comment inside a post.
// It may respond to the post or to another comment also belonging to the post
type Comment struct {
	gorm.Model

	// Content/Text of the comment
	Content string

	// Comments responding to this comment
	// HOLD: let's make the rest work before this :)
	// Children []Comment `gorm:foreignkey:`

	// Author of the comment
	AuthorID uint
	// Author of the comment
	Author Trainer

	// owner post of the comment
	PostId uint
	// owner post of the comment
	Post Post
}
