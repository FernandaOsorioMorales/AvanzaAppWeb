package db

import (
	"backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"fmt"
	"log"
	"os"
)

var orm *gorm.DB 

func connect() {
	user := os.Getenv("POSTGRES_USER")
	pass := os.Getenv("POSTGRES_PASSWORD")
	port := os.Getenv("POSTGRES_PORT")
	name := os.Getenv("POSTGRES_NAME")

	dsn := fmt.Sprintf("host=db user=%s password=%s port=%s dbname=%s", user, pass, port, name)
	log.Printf("Database connection: [%s]\n", dsn)

	database, err := gorm.Open(postgres.Open(dsn),
		&gorm.Config{ Logger: logger.Default.LogMode(logger.Info) })

	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	orm = database
}

func migrate() {
	orm.AutoMigrate(&models.BaseUser{})
	//db.AutoMigrate(&models.User)
	//db.AutoMigrate(&models.Trainer)
	//db.AutoMigrate(&models.Message)
}

func Init() {
	connect()
	migrate()
}

func Orm() *gorm.DB {
	return orm
}
