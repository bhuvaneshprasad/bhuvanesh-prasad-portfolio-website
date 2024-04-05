
  export const routes = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Projects",
      path: "/projects",
    },
    {
        title: "Blog",
        path: "/blog",
      },
    // {
    //   title: "Contact",
    //   path: "/contact",
    // },
  ];
  
  
  export const footer = {
    columns: [
      {
        title: "Pages",
        links: [
          {
            name: "Home",
            link: "/",
            leavesWebsite: false,
          },
          {
            name: "Projects",
            link: "/projects",
            leavesWebsite: false,
          },
          {
            name: "Blog",
            link: "/blog",
            leavesWebsite: false,
          },
          // {
          //   name: "Contact",
          //   link: "/contact",
          //   leavesWebsite: false,
          // },
        ],
      },
      {
        title: "Social",
        links: [
          {
            name: "GitHub",
            link: "https://github.com/bhuvaneshprasad.com",
            icon: "/github.svg",
            leavesWebsite: true,
            style: { filter: "invert(1)" },
          },
          {
            name: "LinkedIn",
            link: "https://www.linkedin.com/in/bhuvaneshprasad/",
            icon: "/linkedin.svg",
            leavesWebsite: true,
          },
          {
            name: "Email",
            link: "mailto:bhuvaneshprasad10@gmail.com",
            icon: "/email.svg",
            leavesWebsite: true,
            style: { filter: "invert(1)" },
          },
          {
            name: "Kaggle",
            link: "https://www.kaggle.com/bhuvaneshprasad",
            icon: "/kaggle.svg",
            leavesWebsite: true,
            style: { filter: "invert(1)" },
          },
        ],
      },
    ],
    otherWebsites: [
        {
            name: "Gadget Pulse",
            link: "https://gadgetpulse.in",
            icon: "/gpo.svg",
            style: { filter: "invert(1)" },
        },
        // {
        //     name: "FolioZ",
        //     link: "https://folioz.in",
        //     icon: "/folioz.svg"
        // }
    ],
  };