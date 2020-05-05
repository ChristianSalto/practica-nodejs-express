# NodePop

## Install

```shell
npm install
```

<span style="color:red">Important !!!</span> -> **You must copy .env.example to .env and adapt your configuration to the project**

```shell
cp .env.example .env
```

To initialize the database you can run:

```shell
npm run install_db
```

## Run the app

Start the api as a developer:

```shell
npm run dev
```

Start api in cluster mode:

```shell
npm run cluster
```

Start the api in production:

```shell
npm run start
```

## API Methods


### Authentication

POST /apiv1/authentication

```
email -> "user@example.com"
password -> "1234"

success:
   
   return {
       token:token
   }

fail: 

   return {
       "error": "Invalid credentials"
   }   

```

### List of adsnodepops

GET /apiv1/adsnodepops

**Default limit is 10**

```json
[
    {
        "name": "Bicycle",
        "sale": true,
        "price": 230.15,
        "foto": "bici.jpg",
        "tags": [
            "lifestyle",
            "motor"
        ]
    },
    {
        "name": "iPhone 3G",
        "sale": false,
        "price": 50.00,
        "foto": "iPhone3G.jpg",
        "tags": [
            "lifestyle",
            "mobile"
        ]
    }
]


POST /apiv1/adsnodepops

response success: Status 201 Created

{
    "success": {
        "tags": [
            "lifestyle",
            "motor",
            "work"
        ],
        "_id": "5e790ea87842704409360d50",
        "name": "mando ps4",
        "sale": true,
        "price": 49.99,
        "foto": "mando.jpg",
        "__v": 0
    }
}

Status 400 Bad Request by tags:

{
    "error": "moto",
    "msj": "only the following tags writing in lowercase are valid",
    "tags": [
        "work",
        "lifestyle",
        "mobile",
        "motor"
    ]
}

PUT /apiv1/adsnodepop/:id

{
    "success": {
        "tags": [
            "motor",
            "work"
        ],
        "_id": "5e79164aefcb734ca5f078a5",
        "name": "computer",
        "sale": false,
        "price": 650,
        "foto": "computer.jpg",
        "__v": 0
    },
    "message": "this ad was update"
}

DELETE /apiv1/adsnodepop/:id

{
    "success": {
        "tags": [
            "motor",
            "mobile"
        ],
        "_id": "5e7918636d0a1b501ab2ecbb",
        "name": "moto",
        "sale": false,
        "price": 200000,
        "foto": "moto.jpg",
        "__v": 0
    },
    "message": "this ad was deleted"
}
```

### To see the documention -> view HTML

GET /

### List of adsnodepop -> view HTML

GET /cards

### List of tags available -> view HTML

GET /listTags

# Private zone

### To see the login -> view HTML

First:

GET /login

### To see the private -> view HTML

Second:

***you need to be logged in***

Try:

```
email -> "user@example.com"
password -> "1234"

```

GET /private


# Other info


### Technology used

- [Vs code](https://code.visualstudio.com/) -> IDE 
- [Node.js](https://nodejs.org/es/) -> backend technology to interpret javascript
- [Express.js](https://expressjs.com/es/) -> Node.js web framework
- [ejs](https://www.npmjs.com/package/ejs) -> views engine


### Available queries

*name,tags,sale,price,limit,skip,sort,fields*

examples:

`http://localhost:3000/cards?price=50-10000&sale=false&sort=price-1`
`http://localhost:3000/cards?limit=8&skip=1&price=-10000&sort=price1`
`http://localhost:3000/cards?fields=price`


### How to start a mongoDB

```shell
./bin/mongod --dbpath ./data/db --directoryperdb
```