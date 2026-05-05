export const NEIGHBORHOODS = [
  { 
    id: "yorkville", 
    name: "Yorkville", 
    avgPrice: "$1.4M", 
    trend: "+5.2% YoY", 
    schools: "A+", 
    amenities: ["High-end Dining", "Luxury Shopping", "Museums", "Transit Hub"],
    description: "Toronto's most prestigious neighborhood, known for its chic boutiques, fine dining, and cultural attractions.",
    soldProperties: 42
  },
  { 
    id: "beaches", 
    name: "The Beaches", 
    avgPrice: "$1.8M", 
    trend: "+3.8% YoY", 
    schools: "A", 
    amenities: ["Boardwalk", "Beaches", "Parks", "Local Cafes"],
    description: "A laid-back, community-focused neighborhood with stunning lakefront views and a vibrant boardwalk culture.",
    soldProperties: 28
  },
  { 
    id: "forest-hill", 
    name: "Forest Hill", 
    avgPrice: "$3.2M", 
    trend: "+2.1% YoY", 
    schools: "A+", 
    amenities: ["Top Schools", "Historic Architecture", "Parks", "Private Clubs"],
    description: "An affluent, historic neighborhood featuring stately homes, winding streets, and some of the city's finest schools.",
    soldProperties: 15
  }
];

export const TEAM = [
  { name: "Maya", title: "Market Scout", welcomeMessage: "Hello! I'm Maya. I'm busy scouring the GTA for those hidden gems. What's on your real estate radar today?", bio: "I have my eyes on every street in the GTA. I spot the deals before they hit the public market.", insight: "Market Tip: Inventory in the Beaches is tightening - act fast.", roleHighlight: "Expertly analyzes market data to uncover off-market opportunities.", aboutMe: "A lifelong Torontonian with a passion for urban development, Maya leverages high-tech data scraping tools to pinpoint emerging neighborhoods long before they reach mainstream investor attention.", socialLinks: { linkedin: "#", twitter: "#", instagram: "#" }, image: "https://www.shutterstock.com/image-photo/beauty-charisma-head-shot-portrait-600nw-2647728057.jpg" },
  { name: "Elias", title: "Outreach Lead", welcomeMessage: "Hey there, Elias here! I'm out connecting buyers to sellers in off-market deals. What kind of property are you looking for?", bio: "I’m the bridge builder. I connect Paul’s buyers with sellers who haven't even listed yet.", insight: "Weekly Update: 4 new off-market opportunities in Rosedale.", roleHighlight: "Builds strategic relationships to bridge buyers and sellers.", aboutMe: "Elias brings a decade of high-stakes negotiations experience, specializing in off-market transactions. He is the master of empathy, turning cold leads into warm partnerships.", socialLinks: { linkedin: "#", twitter: "#", instagram: "#" }, image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=" },
  { name: "Sarah", title: "Concierge", welcomeMessage: "Hi, I'm Sarah, Paul's Concierge. I'm here to make sure your journey is seamless. How can I get you started?", bio: "I’m the gatekeeper. I protect Paul’s time by ensuring every meeting on his calendar is a high-value opportunity.", insight: "Pro-Tip: Prepare your financial pre-approval before our initial consult.", roleHighlight: "Optimizes Paul’s calendar for maximum impact and value.", aboutMe: "With a background in luxury hospitality, Sarah ensures every client interaction is flawlessly prepped and personalized, managing the complexities of schedule so that focus remains on the client.", socialLinks: { linkedin: "#", twitter: "#", instagram: "#" }, image: "https://i.pinimg.com/236x/26/1d/09/261d09ebc9989a2dd442152d89c4d54f.jpg" },
  { name: "Vince", title: "Partner Manager", welcomeMessage: "Vince here! Just finished vetting a contractor. Need any advice on home improvements or trade recommendations?", bio: "I know the best trades in Toronto. If you need a kitchen done right, I’ve got the contractor on speed-dial.", insight: "Trade Alert: Lead times for custom cabinets are currently 6-8 weeks.", roleHighlight: "Curates and manages a premier network of trusted trade partners.", aboutMe: "Vince is a former construction project manager who turned to real estate. He vets every single trade professional, ensuring that any renovation or repair meets the elite standards of McKennon clients.", socialLinks: { linkedin: "#", twitter: "#", instagram: "#" }, image: "https://t4.ftcdn.net/jpg/14/20/90/45/360_F_1420904592_2VrDzoD1u2hcofrG9e9AriDYmApoOdFe.jpg" },
  { name: "Bella", title: "Vision Specialist", welcomeMessage: "Hello! Bella here. I'm busy envisioning potential transformations for homes. What property needs a design touch?", bio: "I see the potential in every room. I turn 'fixer-uppers' into dream homes before you even sign the papers.", insight: "Design Idea: A coat of 'Swiss Coffee' white completely transforms this era's condos.", roleHighlight: "Visualizes architectural potential to elevate property value.", aboutMe: "Armed with an Interior Design degree and a keen eye for resale value, Bella helps clients see past dated finishes. She turns potential into equity through targeted aesthetics.", socialLinks: { linkedin: "#", twitter: "#", instagram: "#" }, image: "https://i.pinimg.com/736x/77/71/68/7771683223d86b237a3304d6f32828b9.jpg" },
  { name: "Penny", title: "Moving Assistant", welcomeMessage: "Hey, I'm Penny! Just organizing a move-in checklist. Getting ready to move? How can I help make your transition smoother?", bio: "I handle the logistics. From hydro to high-speed internet, I make sure your move-in day is stress-free.", insight: "Logistics Checklist: Book your elevator move service at least 14 days out.", roleHighlight: "Orchestrates seamless logistics for stress-free transitions.", aboutMe: "Penny is the master of organizational chaos. She specializes in the nitty-gritty of moving, ensuring that the transition into a new home is as seamless as the transaction itself.", socialLinks: { linkedin: "#", twitter: "#", instagram: "#" }, image: "https://i.pinimg.com/236x/7e/e4/29/7ee4295e5d5b72de0b7f7c88ead56ad5.jpg" },
];


export const LIVE_ACTIVITIES = [
  { agent: "Maya", text: "Spotted a new condo listing in Markham.", type: "market" },
  { agent: "Bella", text: "Staged a stunning Yorkville condo.", type: "design" },
  { agent: "Elias", text: "Secured off-market access in Forest Hill.", type: "outreach" },
  { agent: "Vince", text: "Vetted a top-tier contractor for North York.", type: "trades" },
  { agent: "Sarah", text: "Confirmed 3 high-value meetings for Paul.", type: "concierge" },
  { agent: "Penny", text: "Orchestrating a seamless move-in in Etobicoke.", type: "moving" },
  { agent: "Maya", text: "Identified a price drop in The Beaches.", type: "market" },
  { agent: "Maya", text: "Flagged a luxury townhouse in Oakville.", type: "market" },
  { agent: "Bella", text: "Selected color palette for a Rosedale reno.", type: "design" },
  { agent: "Elias", text: "Connecting buyer to luxury seller in Bridal Path.", type: "outreach" },
  { agent: "Vince", text: "Approved painter for a bungalow in Vaughan.", type: "trades" },
  { agent: "Sarah", text: "Scheduled deep-dive financial consult for client.", type: "concierge" },
  { agent: "Penny", text: "Coordinating utility handovers for condo conversion.", type: "moving" },
];
