// Real-player pool for the T20 auction game.
// Player names and nationalities are real. Attribute ratings are game-play
// ratings for the auction simulation and are not official player statistics.

const REAL_PLAYERS = [
  // India
  { name: "Rohit Sharma", nationality: "IN", role: "Opener", attrs: {bat:9,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Virat Kohli", nationality: "IN", role: "Opener", attrs: {bat:10,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Shubman Gill", nationality: "IN", role: "Opener", attrs: {bat:9,pow:7,fin:5,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Yashasvi Jaiswal", nationality: "IN", role: "Opener", attrs: {bat:9,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Suryakumar Yadav", nationality: "IN", role: "Middle Order", attrs: {bat:9,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Rishabh Pant", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:9} },
  { name: "Sanju Samson", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Ishan Kishan", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Shreyas Iyer", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:7,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Tilak Varma", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:3,pace:1,spin:4,keep:1} },
  { name: "Rinku Singh", nationality: "IN", role: "Finisher", attrs: {bat:7,pow:9,fin:10,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Hardik Pandya", nationality: "IN", role: "All-rounder", attrs: {bat:8,pow:9,fin:9,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Ravindra Jadeja", nationality: "IN", role: "All-rounder", attrs: {bat:8,pow:7,fin:8,bowl:8,pace:4,spin:9,keep:1} },
  { name: "Axar Patel", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:6,fin:7,bowl:8,pace:3,spin:9,keep:1} },
  { name: "Washington Sundar", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:5,fin:5,bowl:7,pace:2,spin:8,keep:1} },
  { name: "Kuldeep Yadav", nationality: "IN", role: "Spinner", attrs: {bat:3,pow:2,fin:1,bowl:9,pace:1,spin:10,keep:1} },
  { name: "Yuzvendra Chahal", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:2,fin:1,bowl:9,pace:1,spin:10,keep:1} },
  { name: "Jasprit Bumrah", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:10,pace:10,spin:1,keep:1} },
  { name: "Mohammed Shami", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:9,pace:9,spin:1,keep:1} },
  { name: "Mohammed Siraj", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:9,spin:1,keep:1} },
  { name: "Arshdeep Singh", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Harshal Patel", nationality: "IN", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:2,bowl:8,pace:7,spin:1,keep:1} },
  { name: "KL Rahul", nationality: "IN", role: "Wicketkeeper", attrs: {bat:9,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:9} },
  { name: "Shivam Dube", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:9,fin:8,bowl:4,pace:5,spin:1,keep:1} },
  { name: "Nitish Kumar Reddy", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:6,pace:7,spin:1,keep:1} }, 
  { name: "Jitesh Sharma", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Ravichandran Ashwin", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:4,fin:4,bowl:8,pace:1,spin:10,keep:1} },
  { name: "Krunal Pandya", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:7,pace:1,spin:8,keep:1} },
  { name: "Venkatesh Iyer", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:5,pace:6,spin:1,keep:1} },
  { name: "Deepak Hooda", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:4,pace:1,spin:6,keep:1} },
  { name: "Abhishek Sharma", nationality: "IN", role: "All-rounder", attrs: {bat:8,pow:9,fin:8,bowl:6,pace:1,spin:8,keep:1} },
  { name: "Riyan Parag", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:6,pace:1,spin:7,keep:1} },
  { name: "Shahbaz Ahmed", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:6,fin:6,bowl:6,pace:1,spin:8,keep:1} },
  { name: "Vijay Shankar", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:5,pace:6,spin:1,keep:1} },
  { name: "Nitish Rana", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:8,fin:7,bowl:4,pace:1,spin:6,keep:1} },
  { name: "Harpreet Brar", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:5,fin:5,bowl:7,pace:1,spin:8,keep:1} },
  { name: "R Sai Kishore", nationality: "IN", role: "All-rounder", attrs: {bat:4,pow:4,fin:4,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Shivam Mavi", nationality: "IN", role: "All-rounder", attrs: {bat:4,pow:5,fin:5,bowl:6,pace:8,spin:1,keep:1} },
  { name: "MS Dhoni", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:9} },
  { name: "Sai Sudharsan", nationality: "IN", role: "Opener", attrs: {bat:9,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Rajat Patidar", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Dhruv Jurel", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Shashank Singh", nationality: "IN", role: "Finisher", attrs: {bat:7,pow:8,fin:9,bowl:4,pace:5,spin:1,keep:1} },
  { name: "Prabhsimran Singh", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Bhuvneshwar Kumar", nationality: "IN", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:2,bowl:9,pace:8,spin:1,keep:1} },
  { name: "Deepak Chahar", nationality: "IN", role: "Fast Bowler", attrs: {bat:4,pow:4,fin:4,bowl:8,pace:7,spin:1,keep:1} },
  { name: "Ravi Bishnoi", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:2,fin:1,bowl:9,pace:1,spin:9,keep:1} },
  { name: "Mayank Yadav", nationality: "IN", role: "Fast Bowler", attrs: {bat:1,pow:1,fin:1,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Shardul Thakur", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:6,fin:6,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Prithvi Shaw", nationality: "IN", role: "Opener", attrs: {bat:7,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Devdutt Padikkal", nationality: "IN", role: "Opener", attrs: {bat:8,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Abhishek Porel", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Sarfaraz Khan", nationality: "IN", role: "Middle Order", attrs: {bat:7,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Manish Pandey", nationality: "IN", role: "Middle Order", attrs: {bat:7,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Anuj Rawat", nationality: "IN", role: "Wicketkeeper", attrs: {bat:6,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Abhinav Manohar", nationality: "IN", role: "Wicketkeeper", attrs: {bat:5,pow:6,fin:5,bowl:1,pace:1,spin:1,keep:5} },
  { name: "Mayank Agarwal", nationality: "IN", role: "Opener", attrs: {bat:7,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Karun Nair", nationality: "IN", role: "Middle Order", attrs: {bat:6,pow:6,fin:5,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Nehal Wadhera", nationality: "IN", role: "Middle Order", attrs: {bat:7,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Sameer Rizvi", nationality: "IN", role: "Middle Order", attrs: {bat:6,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Ashutosh Sharma", nationality: "IN", role: "Finisher", attrs: {bat:6,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Ramandeep Singh", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:8,fin:8,bowl:5,pace:6,spin:1,keep:1} },
  { name: "Vijaykumar Vyshak", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:2,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Avesh Khan", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "T Natarajan", nationality: "IN", role: "Fast Bowler", attrs: {bat:1,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Mukesh Kumar", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:2,bowl:7,pace:7,spin:1,keep:1} },
  { name: "Akash Deep", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:2,bowl:7,pace:7,spin:1,keep:1} },
  { name: "Sandeep Sharma", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:7,spin:1,keep:1} },
  { name: "Varun Chakravarthy", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:2,fin:1,bowl:9,pace:1,spin:9,keep:1} },
  { name: "Rahul Chahar", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:2,fin:1,bowl:8,pace:1,spin:8,keep:1} },
  { name: "Sai Kishore", nationality: "IN", role: "Spinner", attrs: {bat:3,pow:2,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Mayank Markande", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:2,fin:1,bowl:7,pace:1,spin:8,keep:1} },
  { name: "Shreyas Gopal", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:2,fin:1,bowl:7,pace:1,spin:8,keep:1} },
  { name: "Mahipal Lomror", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:7,fin:6,bowl:3,pace:1,spin:4,keep:1} },


  // Australia
  { name: "Travis Head", nationality: "OV", role: "Opener", attrs: {bat:9,pow:10,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "David Warner", nationality: "OV", role: "Opener", attrs: {bat:9,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Glenn Maxwell", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:10,fin:10,bowl:6,pace:2,spin:7,keep:1} },
  { name: "Mitchell Marsh", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:9,fin:8,bowl:6,pace:7,spin:1,keep:1} },
  { name: "Pat Cummins", nationality: "OV", role: "Fast Bowler", attrs: {bat:5,pow:5,fin:4,bowl:9,pace:9,spin:1,keep:1} },
  { name: "Mitchell Starc", nationality: "OV", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:2,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Josh Hazlewood", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:9,pace:8,spin:1,keep:1} },
  { name: "Steve Smith", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:6,fin:6,bowl:2,pace:1,spin:3,keep:1} },
  { name: "Marcus Stoinis", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:9,fin:9,bowl:6,pace:7,spin:1,keep:1} },
  { name: "Tim David", nationality: "OV", role: "Finisher", attrs: {bat:7,pow:10,fin:10,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Alex Carey", nationality: "OV", role: "Wicketkeeper", attrs: {bat:7,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:8} },

  // England
  { name: "Jos Buttler", nationality: "OV", role: "Wicketkeeper", attrs: {bat:9,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:9} },
  { name: "Phil Salt", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:10,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Harry Brook", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Liam Livingstone", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:10,fin:9,bowl:7,pace:6,spin:8,keep:1} },
  { name: "Jofra Archer", nationality: "OV", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:2,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Sam Curran", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:8,bowl:7,pace:7,spin:1,keep:1} },
  { name: "Jacob Bethell", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:6,pace:1,spin:7,keep:1} },
  { name: "Moeen Ali", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:8,fin:7,bowl:7,pace:1,spin:8,keep:1} },
  { name: "Chris Woakes", nationality: "OV", role: "All-rounder", attrs: {bat:5,pow:5,fin:5,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Joe Root", nationality: "OV", role: "Middle Order", attrs: {bat:9,pow:6,fin:6,bowl:3,pace:1,spin:4,keep:1} },
  { name: "Jonny Bairstow", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:8} },

  // West Indies
  { name: "Andre Russell", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:10,fin:10,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Nicholas Pooran", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Shimron Hetmyer", nationality: "OV", role: "Middle Order", attrs: {bat:7,pow:9,fin:9,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Rovman Powell", nationality: "OV", role: "Finisher", attrs: {bat:7,pow:9,fin:9,bowl:3,pace:1,spin:2,keep:1} },
  { name: "Sunil Narine", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:9,pace:1,spin:10,keep:1} },
  { name: "Jason Holder", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Brandon King", nationality: "OV", role: "Opener", attrs: {bat:7,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Akeal Hosein", nationality: "OV", role: "Spinner", attrs: {bat:3,pow:3,fin:2,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Romario Shepherd", nationality: "OV", role: "All-rounder", attrs: {bat:5,pow:8,fin:7,bowl:6,pace:7,spin:1,keep:1} },     
  {name: "Shai Hope",nationality: "OV",role: "Wicketkeeper",attrs: {bat: 8,pow: 7,fin: 7,bowl: 1,pace: 1,spin: 1,keep: 8}},


  // South Africa
  { name: "Quinton de Kock", nationality: "OV", role: "Wicketkeeper", attrs: {bat:9,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:9} },
  { name: "David Miller", nationality: "OV", role: "Finisher", attrs: {bat:8,pow:10,fin:10,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Heinrich Klaasen", nationality: "OV", role: "Wicketkeeper", attrs: {bat:9,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Kagiso Rabada", nationality: "OV", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:1,bowl:9,pace:9,spin:1,keep:1} },
  { name: "Marco Jansen", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:6,bowl:8,pace:9,spin:1,keep:1} },
  { name: "Aiden Markram", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:8,fin:8,bowl:6,pace:5,spin:7,keep:1} },
  { name: "Anrich Nortje", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:2,bowl:8,pace:10,spin:1,keep:1} },
  { name: "Gerald Coetzee", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:2,bowl:8,pace:9,spin:1,keep:1} },
  { name: "Dewald Brevis", nationality: "OV", role: "Middle Order", attrs: {bat:7,pow:10,fin:8,bowl:4,pace:1,spin:6,keep:1} },
  { name: "Faf du Plessis", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },


  // New Zealand
  { name: "Kane Williamson", nationality: "OV", role: "Middle Order", attrs: {bat:9,pow:6,fin:6,bowl:1,pace:1,spin:2,keep:1} },
  { name: "Devon Conway", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Trent Boult", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:9,pace:9,spin:1,keep:1} },
  { name: "Mitchell Santner", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:5,fin:5,bowl:8,pace:2,spin:9,keep:1} },
  { name: "Rachin Ravindra", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:8,fin:8,bowl:6,pace:1,spin:8,keep:1} },
  { name: "Glenn Phillips", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:9,fin:9,bowl:5,pace:1,spin:7,keep:6} },
  { name: "Lockie Ferguson", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:2,bowl:8,pace:10,spin:1,keep:1} },
  { name: "Daryl Mitchell", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:8,fin:7,bowl:5,pace:5,spin:1,keep:1} },
  { name: "Mark Chapman", nationality: "OV", role: "Middle Order", attrs: {bat:7,pow:8,fin:7,bowl:1,pace:1,spin:3,keep:1} },
  { name: "Kyle Jamieson", nationality: "OV", role: "Fast Bowler", attrs: {bat:3,pow:4,fin:3,bowl:8,pace:9,spin:1,keep:1} },
  { name: "Adam Milne", nationality: "OV", role: "Fast Bowler", attrs: {bat:1,pow:1,fin:1,bowl:8,pace:9,spin:1,keep:1} },
  { name: "Martin Guptill", nationality: "OV", role: "Opener", attrs: {bat:8,pow:9,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Jimmy Neesham", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:8,fin:8,bowl:6,pace:7,spin:1,keep:1} },

  // Afghanistan
  { name: "Rashid Khan", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:8,bowl:10,pace:1,spin:10,keep:1} },
  { name: "Mohammad Nabi", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:6,fin:7,bowl:8,pace:2,spin:9,keep:1} },
  { name: "Rahmanullah Gurbaz", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:9,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Azmatullah Omarzai", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Noor Ahmad", nationality: "OV", role: "Spinner", attrs: {bat:2,pow:2,fin:2,bowl:9,pace:1,spin:10,keep:1} },

  // Sri Lanka
  { name: "Wanindu Hasaranga", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:9,pace:1,spin:10,keep:1} },
  { name: "Matheesha Pathirana", nationality: "OV", role: "Fast Bowler", attrs: {bat:1,pow:1,fin:1,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Maheesh Theekshana", nationality: "OV", role: "Spinner", attrs: {bat:3,pow:2,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Kusal Mendis", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Dasun Shanaka", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:8,fin:8,bowl:5,pace:7,spin:1,keep:1} },


  // Pakistan / Bangladesh
  { name: "Shakib Al Hasan", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:6,fin:6,bowl:8,pace:2,spin:9,keep:1} },
  { name: "Mustafizur Rahman", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:7,spin:1,keep:1} },

  // Zimbabwe
  { name: "Sikandar Raza", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:8,pace:6,spin:9,keep:1} },

  // Additional IPL-era player pool entries (unique names; one entry per player)
  { name: "Dinesh Karthik", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Ambati Rayudu", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Robin Uthappa", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Suresh Raina", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Yusuf Pathan", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Irfan Pathan", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Piyush Chawla", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Amit Mishra", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Umesh Yadav", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Ishant Sharma", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Varun Aaron", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Prasidh Krishna", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Navdeep Saini", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Kartik Tyagi", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Umran Malik", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Tushar Deshpande", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Khaleel Ahmed", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Chetan Sakariya", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Mohit Sharma", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Jaydev Unadkat", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Ankit Rajpoot", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Siddarth Kaul", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Praveen Kumar", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Ashish Nehra", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Zaheer Khan", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Harbhajan Singh", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Pragyan Ojha", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Amit Singh", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Rahul Tewatia", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Kedar Jadhav", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Mandeep Singh", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Yash Dayal", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Mohsin Khan", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Rasikh Dar", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Suyash Sharma", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Kumar Kartikeya", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Murugan Ashwin", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Anukul Roy", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Rahul Tripathi", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Abhimanyu Easwaran", nationality: "IN", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Shivam Sharma", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "KS Bharat", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Wriddhiman Saha", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "N Jagadeesan", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Upendra Yadav", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "AB de Villiers", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Chris Gayle", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Kieron Pollard", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Dwayne Bravo", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Lasith Malinga", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Chris Morris", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Imran Tahir", nationality: "OV", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Shane Watson", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Aaron Finch", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Brendon McCullum", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Kevin Pietersen", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Eoin Morgan", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Ben Cutting", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Daniel Christian", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Daniel Sams", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Tom Curran", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "David Willey", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Tymal Mills", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Chris Jordan", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Reece Topley", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Jason Behrendorff", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Nathan Coulter-Nile", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Andrew Tye", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Jhye Richardson", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Ben Dwarshuis", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Sean Abbott", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Cameron Green", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Mitchell Owen", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Ashton Turner", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Aaron Hardie", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Matthew Short", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Dale Steyn", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Morne Morkel", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Albie Morkel", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Jacques Kallis", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Graeme Smith", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Hashim Amla", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "JP Duminy", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Lance Klusener", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Morne van Wyk", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Colin Ingram", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Colin Munro", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Corey Anderson", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "James Franklin", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Ross Taylor", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Martin Crowe", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Daniel Vettori", nationality: "OV", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Nathan McCullum", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Jesse Ryder", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Ish Sodhi", nationality: "OV", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Tim Seifert", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Finn Allen", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Mark Wood", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Adil Rashid", nationality: "OV", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Dawid Malan", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Jason Roy", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Alex Hales", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Liam Dawson", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Sam Billings", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Tom Kohler-Cadmore", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Will Jacks", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "George Garton", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Luke Wood", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Rehan Ahmed", nationality: "OV", role: "Spinner", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Michael Bracewell", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Kyle Mayers", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Evin Lewis", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Alzarri Joseph", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Obed McCoy", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Brandon McMullen", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Niroshan Dickwella", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Lahiru Kumara", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Dushmantha Chameera", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Kusal Perera", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Avishka Fernando", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Bhanuka Rajapaksa", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Dhananjaya de Silva", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Charith Asalanka", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Pathum Nissanka", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Angelo Mathews", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Thisara Perera", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Dinesh Chandimal", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Litton Das", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Taskin Ahmed", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Mehidy Hasan Miraz", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Mahmudullah", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:7,fin:7,bowl:6,pace:6,spin:6,keep:1} },
  { name: "Tamim Iqbal", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Mushfiqur Rahim", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Liton Das", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Usman Khawaja", nationality: "OV", role: "Opener", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
];

const ROLES = [
  { key: "Opener", icon: "🏏" },
  { key: "Middle Order", icon: "🏏" },
  { key: "Power Hitter", icon: "💥" },
  { key: "Finisher", icon: "🧨" },
  { key: "Wicketkeeper", icon: "🧤" },
  { key: "All-rounder", icon: "🔄" },
  { key: "Fast Bowler", icon: "⚡" },
  { key: "Spinner", icon: "🌀" },
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generatePlayerPool(count, basePrice, nationalityRule) {
  const unique = [...new Map(REAL_PLAYERS.map(p => [p.name.toLowerCase(), p])).values()];
  let eligible = unique;
  if (nationalityRule === "indian-only") eligible = eligible.filter(p => p.nationality === "IN");
  if (nationalityRule === "overseas-only") eligible = eligible.filter(p => p.nationality === "OV");
  if (count > eligible.length) throw new Error(`Only ${eligible.length} unique players are available for this nationality setting. Reduce the auction player count or choose a mixed pool.`);

  // Random selection with role-balanced quotas, then shuffle the final auction order.
  const roles = [...new Set(eligible.map(p => p.role))];
  const buckets = new Map(roles.map(role => [role, shuffle(eligible.filter(p => p.role === role))]));
  const selectedTemplates = [];
  while (selectedTemplates.length < count) {
    const availableRoles = shuffle(roles.filter(role => buckets.get(role).length));
    if (!availableRoles.length) break;
    for (const role of availableRoles) {
      if (selectedTemplates.length >= count) break;
      selectedTemplates.push(buckets.get(role).pop());
    }
  }
  const selected = shuffle(selectedTemplates).map((template, i) => {
    const attrs = { ...template.attrs };
    const skillAvg = (attrs.bat + attrs.pow + attrs.fin + attrs.bowl + attrs.keep) / 5;
    const priceMultiplier = skillAvg >= 7.6 ? 3 : skillAvg >= 5.8 ? 2 : 1;
    return {
      id: `p${i + 1}`, name: template.name, role: template.role,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(template.name)}&background=879B83&color=202A25&size=256&bold=true`,
      icon: ROLES.find(r => r.key === template.role)?.icon || "🏏",
      nationality: template.nationality, basePrice: Number(basePrice),
      attrs, sold: false, soldTo: null, soldFor: null, unsold: false,
    };
  });
  return selected;
}

module.exports = { generatePlayerPool, ROLES };
