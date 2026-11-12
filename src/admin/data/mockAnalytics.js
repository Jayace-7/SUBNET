import avatarPoster from "../../assets/trending/Avatar The Last Airbender.webp";
import batmanPoster from "../../assets/trending/The Batman.webp";
import dunePoster from "../../assets/trending/Dune Part Two.webp";
import equalizerPoster from "../../assets/action/The Equalizer 3.webp";
import kingOfBoysPoster from "../../assets/nollywood movies/King of Boys.webp";
import oppenheimerPoster from "../../assets/trending/Oppenheimer.webp";
import spiderManPoster from "../../assets/trending/Spider-Man.webp";
import witcherPoster from "../../assets/action series/The Witcher.webp";
import blacklistPoster from "../../assets/tvshows/exciting tv shows/The Blacklist.webp";
import breakingBadPoster from "../../assets/action series/Breaking bad.webp";
import moneyHeistPoster from "../../assets/tvshows/exciting tv shows/money heist.webp";
import narcosPoster from "../../assets/tvshows/exciting tv shows/Narcos.webp";
import sealTeamPoster from "../../assets/tvshows/exciting tv shows/Seal Team.webp";
import sandmanPoster from "../../assets/action series/The Sandman.webp";
import vikingsPoster from "../../assets/tvshows/exciting tv shows/vikings.webp";
import johnWickPoster from "../../assets/action/John Wick  Chapter 4.webp";

// All metrics and event details in this module are demonstration data.
export const KPI_METRICS = [
  {
    label: "Total Users",
    value: "128,450",
    growth: "+12.8%",
    trend: [18, 30, 22, 38, 25, 34, 24, 42, 30, 45, 37, 54],
    icon: "users",
  },
  {
    label: "Total Streams",
    value: "842,390",
    growth: "+18.4%",
    trend: [15, 24, 19, 34, 22, 30, 25, 42, 31, 48, 41, 58],
    icon: "streams",
  },
  {
    label: "Total Revenue",
    value: "₦24.8M",
    growth: "+9.6%",
    trend: [18, 24, 20, 32, 25, 36, 28, 38, 34, 46, 41, 51],
    icon: "revenue",
  },
  {
    label: "Active Users",
    value: "18,290",
    growth: "+6.3%",
    trend: [18, 28, 21, 33, 25, 36, 30, 39, 33, 46, 38, 50],
    icon: "active",
  },
];

export const STREAMING_PERIODS = {
  "7D": {
    totalStreams: "184,620",
    newUsers: "4,280",
    labels: ["Nov 6", "Nov 7", "Nov 8", "Nov 9", "Nov 10", "Nov 11", "Nov 12", "Today"],
    streams: [340, 410, 390, 510, 470, 620, 560, 710],
    users: [180, 230, 205, 300, 270, 350, 325, 390],
  },
  "30D": {
    totalStreams: "842,390",
    newUsers: "18,290",
    labels: ["Oct 14", "Oct 18", "Oct 22", "Oct 26", "Oct 30", "Nov 3", "Nov 7", "Today"],
    streams: [360, 500, 430, 620, 500, 670, 570, 780],
    users: [210, 330, 260, 390, 300, 450, 340, 500],
  },
  "90D": {
    totalStreams: "2.4M",
    newUsers: "52,810",
    labels: ["Aug 14", "Aug 26", "Sep 7", "Sep 19", "Oct 1", "Oct 13", "Oct 25", "Today"],
    streams: [280, 390, 360, 510, 470, 630, 590, 820],
    users: [150, 230, 210, 330, 280, 390, 350, 480],
  },
  "1Y": {
    totalStreams: "9.8M",
    newUsers: "214,670",
    labels: ["Dec", "Feb", "Apr", "Jun", "Aug", "Sep", "Oct", "Nov"],
    streams: [190, 310, 280, 440, 410, 590, 650, 860],
    users: [110, 190, 170, 280, 260, 370, 420, 540],
  },
};

