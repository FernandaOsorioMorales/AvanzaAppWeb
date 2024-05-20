package models

import (
	"gorm.io/gorm"
)

// A textual post on a single forum.
type Post struct {
	gorm.Model

	// Title of the post
	Title string
	// Content/text of the post
	Content string

	// Comments responding to the post
	Comments []Comment

	// Trainers that like this post
	Likers []*Trainer `gorm:"many2many:likes;"`

	// Author of the post
	AuthorID uint
	// Author of the post
	Author Trainer

	// forum containing the post
	ForumID uint
	// forum containing the post
	Forum Forum
}
