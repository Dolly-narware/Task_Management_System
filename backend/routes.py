from flask import Blueprint, request, jsonify
from models import Task 
from app import db

from flask_jwt_extended import create_access_token, jwt_required,JWTManager, get_jwt_identity
task_bp = Blueprint('task_bp', __name__)

@task_bp.route('/tasks', methods=['GET'])
def get_tasks():
    # tasks = Task.query.all()
    # return jsonify([{'id': task.id, 'title': task.title, 'completed': task.completed} for task in tasks])
     return jsonify({'message': 'Task added successfully'})
@task_bp.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    # user_id = get_jwt_identity()
    data = request.get_json()
    
    new_task = Task(
        title=data['title'],
        description=data.get('description', ''),
        # user_id=user_id
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created"}), 201


# @task_bp.route('/tasks', methods=['POST'])
# def add_task():
#     data = request.get_json()
#     # new_task = Task(title=data['title'])
#     # db.session.add(new_task)
#     # db.session.commit()
#     # return jsonify({'message': 'Task added successfully'})
   

#     return jsonify({'message': data})


@task_bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    data = request.get_json()
    task.completed = data.get('completed', task.completed)
    db.session.commit()
    return jsonify({'message': 'Task updated successfully'})

@task_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})