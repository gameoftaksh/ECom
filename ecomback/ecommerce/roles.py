from rolepermissions.roles import AbstractUserRole

class GuestUser(AbstractUserRole):
    available_permissions = {
        'view_products': True,
        'view_categories': True,
    }

class LoggedInUser(AbstractUserRole):
    available_permissions = {
        'view_products': True,
        'view_categories': True,
        'add_to_cart': True,
        'place_order': True,
        'write_review': True,
        'manage_addresses': True,
        'view_coupons': True,
        'manage_products': False,
    }

class VendorAdmin(AbstractUserRole):
    available_permissions = {
        'view_products': True,
        'view_categories': True,
        'add_to_cart': True,
        'place_order': True,
        'write_review': True,
        'manage_products': True,
        'manage_orders': True,
    }

class SuperAdmin(AbstractUserRole):
    available_permissions = {
        'view_products': True,
        'view_categories': True,
        'add_to_cart': True,
        'place_order': True,
        'write_review': True,
        'manage_products': True,
        'manage_orders': True,
        'manage_users': True,
        'manage_permissions': True,
    }
