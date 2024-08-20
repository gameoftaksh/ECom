from rest_framework import permissions
from rolepermissions.checkers import has_permission

class HasRolePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        required_permission = getattr(view, 'required_permission', None)
        if required_permission:
            return has_permission(request.user, required_permission)
        return True
