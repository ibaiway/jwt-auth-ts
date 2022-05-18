# jwt-auth-ts

JWT token project with TypeScript

## Installation

### 1) Clone the repository

```shell
    # Clone from github to current directory
    git clone https://github.com/ibaiway/jwt-auth-ts.git
```

### 2) Install node packages

```shell
    # "npm i" also works
    npm install
```

### 3) Run MongoDB Server

Initialize your MongoDB server.
If you dont have one, you can easily set up one for free at [MongoDB Atlas](https://www.mongodb.com/es/atlas/database)

### 4) Setup Environment variables

You can find an `.env.example` with the required keys.

| KEY        | Description                                              | REQUIRED | DEFAULT |
| ---------- | -------------------------------------------------------- | -------- | ------- |
| PORT       | Port on which the server will run                        |  FALSE   | 3030    |
| MONGO_URI  | MongoDB conenction string                                | TRUE     |
| JWT_SECRET | Will be used to sign and verify the JWT, keep it secret! | TRUE     |

### 5) Run Project

It's time to run the server.

```shell
    npm run dev
```

## API Documentation

Once you have the api running you can find the required documentation on the `/docs` route.

## License

This project has been developed under a [MIT](https://opensource.org/licenses/MIT) license.
