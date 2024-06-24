import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const Sidebar = () => {
  // Get the current location using the useLocation hook from React Router
  const location = useLocation();
  const navigate = useNavigate();

  const handleUserPermissions = () => {
    const storedUser = JSON.parse(localStorage.getItem('USER'));
    const currentUserRole = storedUser ? storedUser.type : null;

    return currentUserRole;
  }


  // Logout Function
  const handleLogOutButtonClick = () => {

    // Remove User Data from Local Storage
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('USER')

    // Navigate to login page
    navigate("/login")
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Happy Child
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home" active={location.pathname === '/'}>
                Home
              </CDBSidebarMenuItem>
            </NavLink>
            {handleUserPermissions() === 'ADMIN' ?
              <div>
                <NavLink exact to="/teachers" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="chalkboard-teacher" active={location.pathname === '/teachers'}>
                    Teachers
                  </CDBSidebarMenuItem>
                </NavLink>
              </div> : <div />
            }
            {handleUserPermissions() === 'ADMIN' || handleUserPermissions() === 'TEACHER' ?
              <div>
                <NavLink exact to="/students" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user" active={location.pathname === '/students'}>
                    Students
                  </CDBSidebarMenuItem>
                </NavLink>
              </div> : <div />
            }
            {handleUserPermissions() === 'ADMIN' ?
              <div>
                <NavLink exact to="/creators" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="book" active={location.pathname === '/creators'}>
                    Assessment Creators
                  </CDBSidebarMenuItem>
                </NavLink>
              </div> : <div />
            }
            {handleUserPermissions() === 'ADMIN' || handleUserPermissions() === 'CREATOR' ?
              <div>
                <NavLink exact to="/assessments" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="clipboard-check" active={location.pathname === '/assessments'}>
                    Assessments
                  </CDBSidebarMenuItem>
                </NavLink>
              </div> : <div />
            }
            {handleUserPermissions() === 'ADMIN' || handleUserPermissions() === 'CREATOR' ?
              <div>
                <NavLink exact to="/goals" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="bullseye" active={location.pathname === '/goals'}>
                    Goals
                  </CDBSidebarMenuItem>
                </NavLink>
              </div> : <div />
            }
            {handleUserPermissions() === 'ADMIN' || handleUserPermissions() === 'TEACHER' || handleUserPermissions() === 'STUDENT' ?
              <div>
                <NavLink exact to="/reports" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="file" active={location.pathname === '/reports'}>
                    Reports
                  </CDBSidebarMenuItem>
                </NavLink>
              </div> : <div />
            }
            {handleUserPermissions() === 'TEACHER' || handleUserPermissions() === 'CREATOR' || handleUserPermissions() === 'STUDENT' ?
              <div>
                <NavLink exact to="/my-profile" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user-circle" active={location.pathname === '/my-profile'}>
                    My Profile
                  </CDBSidebarMenuItem>
                </NavLink>
              </div> : <div />
            }
            {/* Add other menu items with corresponding routes */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center', margin: '10px' }}>
          <Button onClick={handleLogOutButtonClick}>
            Log Out
          </Button>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
