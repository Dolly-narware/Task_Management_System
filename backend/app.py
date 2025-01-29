from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from  flask_restful import Resource,Api
from flask_jwt_extended import create_access_token, jwt_required,JWTManager, get_jwt_identity
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

app=Flask(__name__)
CORS(app)

app.config['SECRET_KEY']=' SUPER-SECRET-KEY'
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///database.db'

# //create instance of db
db=SQLAlchemy(app)
api=Api(app)
jwt=JWTManager(app)

# //create model
class User(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),nullable=False)
    emailid=db.Column(db.String(100),nullable=False)
    password=db.Column(db.String(100),nullable=False)

with app.app_context():
    db.create_all()

class UserRegistration(Resource):   
   def post(self):
        data=request.get_json()
        name=data.get('name')
        emailid=data['emailid']
        password=data['password']
        # input validation
        if not name or not emailid or not password:
            return{'message':'All the fields are required '},400

        # if not re.match(r"[^@]+@[^@]+\.[^@]+",emailid):
        #     return {'Invalid email format !'},400

        if len(password)<6:
            return {'message':"Password must be atleast 6 character long!"},400    
            #check if user already exists
        if User.query.filter_by(emailid=emailid).first():
            return {'message':'Emailid already taken'},400

#Hash the password the save the user

        new_user=User(name=name,emailid=emailid,password=password)  
        db.session.add(new_user)
        db.session.commit()

        return {'message':'User registered successfully'},201


class UserLogin(Resource):
    def post(self):
        data=request.get_json()
        # name=data.get('name')
        emailid=data['emailid']
        password=data['password']
        #input validation
        if   not emailid or not password:
            return{'message':'email and password are required'},400

        
        
            #check if user already exists
        user= User.query.filter_by(emailid=emailid).first()
        if not user:
            return {'message': 'User does not exist. Please register first.'}, 404

        # Verify the password (use hashed password comparison in production)
        if user.password != password:  
            return {'message': 'Invalid email or password'}, 401
            # return {'message':'Emailid already taken'},400
        if user and user.password==password:
            access_token=create_access_token(identity=str(user.id))
            return {'access_token':access_token},200



        return {'message':'Invalid emailid or password'},201

class protectedResource(Resource):
    @jwt_required()
    def get(self):
        current_user_id=get_jwt_identity() 
        return{'message': f"hello user {current_user_id},you accessed the protected resource"},200
api.add_resource(UserRegistration,'/register')
api.add_resource(UserLogin,'/login')
api.add_resource(protectedResource, '/secure')

if __name__=="__main__":
    app.run(debug=True)