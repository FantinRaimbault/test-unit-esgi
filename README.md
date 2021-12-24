# TP TESTS ESGI EN JAVASCRIPT AVEC LA LIBRAIRIE JEST

## Install
`npm install`

## Run tests
`jest`

## Run a specific test
`jest path/to/file`

## Run only one test
You need to add the keyword **only**
`test.only(...) &&  jest path/to/file`

## Run app
`npm run dev`

## Endpoints 
1.
`http://localhost:3000/users POST`

Payload :
```json 
{
    "name": "name",
    "email": "teacher@email.com",
    "birthDate": "2000-12-13T11:20:12.175Z",
    "lastName": "Lastname",
    "firstName": "John",
    "password": "azertyuiop"
}
```
Response :
```json
{
    "status": "User created !",
    "user": {
        "email": "namee@email.com",
        "birthDate": "2000-12-13T11:20:12.175Z",
        "lastName": "Lastname",
        "firstName": "John",
        "password": "azertyuiop",
        "_id": "61c653e8c01c3350a4976e3d",
        "__v": 0
    }
}
```

2.
`http://localhost:3000/toDoLists/61c653e8c01c3350a4976e3d POST`

Payload:
```json
{
    "title": "a title"
}
```
Response:
```json
{
    "status": "ToDoList created !",
    "toDoList": {
        "title": "un title wsh",
        "user": "61c653e8c01c3350a4976e3d",
        "_id": "61c6545239f9e044ffc928f6",
        "__v": 0
    }
}
```

3. 
`http://localhost:3000/items/61c6545239f9e044ffc928f6 POST`

Payload:
```json
{
    "name": "a name",
    "content": "a content",
    "toDoList": "61c6545239f9e044ffc928f6"
}
```

Response:
success or error