import { LostItem } from "./types";

export const getLostItems = (): Promise<LostItem[]> => {
  // This is a mock function. Replace it with your actual data fetching logic.
  return Promise.resolve([
    {
      id: "1",
      title: "Blue Backpack",
      description: "A blue backpack with white stripes",
      date_lost: "2023-08-15",
      location: "Central Park",
      status: "open",
      is_official_document: false
    },
    {
      id: "2",
      title: "Passport",
      description: "A lost passport",
      date_lost: "2023-08-15",
      location: "Times Square",
      status: "open",
      is_official_document: true
    },
    {
      id: "3",
      title: "Laptop",
      description: "A lost laptop",
      date_lost: "2023-08-15",
      location: "Empire State Building",
      status: "open",
      is_official_document: false
    // ... add more mock items
    }
  ])
}