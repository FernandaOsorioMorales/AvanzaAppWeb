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
	log.Printf("Database connection: [host=db user=%s port=%s dbname=%s]\n", user, port, name)

	database, err := gorm.Open(postgres.Open(dsn),
		&gorm.Config{Logger: logger.Default.LogMode(logger.Info)})

	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	orm = database
}

// Creates tags and exercises.
func populate() {
	orm.Exec("truncate exercises")
	orm.Exec("truncate tags")
	exercises := []string{
		"Press militar", "Push press", "HSPU aistida", "HSPU",
		"HS", "Elevaciones frontales", "Elevaciones laterales",
		"Pájaros", "Arnold press", "Planche", "Lean planche", 
		"Press inclinado", "Press plano", "Press declinado", 
		"Cristo", "Flexiones inclinadas", "Flexiones", "Fondos",
		"Aperturas con polea", "Aperturas con mancuerna",
		"Planche press", "Extensión de trícep", "Patada de trícep",
		"Press francés", "Copa", "Rompecráneos", "V-sit", "L-sit",
		"Front lever", "Front lever raises", "Curl de bíceps con barra",
		"Martillo", "Curl de bíceps con polea", "Curl de bíceps invetido",
		"Extensión de muñeca", "Flexión de muñeca", "Plancha",
		"Plancha lateral", "Abdominales", "Abdominales en C",
		"Abdominales en A", "Abdominales en V", "Tijeras", "Dragon flag",
		"Abdominales laterales", "Lumbares", "Superman", "Dominadas",
		"Jalón al pecho", "Remo con mancuerna", "Remo con polea",
		"Face pull", "Puente de glúteo", "RDL", "Hip Thrust",
		"Patada de glúteo", "Press de pierna", "Sentadilla frontal",
		"Sentadilla lateral", "Sentadilla sumo", "Peso muerto", 
		"Peso muerto sumo", "Extesnión de pierna", "Curl de femoral",
		"Abductores con polea", "Adductores con polea", "Desplantes",
		"Sentadilla búlgara", "Pistol squat", "Dragon squat",
		"Hawaiian squat", "Elevaciones de gemelo", "Salto vertical", 
		"Salto de longitud",
	}

	for _, e := range exercises {
		exercise := models.NewExercise(e, "") 
		orm.Create(&exercise)
	}

	tags := []string{
		"Hombro", "Trapecio", "Bíceps", "Tríceps", "Pecho", "Espalda", "Glúteo",
		"Pierna", "Cuadríceps", "Bíceps femoral", "Gemelo", "Abdomen", "Dorsal",
		"Lumbar", "Fuerza", "Coordinación", "Potencia", "Resistencia",
	}

	for _, t := range tags {
		tag := models.NewTag(t)
		orm.Create(&tag)
	}
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
	orm.AutoMigrate(&models.UserTrainingPlan{})
	orm.AutoMigrate(&models.WorkoutExercise{})
	orm.AutoMigrate(&models.Workout{})
	orm.AutoMigrate(&models.WorkoutTag{})
}

// Start database connection and set up ORM models on it.
func Init() {
	connect()
	migrate()
	populate()
}

// Returns access to the database connection instance.
func Orm() *gorm.DB {
	return orm
}
