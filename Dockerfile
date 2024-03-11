# Frontend build process
FROM node:21
WORKDIR /shipyard
# separate copy for package.json ensures caching
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install

COPY ./frontend ./
RUN npm run build

# Backend build process
FROM golang:1.22
WORKDIR /app
COPY backend/ . 
RUN go mod download && go mod verify
RUN go build -v -o goapp

COPY --from=0 /shipyard/dist /app/static

EXPOSE 9090
CMD ["./goapp"]

