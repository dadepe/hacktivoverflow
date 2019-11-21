**OVERFLOW**
----
**Usage**

# Register

**POST /register**
* **URL**

  `/register`

* **Method:**

  `POST` 
  
* **Data Body**

    `'key' username 'value' [string] = your username`
 
   `'key' email 'value' [string] = your email`

   `'key' password 'value' [string] = your password`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "_id": "your id",
        "username" : "your username"
        "email": "your email,
        "password : your hashed password
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Email is already Token' }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Username is already Token' }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Password less than 6 character }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'email/password is required }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# Login

**POST /login**
* **URL**

  `/login`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' email 'value' [string] = your email`

   `'key' password 'value' [string] = your password`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "token": your token,
        "payload" : {
            your data
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ invalid email/password" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# users

**GET /users/profile**
* **URL**

  `/users/profile`

* **Method:**

  `GET` 
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
    
        your personal data
        
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /users/addWatchTags**
* **URL**

  `/users/addWatchTags`

* **Method:**

  `PATCH` 

* **Data Body**
 
   `'key' tags 'value' [string] = your watch tags`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success add watch tags",
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "tag not exists in this site" }`

  * **Code:** 400 <br />
    **Content:** `{ message : "cant input empty tag }`

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /users/removeWatchTags**
* **URL**

  `/users/removeWatchTags`

* **Method:**

  `PATCH` 

* **Data Body**
 
   `'key' tags 'value' [string] = your watch tags`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success remove watch tags",
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "no tag found" }`

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# questions

**GET /questions**
* **URL**

  `/questions`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [    
        {
            "upvotes": ["usersId"],
            "downvotes": ["usersIdD"],
            "answers": [
                "answers in the question],
            "date": "date created/edited"
            "tags": ["list of question tags"]
            "_id": "question Id",
            "title": "question title",
            "description": "question description",
            "ownedBy": "name of the user that ask" 
        },
         ............................................and more
    ]

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**GET /questions/:id**
* **URL**

  `/questions/:id`

* **Method:**

  `GET` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = question ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
    
       selected question data
    
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**GET /questions/search?**
* **URL**

  `/questions/search?`

* **Method:**

  `GET` 
  
* **Data Query**

    **query:** 

    `'filter' [string] = search title`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
    
       searched question data
    
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**GET /questions/tagged/:tag**
* **URL**

  `/questions/tagged/:tag`

* **Method:**

  `GET` 
  
* **Data Params**

    **params:** 

    `'params' [string] = question tag`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
    
       selected questions by tag
    
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**GET questions/page/:page**
* **URL**

  `questions/page/:page`

* **Method:**

  `GET` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = page number`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
        *one page generate 5 questions*
    [
        {
            selected Questions
        },
        ............................................and other 4
    ]

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**POST /questions**
* **URL**

  `/questions`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' title 'value' [string] = your question title`

   `'key' description 'value' [string] = your question description`

   `'key' tags 'value' [array] = your question tags`


* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success post Question".
        "data" : {
            "upvotes": [],
            "downvotes": [],
            "answers": [],
            "date": "date created"
            "tags": ["your tags"]
            "_id": "your question id,
            "title": "your title",
            "description": "your description",
            "ownedBy": "your username"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : title is required" }`

  * **Code:** 400 <br />
    **Content:** `{ message : description is required" }`
    
  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /questions/:id**
* **URL**

  `/questions/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = question ID`

* **Data Body**
 
    **body:** 

   `'key' title 'value' [string] = your updated title`

   `'key' description 'value' [string] = your updated descripton`

   `'key' tags 'value' [array] = your updated tags`


* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success update questions",
        "data" : {
            "upvotes": [],
            "downvotes": [],
            "answers": [],
            "date": "date updated"
            "tags": ["updated tags"]
            "_id": "your question id,
            "title": "your updated title",
            "description": "your updated description",
            "ownedBy": "your username"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ title is required" }`

  * **Code:** 400 <br />
    **Content:** `{ description is required" }`

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**DELETE /questions/:id**
* **URL**

  `/questions/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = question ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success delete questions",
        "data" : {
            deleted question data
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /questions/upvote**
* **URL**

  `/questions/upvote/:id`

* **Method:**

  `PATCH` 

* **Data Params**

    **params:** 

    `'params' [integer] = question ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success upvote question/undo donwvote",
        "data" : {
            upvoted question data
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "already vote" }`

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not authorized" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /questions/downvote**
* **URL**

  `/questions/downvote/:id`

* **Method:**

  `PATCH` 

* **Data Params**

    **params:** 

    `'params' [integer] = question ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success downvote question/undo upvote",
        "data" : {
            downvoted question data
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "already downvote" }`

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not authorized" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`



# answers

**POST /answers/:id**
* **URL**

  `/answers`

* **Method:**

  `POST` 

* **Data Params**

    **params:** 

    `'params' [integer] = answer ID`
  
* **Data Body**
 
   `'key' description 'value' [string] = your answer description`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success post Answer".
        "data" : {
            "upvotes": [],
            "downvotes": [],
            "date": "date created"]
            "_id": "your answer id,
            "description": "your description",
            "ownedBy": "your username"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`

  * **Code:** 400 <br />
    **Content:** `{ message : description is required" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /answers/:id**
* **URL**

  `/answers/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = answer ID`

* **Data Body**
 
    **body:** 

   `'key' description 'value' [string] = your updated descripton`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success update answers",
        "data" : {
            "upvotes": [],
            "downvotes": [],
            "date": "date updated"
            "_id": "your answer id,
            "description": "your updated description",
            "ownedBy": "your username"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ description is required" }`

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**DELETE /questions/:id**
* **URL**

  `/answers/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = answer ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success delete answer",
        "data" : {
            deleted answer data
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /answers/upvote**
* **URL**

  `/answers/upvote/:id`

* **Method:**

  `PATCH` 

* **Data Params**

    **params:** 

    `'params' [integer] = answer ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success upvote answer/undo donwvote",
        "data" : {
            upvoted answer data
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "already vote" }`

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not authorized" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /answers/downvote**
* **URL**

  `/answers/downvote/:id`

* **Method:**

  `PATCH` 

* **Data Params**

    **params:** 

    `'params' [integer] = answer ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "success downvote answer/undo upvote",
        "data" : {
            downvoted answer data
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "already downvote" }`

  * **Code:** 401 <br />
    **Content:** `{ message : "not login" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not authorized" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`
