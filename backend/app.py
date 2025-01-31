from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from  flask_restful import Resource,Api
from flask_jwt_extended import create_access_token, jwt_required,JWTManager, get_jwt_identity
from flask_cors import CORS
from datetime import datetime
from datetime import timedelta
from dotenv import load_dotenv
load_dotenv()
# from routes import task_bp
# from models import db

app=Flask(__name__)
CORS(app)

app.config['SECRET_KEY']=' SUPER-SECRET-KEY'
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///database4.db'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

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

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), nullable=True)  # Ensure description column exists
    status = db.Column(db.String(200), default="pending")
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


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
    # def get(self):
    #     current_user_id=get_jwt_identity() 
    #     return{'message': f"hello user {current_user_id},you accessed the protected resource"},200
    def get(self):
        user_id = get_jwt_identity()
        tasks = Task.query.filter_by(user_id=user_id).all()
        return [{
            "id": task.id,
            "title": task.title,
            "status": task.status,
            "description": task.description
        } for task in tasks], 200
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        
        new_task = Task(
            title=data['title'],
            description=data['description'],
            status="pending",
            user_id=user_id
        )
        db.session.add(new_task)
        db.session.commit()
        return {"message": "Task created"}, 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"message": "Task not found"}), 404

    data = request.get_json()
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = data.get('status', task.status)
    db.session.commit()
    return jsonify({"message": "Task updated"}), 200

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"message": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"}), 200

api.add_resource(UserRegistration,'/register')
api.add_resource(UserLogin,'/login')
api.add_resource(protectedResource, '/tasks')



    

# app.register_blueprint(task_bp)
if __name__=="__main__":
    app.run(debug=True)