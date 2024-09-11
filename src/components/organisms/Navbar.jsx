import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../reducer/Actions";
import Button from '../atoms/Button';
import { Avatar, Button as MTButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { Cog6ToothIcon, InboxArrowDownIcon, LifebuoyIcon, PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";

// Profile menu items for the dropdown
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    path: "/profile"
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    path: "/edit-profile"
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    path: "/inbox"
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    path: "/help"
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    action: "logout" // Custom action to handle logout
  },
];

const Navbar = ({ logout, isAuthenticated, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-com Store</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-600 cursor-pointer">Home</Link></li>
            {isAuthenticated ? (
              <>
                <li className="relative">
                  <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                    <MenuHandler>
                      <MTButton variant="text" color="blue-gray" className="flex items-center rounded-full p-0">
                        <Avatar variant="circular" size="sm" alt={user?.name} withBorder={true} color="blue-gray" className="h-12 w-12 p-0.5"  src={user?.picture || "https://docs.material-tailwind.com/img/face-2.jpg"} />
                        
                      </MTButton>
                      
                    </MenuHandler>
                    <p>Welcome, {user?.name}</p>
                    <MenuList className="p-1">
                      {profileMenuItems.map(({ label, icon, path, action }, key) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                          <MenuItem key={label} onClick={() => {
                              closeMenu();
                              if (action === "logout") {
                                logout();
                              } else {
                                // Handle navigation to specific paths
                                window.location.href = path;
                              }
                            }}
                            className={`flex items-center gap-2 rounded ${
                              isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                            }`}
                          >
                            {React.createElement(icon, {
                              className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                              strokeWidth: 2,
                            })}
                            <Typography
                              as="span"
                              variant="small"
                              className="font-normal"
                              color={isLastItem ? "red" : "inherit"}
                            >
                              {label}
                            </Typography>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Menu>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-600 cursor-pointer">Login</Link></li>
              </>
            )}
            <li>
              <Link to="/cart">
                <Button variant="secondary">
                  Cart
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user, // Assuming user info is stored here
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
