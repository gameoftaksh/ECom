from rolepermissions.roles import assign_role

class RoleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(request)
        pass
#        response = self.get_response(request)
#        if request.user.is_authenticated and not request.user.get_role():
#            assign_role(request.user, request.user.role)
#        return response
