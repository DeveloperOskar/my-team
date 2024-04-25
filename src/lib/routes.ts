enum Section {
  data = "data",
  tools = "tools",
}

export const CoachingRoutes: {
  [key in Section]: {
    text: string;
    href: string;
    belongsTo: string;
  }[];
} = {
  data: [
    {
      text: "Livsmedel",
      href: "/coaching/data/foods",
      belongsTo: "coaching/data",
    },
    {
      text: "Klienter",
      href: "/coaching/data/clients",
      belongsTo: "coaching/data",
    },
    {
      text: "Övningar",
      href: "/coaching/data/exercises",
      belongsTo: "coaching/data",
    },
  ],
  tools: [
    {
      text: "Måltidsplaneraren",
      href: "/coaching/tools/meal-plan",
      belongsTo: "coaching/tools",
    },
    {
      text: "Träningsplaneraren",
      href: "/coaching/tools/exercise-plan",
      belongsTo: "coaching/tools",
    },
  ],
};
