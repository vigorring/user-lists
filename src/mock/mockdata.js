export const mockupData = [
  {
    id: "1",
    title: "Manufacturing",
    childNodes: [
      {
        id: "2",
        parentId: "1",
        title: "Construction materials"
      },
      {
        id: "3",
        parentId: "1",
        title: "Electronics and Optics"
      },
      {
        id: "4",
        parentId: "1",
        title: "Food and Beverage",
        childNodes: [
          {
            id: "5",
            parentId: "4",
            title: "Bakery & confectionery products",
          },
          {
            id: "6",
            parentId: "4",
            title: "Beverages",
          },
          {
            id: "7",
            parentId: "4",
            title: "Fish & fish products ",
          },
        ],
      },
    ],
  }
];
