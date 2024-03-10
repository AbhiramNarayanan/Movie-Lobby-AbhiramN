**# Movie Lobby - Abhiram N**

Welcome to Movie Lobby, a platform developed by Abhiram N for managing movie data. This documentation will guide you through setting up the project, testing APIs, and performing various operations.
**Technologies Used: Express.js, Node.js, MongoDB, JWT Authentication, Bcrypt, Mongoose, Password Hashing, Node-cache, Cors etc...**


**## Setting Up the Project**

1. **Clone the Repository**: Begin by cloning the project repository from GitHub to your local machine.

2. **Navigate to the Backend Directory**: Open your terminal and change the directory to the `Backend` folder of the project using the following command:
    ```
    cd Backend
    ```

3. **Install Required Packages**: Run the following command to install the required packages:
    ```
    npm install
    ```

**## Running the Project**

To run the Movie Lobby server locally, execute the following command in your terminal:
```
npm run dev
```
Once the server is running, you'll see the messages:
- "App connected to Database"
- "App is listening to port: 5555"

**## Testing APIs**

To test the APIs, we'll be using Postman. Below are the steps to test various APIs:

**### Authentication APIs**

1. **Register User**: Use the following details to register a user:
    - **Method**: POST
    - **URL**: `localhost:5555/auth/register`
    - **Body**: 
    ```json
    {
        "username": "Abhiram N",
        "password": "Abhi123"
    }
    ```
    After successful registration, you'll receive the message: "User registered successfully".

2. **Login**: Login with the registered user credentials:
    - **Method**: POST
    - **URL**: `localhost:5555/auth/login`
    - **Body**: 
    ```json
    {
        "username": "Abhiram N",
        "password": "Abhi123"
    }
    ```
    Upon successful login, you'll receive a JWT token. Copy that!!

**### Movie Lobby APIs**

1. **Get All Movies**: Retrieve all movies from the database:
    - **Method**: GET
    - **URL**: `localhost:5555/movies`
    You'll receive a list of movies in the response.
    
    **You can visualize the data as table using the visualization feature in the postman terminal**

    Also you can notice the time it taken to get the data like Time:108 ms , But If you send that again you can see the same data appeared but with less time like Time: 6 ms because we are using **caching in our project**, if you checked the terminal you can see the msg **Data retrieved from Cache**

2. **Get Movie by ID**: Retrieve a specific movie by its ID:
    - **Method**: GET
    - **URL**: `localhost:5555/movies/{movie_id}`
    Replace `{movie_id}` with the ID of the movie you want to retrieve.

3. **Search Movies**: Search for movies by title or genre:
    - **Method**: GET
    - **URL**: `localhost:5555/movies/search`
    - **Params**: 
        - Key: `q`
        - Value: Search query (e.g., "Batman")


Now its time to check other methods post , put and delete. To work in that you need to become an admin, By default when you register you are a user so you need to upgrade to admin, but before that we can check that as a user. so select post method give 
``  URL : localhost:5555/movies `` 
if you check that, you will get 
`` {
    "message": "Unauthorized"
} `` 
In the header you need to add the jwt token we copied early. so to add that give **key : Authorization and value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFiaGlyYW0gTiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEwMDM5OTU4LCJleHAiOjE3MTAwNDM1NTh9.wHuEfetq0vkbz60rr3UJdYnYgG-DTTcUuRIN_2SRncM** (Bearer followed by one space after that paste the token we copied early.) tick that and click send Now you will get msg ``  {
    "message": "Invalid token"
}  `` at terminal. Because it's only authorized for admin , by default we are users .. likewise if you test put and delete method with same jwt token and adding an id in the URL we get the same msg because to access those we need to become an admin..


**# To add an admin using MongoDB Compass (Because By default you are only a user), follow these steps:**

1. **Open MongoDB Compass**: Launch MongoDB Compass on your system.

2. **Connect to Your Database**: Connect MongoDB Compass to your MongoDB database by providing the connection string. You can find the connection string in the `config.js` file of our project.

3. **Navigate to Users Collection**: After successfully connecting, navigate to your database and locate the `Users` collection.

4. **Insert New Document**: Click on the "Insert Document" button to add a new document to the collection.

5. **Enter Admin User Details**: Enter the details of the user you want to make an admin. The document should contain at least the following fields:
   - `"username"`: Username of the admin user.
   - `"password"`: Hashed password of the admin user. (You can generate a hashed password using the `passwordUtils.js` script in our project.)(You can set a password in the code, I used abhiram, you can edit that, and run node passwordUtils in terminal. So you get hashed password like Hashed Password: $2a$10$JwPAuwNMRUXBzZmvfVqtJu3kSd209CurfdS/iPDzOqz7vUqaMdSxC)

6. **Set Role to Admin**: Additionally, include a field `"role"` with the value `"admin"` to designate the user as an admin.

7. **Save Document**: Once you've entered the user details, click the "Insert" button to save the document to the collection.

8. **Verify**: Verify that the admin user has been successfully added to the `Users` collection with the role set to admin.


**Now login with the same user name and the password (original password not the hashed password) to get the jwt token for admin (copy that, we need to use that to perform post, put and delete methods)**


**### Performing CRUD Operations (Admin Only)**

To perform Create, Update, and Delete operations on movies, you need to be an admin.

1. **Add a Movie**: Add a new movie to the database:
    - **Method**: POST
    - **URL**: `localhost:5555/movies`
    - **Body**: Movie details
    - **Authorization Header**: JWT token for admin user (Token we copied in last login)

2. **Update a Movie**: Update an existing movie:
    - **Method**: PUT
    - **URL**: `localhost:5555/movies/{movie_id}`
    - **Body**: Updated movie details
    - **Authorization Header**: JWT token for admin user

3. **Delete a Movie**: Delete a movie from the database:
    - **Method**: DELETE
    - **URL**: `localhost:5555/movies/{movie_id}`
    - **Authorization Header**: JWT token for admin user

Now we can test the Get method with /movies again to see the updated data's in the Movie Lobby.
Also Likewise, We can do the integration Testing using postman itself, if needed.

