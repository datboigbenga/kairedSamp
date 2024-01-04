Make sure Postgres is installed on your machine.

Run "npm i" to install dependencies.

make a .env file iin the directory with details provided in .env.example file filling the correct info required

clear database with "npm run down-all"
input tables with "npm run migrate"
input seeds with "npm run seed"

run application with command "npm run dev"

Run enpoints given below:

Create User: POST
localhost:5000/api/v1/user

Verify Email: POST
localhost:5000/api/v1/user/verifyEmail

Resend Pin: POST
localhost:5000/api/v1/user/resendPin

Create Profile: POST
localhost:5000/api/v1/profile

Forgot Password: POST
localhost:5000/api/v1/user/forgotPassword

Reset Password: POST
localhost:5000/api/v1/user/resetPassword

Login User: POST
localhost:5000/api/v1/user/login

Logout User : DELETE
localhost:5000/api/v1/user/logout