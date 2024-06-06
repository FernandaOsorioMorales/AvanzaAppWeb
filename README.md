# Avanza AppWeb
Repository that contains the Avanza AppWeb developed in the Software Engineer Course at Computer Science Bachelor.

# Clone Repository
The first step to use this system is to clone the repository.
Go to your terminal and type 
  ### HTTPS
     git clone https://github.com/FernandaOsorioMorales/AvanzaAppWeb.git

  ### SSH 
     git clone git@github.com:FernandaOsorioMorales/AvanzaAppWeb.git
     
# Start containers:
NOTE: it's highly probable that you sould create a .env file in the root directory with the following credentials to succesfully start the database.

    dbUser=EXAMPLE
    dbPassword=EXAMPLE
    dbName=EXAMPLE
Go to the root directory and with the **Docker** service active type the following:

    docker compose watch

This should start the following containers.

- Backend
- Frontend
- PosgreSQL

Once started, you can direct to any browser you want and go to
  http://localhost:8080

to see the landing page of the system.

To see every log of the containers you can open a new window in the terminal and type

    docker compose logs -f

# Shutdown containers: 
To stop every single process refer to the system, just go to the root directory of the project in the terminal and type

    docker compose down
