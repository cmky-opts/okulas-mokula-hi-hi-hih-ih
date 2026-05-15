// Events data with associated matches
export const events = [
  {
    id: "saudi-pro-league-2024",
    name: "Saudi Pro League",
    image: "/event.jpg",
    description: "Saudi Professional Football League",
    matches: [
      {
        id: "match-1",
        homeTeam: "Al Ahli",
        awayTeam: "Al Hilal",
        homeLogo: "/Logo-01.png",
        awayLogo: "/Logo-01.png",
        dateTime: "May 17 · 18:30",
        venue: "King Abdullah Stadium",
        tournament: "Saudi Pro League",
        status: "Ongoing",
        score: "2 - 1",
        phase: "65'",
      },
      {
        id: "match-2",
        homeTeam: "Al Nassr",
        awayTeam: "Al Ittihad",
        homeLogo: "/Logo-01.png",
        awayLogo: "/Logo-01.png",
        dateTime: "May 18 · 21:00",
        venue: "Mrsool Park",
        tournament: "Saudi Pro League",
        status: "Upcoming",
        score: "-",
        phase: "",
      },
      {
        id: "match-3",
        homeTeam: "Al Fateh",
        awayTeam: "Al Taawoun",
        homeLogo: "/Logo-01.png",
        awayLogo: "/Logo-01.png",
        dateTime: "May 19 · 16:00",
        venue: "Al Majma'ah",
        tournament: "Saudi Pro League",
        status: "Upcoming",
        score: "-",
        phase: "",
      },
    ],
  },
  {
    id: "saudi-cup-2024",
    name: "Saudi Cup",
    image: "/event.jpg",
    description: "Saudi Cup Football Tournament",
    matches: [
      {
        id: "match-4",
        homeTeam: "Al Shabab",
        awayTeam: "Al Wehda",
        homeLogo: "/Logo-01.png",
        awayLogo: "/Logo-01.png",
        dateTime: "May 20 · 19:00",
        venue: "Prince Abdullah Al-Faisal Stadium",
        tournament: "Saudi Cup",
        status: "Upcoming",
        score: "-",
        phase: "",
      },
      {
        id: "match-5",
        homeTeam: "Al Raed",
        awayTeam: "Al Adalah",
        homeLogo: "/Logo-01.png",
        awayLogo: "/Logo-01.png",
        dateTime: "May 21 · 20:00",
        venue: "Prince Abdullah Al-Faisal Stadium",
        tournament: "Saudi Cup",
        status: "Ongoing",
        score: "1 - 0",
        phase: "45'",
      },
    ],
  },
  {
    id: "pro-league-2024",
    name: "Pro League",
    image: "/event.jpg",
    description: "Professional Football League",
    matches: [
      {
        id: "match-6",
        homeTeam: "Al Khaleej",
        awayTeam: "Al Fayha",
        homeLogo: "/Logo-01.png",
        awayLogo: "/Logo-01.png",
        dateTime: "May 22 · 17:30",
        venue: "King Saud Stadium",
        tournament: "Pro League",
        status: "Upcoming",
        score: "-",
        phase: "",
      },
    ],
  },
];

// Helper function to find event by ID
export const getEventById = (eventId) => {
  return events.find((event) => event.id === eventId);
};

// Helper function to get matches by event ID
export const getMatchesByEventId = (eventId) => {
  const event = getEventById(eventId);
  return event ? event.matches : [];
};

// Helper function to filter matches by status
export const filterMatchesByStatus = (matches, status) => {
  if (status === "all") return matches;
  return matches.filter((match) => match.status === status);
};
