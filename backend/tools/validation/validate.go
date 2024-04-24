// Validation basics for user inputs
package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

// A map of rules to check for with Check
type Rmap map[string]string

var validate *validator.Validate

// Create singleton validator instance
func Init() {
	validate = validator.New(validator.WithRequiredStructEnabled())
}

// Get reference to validator instance
func Get() *validator.Validate {
	return validate
}

// validate a map
func Check(c *fiber.Ctx, m Rmap) error {
	for k, v := range m {
		err := validate.Var(c.FormValue(k), v)
		if err != nil {
			return err
		}
	}
	return nil
}

// validate the values of a map, ignoring empty fields in the form
func CheckUpdateMap(c *fiber.Ctx, m Rmap) error {
	for key, rule := range m {
		value := c.FormValue(key)
		if value == "" {
			continue
		}

		err := validate.Var(value, rule)
		if err != nil {
			return err
		}
	}
	return nil
}
