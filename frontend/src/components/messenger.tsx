export function Messenger() {
    return (
        <div className="messengerContainer">
            <div className="UserName">
                <h1>Booker DeWitt</h1>
            </div>
            <div className="ChatMessages">
                <div className="LMessage">
                    <p>Hey, how are you?</p>
                </div>
                <div className="RMessage">
                    <p>Good, you?</p>
                </div>
            </div>
            <form action="" className="SendMessage">
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>media</div>
                <input name="message" placeholder="Type Something here" />
                <button className="SendButton">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAklEQVR4nO2ZOWgVURSGbzSS4BIR8tyChVEQREWwUbQRlWCnhSAIWqmISFoLQbEKEo2onWAhSEBBxK1UESxcGmOiIKiFO7hLNOLyySH/I9fJm/dm5i2Zkfc1ydw598z5OWfO3Hufc3Xq1PkvAFqATuAxcMNlDWABcBz4wgiPXBYAGoC1wFngF6PpdGkGmALsAAYIxzIz1aURYB7QBXzwAn4JnABeBIQccyksnw7gCvDbC/QasAGYCfRp7Ln+/rF3xqUBYLLKp98Lfgg4DSyRTc4T8RDo1v9Xxzp+C65d5fPeE/AKOAC0ena5gIg24Kmu14+lgFUFus89YCvQGLDNBURYeW3UtX0/xtU6+GYF+iBQPiZoecicUSI0fl1je8a6fF6rfHJF5oWJWKQX3FpuSy3L52eB8plQYm5BEQZwUuNHXQ3KJx+E8UOCVkT0UUzENGCwai0XmK1SeecJeKOSaovhJ1SEAezVvcuuRuVj34TmmL5KiRgPPNP9jkoE36TyuV+gfFYm9FlUhAFsqkjLDSmftyqfOWX4LSnCAG7KZrdLihZq/sfrrrLSlNjpaBF9Ye0YWCqbT7YaLueB+eUAKqmF5QiII8IATsmux5WDlgU9wDc5tJVpb1JBMUXkgO965vyyhAScdqmX5wVdstRX+p3w7PfJ9mJFRFRCUAIRjd6+Y13FhSQRFFeE5mz27BuqJiSqoCQiNO+W5uyquojAg2cAhwOCeqO+2AFfyzTno+0gqx994SBa9fH87LXtyJmQD9vmGt3VjTZaMNOBcwqoN2Zmh5TRdpcGlJ2vCmpxxDn7Jf6CSxPeiUfJrNimyzu3WuPShEplMEpWgC0SMVCTlhsXdbOSWQFuy26nSyNEyIqdpngtd5JLK5TICnBG9w+5NEORrACztNO0fc9cl3aAI4WyAhzU+HmXBRje2/yTFZ0D2KmLsdplBQJZAbbpuj+VLTdqVoA7ErLdZQ2Gt854x0p2NjzRZQ1GspKny2UVRrKSjZZbIitP7DfzUKM6deq4avEXfFisjrL4iOMAAAAASUVORK5CYII="/>
                </button>
            </form>
        </div>
    );
}