import { useState } from "react";

import { Icon } from "@iconify/react";
import { navigate } from "astro:transitions/client";

type MenuType = {
  name: string;
  hrefLink?: string;
  link?: string;
  subMenu?: MenuType[];
};

const menus: MenuType[] = [
  {
    name: "About",
    subMenu: [
      {
        name: "Code of conduct",
        link: "/conduct",
      },
    ],
  },
  // {
  //   name: 'Program',
  //   hrefLink: '/#program',
  // },
  // {
  //   name: 'Schedule',
  //   link: '/schedule',
  // },
  // {
  //   name: 'Venue',
  //   link: '/venue',
  // },
  // {
  //   name: 'Sponsor',
  //   hrefLink: '/#sponsor',
  // },
  // {
  //   name: 'Speakers',
  //   hrefLink: '/speakers',
  // },
  {
    name: "Previous",
    subMenu: [
      {
        name: "PyCon Thailand 2023",
        hrefLink: "https://2023.th.pycon.org/",
      },
      {
        name: "PyCon Thailand 2021",
        hrefLink: "https://2021.th.pycon.org/",
      },
      {
        name: "PyCon Thailand 2019",
        hrefLink: "https://2019.th.pycon.org/",
      },
      {
        name: "PyCon Thailand 2018",
        hrefLink: "https://2019.th.pycon.org/pycon2018/",
      },
    ],
  },
];

// Navbar component with good accessibility
const Navbar = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const toggleOpenMobileNav = () => setOpenMobileNav((cur) => !cur);

  const navigateTo = (link: any) => {
    setOpenMobileNav(false);
    navigate(link);
  };

  // Render menu list
  const listMenu = () => {
    // Render sub menu
    const listSubMenu = (subMenu: MenuType[]) => {
      return subMenu.map((menu, index) => {
        return (
          <li key={"menu-subitem-index-" + index}>
            {menu.link && (
              <p onClick={() => navigateTo(menu.link)}>{menu.name}</p>
            )}
            {menu.hrefLink && (
              <a href={menu.hrefLink ? menu.hrefLink : "#"}>{menu.name}</a>
            )}
          </li>
        );
      });
    };

    // Render menu
    return menus.map((menu, index) => {
      return (
        <div
          key={"menu-item-index-" + index}
          className="dropdown max-md:dropdown-bottom lg:dropdown-end"
        >
          {menu.link ? (
            <p
              onClick={() => navigateTo(menu.link)}
              className="flex cursor-pointer items-center justify-end gap-x-2"
            >
              {menu.name} {menu.subMenu && <Icon icon="uil:angle-down" />}
            </p>
          ) : (
            <a
              tabIndex={0}
              className="flex items-center justify-end gap-x-2"
              href={menu.hrefLink ? menu.hrefLink : "#"}
            >
              {menu.name} {menu.subMenu && <Icon icon="uil:angle-down" />}
            </a>
          )}
          {menu.subMenu && (
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[256] mt-2 w-52 rounded-box bg-white p-2 shadow"
            >
              {listSubMenu(menu.subMenu)}
            </ul>
          )}
        </div>
      );
    });
  };

  const PyConLogo = () => (
    <a href="/">
      <img
        src="/images/common/2025/pyconth_logo@2x.png"
        alt="PyCon Thailand 2023"
        className="inline-block h-12"
      />
    </a>
  );

  return (
    <nav className="left-0 top-0 mx-auto w-full px-4 py-10 xl:px-16">
      <div className="flex flex-wrap items-center justify-between">
        <div className="inline-flex items-center justify-between max-lg:w-full">
          <PyConLogo />

          <div className="inline-block lg:hidden">
            <div className="flex">
              {/* TODO: Move to component? */}
              {/* <a href='https://www.eventpop.me/e/15840'>
                <button className='flex items-center ml-2 bg-primary text-white p-2 w-max'>
                  Buy Ticket <Icon className='ml-2' icon='ion:ticket-outline' />
                </button>
              </a> */}
              <button
                className="flex items-center px-3 py-2"
                onClick={toggleOpenMobileNav}
              >
                <Icon
                  icon={openMobileNav ? "mdi:close" : "mdi:menu"}
                  color="#000"
                  className="h-8 w-8"
                />
              </button>
            </div>
          </div>
        </div>

        <div className={`flex items-center gap-x-8 text-black max-lg:hidden`}>
          {/* Menu render */}
          {listMenu()}
          {/* TODO: Move to component? */}
          {/* <a href='https://www.eventpop.me/e/15840'>
            <button className='flex items-center ml-2 bg-primary text-white p-2 w-max'>
              Buy Ticket <Icon className='ml-2' icon='ion:ticket-outline' />
            </button>
          </a> */}
        </div>

        <div
          className={`text-black ${openMobileNav ? "lg:hidden" : "hidden border-b-0 max-lg:py-0"} flex flex-col gap-x-8 gap-y-4 border-b-2 border-pyconth-violet-600 py-4 transition-all max-lg:w-full max-lg:items-center`}
        >
          {/* Menu render */}
          {listMenu()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
