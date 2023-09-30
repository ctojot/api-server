# API-Server

Dynamic API: Perform CRUD Operations on a database

## Installation

* `npm install`

Set your PORT environment with an .env file

```text
PORT=3001
```

## Usage

CRUD Operation: Read
REST Method: GET
Path: /trainers
Returns: An array of objects, each object being one entry from your database.

CRUD Operation: Read
REST Method: GET
Path: /trainers/1
Returns: The object from the database, which has the id matching that which is in the path.

CRUD Operation: Update
REST Method: PUT
Path: /trainers/1
Input: JSON Object in the Request Body
Returns: The object from the database, which has the id matching that which is in the path, with the updated/changed data.

CRUD Operation: Destroy
REST Method: DELETE
Path: /food/1
Returns: The record from the database as it exists after you delete it.

## Contributors

ChristianRhey Tojot
