from django.urls import path

from .views import (
    tasks_list,
    task_detail,
    clear_tasks,
)

urlpatterns = [
    path('tasks/', tasks_list),
    path('tasks/<int:task_id>/', task_detail),
    path('tasks/clear/', clear_tasks),
]