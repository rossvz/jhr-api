# jhr-api

Users
---

* GET /users 
  list all users
  
* GET /users:id
  get specific user.
  optionally add ?todos=true to include associated todos
  
* POST /users
  create user
  request body: {
    first_name:string,
    last_name:string,
    email:string,
    password:string (plain text right now)
  }
  
* PUT /users/:id
  update user
  
* DELETE /users/:id
  delete specific user and all todos
  
Todos
---

* GET /todos 
  list all todos
  
* GET /todos:id
  get specific todo.
  
* POST /todos
  create user
  request body: {
    title:string,
    completed:boolean,
    UserId:number,
  }
  
* PUT /todos/:id
  update todo
  
* DELETE /todos/:id
  delete specific todo
