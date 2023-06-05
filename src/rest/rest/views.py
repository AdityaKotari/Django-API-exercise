from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os, datetime
# I believe json isn't able to use dumps on ObjectId objects from pymongo. using pymongo's bson instead.
import bson.json_util as json_util

from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todo_collection = db['todo_collection']

class TodoListView(APIView):
    
    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        
        return Response(
            json_util.dumps({"todo": list(todo_collection.find({}))}), 
            status=status.HTTP_200_OK)
        
    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.

        try: 
            body = json_util.loads(request.body)
        except:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        if 'todo' not in body:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        try:
            todo_collection.insert_one({
                "todo": body['todo'],
                "date": datetime.datetime.utcnow()
            })
            return Response(
                json_util.dumps({"todo": list(todo_collection.find({}))}), 
                status=status.HTTP_200_OK)
        except:
            return Response({}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