export const TOP_CONTENT = {
  movies: [
    { title: "The Batman", category: "Action · Thriller", views: "842K", image: batmanPoster },
    { title: "Dune: Part Two", category: "Sci-Fi · Adventure", views: "620K", image: dunePoster },
    { title: "John Wick: Chapter 4", category: "Action", views: "583K", image: johnWickPoster },
    { title: "King of Boys", category: "Drama · Crime", views: "491K", image: kingOfBoysPoster },
    { title: "Oppenheimer", category: "Drama · History", views: "438K", image: oppenheimerPoster },
    { title: "The Equalizer 3", category: "Action · Thriller", views: "396K", image: equalizerPoster },
    { title: "Spider-Man", category: "Action · Adventure", views: "352K", image: spiderManPoster },
    { title: "Avatar: The Last Airbender", category: "Fantasy · Adventure", views: "318K", image: avatarPoster },
  ],
  shows: [
    { title: "The Witcher", category: "Fantasy · Adventure", views: "782K", image: witcherPoster },
    { title: "The Blacklist", category: "Crime · Thriller", views: "664K", image: blacklistPoster },
    { title: "Narcos", category: "Crime · Drama", views: "592K", image: narcosPoster },
    { title: "Seal Team", category: "Action · Drama", views: "521K", image: sealTeamPoster },
    { title: "Money Heist", category: "Crime · Thriller", views: "487K", image: moneyHeistPoster },
    { title: "The Sandman", category: "Fantasy · Drama", views: "431K", image: sandmanPoster },
    { title: "Vikings", category: "Action · History", views: "378K", image: vikingsPoster },
    { title: "Breaking Bad", category: "Crime · Drama", views: "345K", image: breakingBadPoster },
  ],
  genres: [
    { title: "Action", category: "Genre", views: "1.42M", image: equalizerPoster },
    { title: "Sci-Fi", category: "Genre", views: "1.08M", image: dunePoster },
    { title: "Crime & Thriller", category: "Genre", views: "928K", image: batmanPoster },
    { title: "Drama", category: "Genre", views: "806K", image: kingOfBoysPoster },
    { title: "Fantasy", category: "Genre", views: "684K", image: witcherPoster },
    { title: "History", category: "Genre", views: "572K", image: oppenheimerPoster },
  ],
};

export const MOCK_SERVICES = [
  { name: "API Services", status: "Operational", uptime: "99.99%" },
  { name: "Database", status: "Operational", uptime: "99.98%" },
  { name: "Streaming", status: "Operational", uptime: "99.96%" },
  { name: "CDN", status: "Operational", uptime: "99.95%" },
];

export const MOCK_ACTIVITY = [
  { icon: "user", message: "New user registered", detail: "Ada O.", time: "2 min ago" },
  { icon: "play", message: "Movie completed: The Batman", detail: "Chidi A.", time: "5 min ago" },
  { icon: "subscription", message: "Premium subscription activated", detail: "Tolu K.", time: "8 min ago" },
  { icon: "settings", message: "Settings updated", detail: "Admin", time: "12 min ago" },
  { icon: "user", message: "New user registered", detail: "Musa B.", time: "19 min ago" },
  { icon: "subscription", message: "Standard plan renewed", detail: "Zara E.", time: "26 min ago" },
  { icon: "play", message: "Series completed: The Witcher", detail: "Ife A.", time: "34 min ago" },
  { icon: "settings", message: "Content featured", detail: "Admin", time: "48 min ago" },
];

export const SUBSCRIPTION_DISTRIBUTION = [
  { label: "Premium", percentage: 68, subscribers: "8,486", color: "#00d4c7" },
  { label: "Standard", percentage: 24, subscribers: "2,995", color: "#008f98" },
  { label: "Basic", percentage: 8, subscribers: "999", color: "#53676b" },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: "New admin activity", detail: "A new administrator account was created.", time: "5 min ago", unread: true },
  { id: 2, title: "Content review due", detail: "3 titles are waiting for review.", time: "22 min ago", unread: true },
  { id: 3, title: "Weekly report ready", detail: "Your sample streaming summary is available.", time: "1 hr ago", unread: true },
];
