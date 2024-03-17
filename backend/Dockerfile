# Backend build process
FROM golang:1.22
WORKDIR /app
COPY . . 
RUN go mod download && go mod verify
RUN go build -v -o goapp

EXPOSE 9090
CMD ["./goapp"]
