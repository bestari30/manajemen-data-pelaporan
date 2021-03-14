import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  Business,
  Book,
  Info,
  NaturePeople,
  School,
  Publish,
  Storage,
  Person,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  // {
  //   id: 1,
  //   label: "Typography",
  //   link: "/app/typography",
  //   icon: <TypographyIcon />,
  // },
  {
    id: 1,
    label: "Penelitian",
    link: "/app/penelitian",
    icon: <Book />,
  },
  {
    id: 2,
    label: "Publikasi",
    link: "/app/publikasi",
    icon: <Publish />,
  },
  {
    id: 3,
    label: "Data Dosen",
    link: "/app/dosen",
    icon: <Storage />,
    children: [
      { label: "Dosen", link: "/app/dosen" },
      { label: "Sertifikasi", link: "/app/sertifikasi" },
      { label: "Studi Lanjut", link: "/app/studiLanjut" },
      { label: "NIDK", link: "/app/nidk" },
      { label: "HAKI", link: "/app/haki" },
    ],
  },
  {
    id: 4,
    label: "Data Mahasiswa",
    link: "/app/mahasiswa",
    icon: <Person />,
  },
  {
    id: 5,
    label: "Prestasi Mahasiswa",
    link: "/app/prestasiMahasiswa",
    icon: <School />,
  },
  {
    id: 6,
    label: "Kerjasama",
    link: "/app/kerjasama",
    icon: <Business />,
  },
  {
    id: 7,
    label: "Pengabdian Masyarakat",
    link: "/app/pengabdianMasyarakat",
    icon: <NaturePeople />,
  },
  {
    id: 8,
    label: "Data master",
    link: "",
    icon: <Info />,
    children: [
      { label: "Program Studi", link: "/app/programstudi" },
      { label: "Jenis Partner", link: "/app/jenispartner" },
      { label: "Jenis Dokumen", link: "/app/jenisdokumen" },
      { label: "Bentuk Kegiatan", link: "/app/bentukkegiatan" },
      { label: "Tingkat", link: "/app/tingkat" },
      { label: "Negara", link: "/app/negara" },
      { label: "Kategori", link: "/app/kategori" },
    ],
  },
  // {
  //   id: 6,
  //   label: "Notifications",
  //   link: "/app/notifications",
  //   icon: <NotificationsIcon />,
  // },
  // {
  //   id: 7,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  // { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  // { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
