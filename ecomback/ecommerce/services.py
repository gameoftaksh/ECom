from rolepermissions.roles import assign_role
from .models import User
from .roles import GuestUser, LoggedInUser, VendorAdmin, SuperAdmin

def create_user_with_role(email, first_name, password, role='loggedin-user', **extra_fields):
    user = User.objects.create_user(email=email, first_name=first_name, password=password, role=role, **extra_fields)
    
    role_map = {
        'guest-user': GuestUser,
        'loggedin-user': LoggedInUser,
        'vendor-admin': VendorAdmin,
        'super-admin': SuperAdmin
    }
    
    role_class = role_map.get(role)
    print(role_class)
    if role_class:
        assign_role(user, role_class)
    else:
        # Handle the case where an invalid role is provided
        print(f"Warning: Invalid role '{role}' provided. No role assigned.")
    
    return user
