import React, { useState, useEffect } from 'react';
import { getMenuItems } from '../utils/get-menu-items';

const Sidebar = ({ userSession }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({});
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getMenuItems(userSession);
      setMenuItems(items);
      const submenuState = {};
      items.forEach(item => {
        submenuState[item.label] = false;
      });
      setIsSubmenuOpen(submenuState);
    };

    fetchMenuItems();
  }, [userSession]);

  const toggleSubmenu = (label) => {
    setIsSubmenuOpen((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsSidebarExpanded(true)}
      onMouseLeave={() => setIsSidebarExpanded(false)}
    >
      {/* Sidebar collapsed */}
      <div
        className={`bg-gray-800 text-white h-screen w-16 fixed top-0 left-0 z-10 transition-all duration-300 ease-in-out`}
      >
        <div className="scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-gray-900 scrollbar-thumb-gray-600 overflow-y-auto">
          <ul>
            {menuItems.map((item) => (
              <li key={item.label} className="flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-700">
                  <span>{item.iconName}</span> {/* Aquí puedes usar un componente de íconos */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar expanded */}
      {isSidebarExpanded && (
        <div
          className={`bg-gray-800 text-white h-screen w-64 fixed top-0 left-0 z-20 transition-all duration-300 ease-in-out shadow-lg`}
        >
          <div className="scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-gray-900 scrollbar-thumb-gray-600 overflow-y-auto">
            <ul>
              {menuItems.map((item) => (
                <li key={item.label} className="flex flex-col">
                  <div
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => item.subItems.length > 0 && toggleSubmenu(item.label)}
                  >
                    <span>{item.iconName}</span>
                    <span>{item.label}</span>
                    {item.subItems.length > 0 && <span>▼</span>}
                  </div>

                  {item.subItems.length > 0 && (
                    <ul
                      className={`ml-4 bg-gray-700 overflow-hidden transition-max-height duration-300 ease-in-out ${
                        isSubmenuOpen[item.label] ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <li key={subItem.label} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-600">
                          <span>{subItem.iconName}</span>
                          <a href={subItem.url}>{subItem.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
