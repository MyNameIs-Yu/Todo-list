import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Task


@csrf_exempt
def tasks_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all().order_by('-id')

        return JsonResponse(
            [
                {
                    "id": task.id,
                    "title": task.title,
                    "isDone": task.is_done,
                }
                for task in tasks
            ],
            safe=False
        )

    if request.method == 'POST':
        data = json.loads(request.body)

        task = Task.objects.create(
            title=data["title"]
        )

        return JsonResponse({
            "id": task.id,
            "title": task.title,
            "isDone": task.is_done,
        })
        

@csrf_exempt
def task_detail(request, task_id):
    task = Task.objects.get(id=task_id)

    if request.method == 'PUT':
        data = json.loads(request.body)

        task.title = data["title"]
        task.is_done = data["isDone"]

        task.save()

        return JsonResponse({
            "success": True
        })

    if request.method == 'DELETE':
        task.delete()

        return JsonResponse({
            "success": True
        })


@csrf_exempt
def clear_tasks(request):
    if request.method == 'DELETE':
        Task.objects.all().delete()

        return JsonResponse({
            "success": True
        })