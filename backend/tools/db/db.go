// Holds the database connection to postgres and handles the set up of the ORM.
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

// Reference to the database instance
var orm *gorm.DB

// Opens a connection to the database and loads the instance
func connect() {
	user := os.Getenv("POSTGRES_USER")
	pass := os.Getenv("POSTGRES_PASSWORD")
	port := os.Getenv("POSTGRES_PORT")
	name := os.Getenv("POSTGRES_NAME")

	dsn := fmt.Sprintf("host=db user=%s password=%s port=%s dbname=%s", user, pass, port, name)
	log.Printf("Database connection: [%s]\n", dsn)

	database, err := gorm.Open(postgres.Open(dsn),
		&gorm.Config{Logger: logger.Default.LogMode(logger.Info)})

	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	orm = database
}

// Loads our ORM models into the database, creating or modifying tables as needed
func migrate() {
	orm.AutoMigrate(&models.BaseUser{})
	orm.AutoMigrate(&models.Contact{})
	orm.AutoMigrate(&models.User{})
	orm.AutoMigrate(&models.Trainer{})
	orm.AutoMigrate(&models.TrainerSpecialty{})
	orm.AutoMigrate(&models.Tag{})
	orm.AutoMigrate(&models.Message{})
	orm.AutoMigrate(&models.Exercise{})
	orm.AutoMigrate(&models.Request{})
	orm.AutoMigrate(&models.TrainingPlanWk{})
	orm.AutoMigrate(&models.TrainingPlan{})
	orm.AutoMigrate(&models.WorkoutExercise{})
	orm.AutoMigrate(&models.Workout{})
	orm.AutoMigrate(&models.WorkoutTag{})
}

// Start database connection and set up ORM models on it.
func Init() {
	connect()
	migrate()
}

// Returns access to the database connection instance.
func Orm() *gorm.DB {
	return orm
}
