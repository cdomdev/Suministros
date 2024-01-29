// SubMenu.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

export const SubMenu = ({ label, items, className, image }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div
      className="menu-container"
      onMouseEnter={handleSubMenuToggle}
      onMouseLeave={handleSubMenuToggle}>
      <div className="menu-item">
        {label} <FaAngleDown />
        {isSubMenuOpen && (
          <div className={className}>
            <div>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    <NavLink to={item.to} className="nav-link-item">
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
