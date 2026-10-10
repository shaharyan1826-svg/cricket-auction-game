// Real-player pool for the T20 auction game.
// Player names and nationalities are real. Attribute ratings are game-play
// ratings for the auction simulation and are not official player statistics.

const REAL_PLAYERS = [
  // India
  { name: "Rohit Sharma", nationality: "IN", role: "Opener", attrs: {bat:9,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Virat Kohli", nationality: "IN", role: "Opener", attrs: {bat:10,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Shubman Gill", nationality: "IN", role: "Opener", attrs: {bat:9,pow:7,fin:5,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Yashasvi Jaiswal", nationality: "IN", role: "Opener", attrs: {bat:9,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Ruturaj Gaikwad", nationality: "IN", role: "Opener", attrs: {bat:8,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:1} },
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
  { name: "Rahul Tewatia", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:8,fin:9,bowl:5,pace:1,spin:7,keep:1} },
  { name: "Deepak Hooda", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:4,pace:1,spin:6,keep:1} },
  { name: "Abhishek Sharma", nationality: "IN", role: "All-rounder", attrs: {bat:8,pow:9,fin:8,bowl:6,pace:1,spin:8,keep:1} },
  { name: "Riyan Parag", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:6,pace:1,spin:7,keep:1} },
  { name: "Shahbaz Ahmed", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:6,fin:6,bowl:6,pace:1,spin:8,keep:1} },
  { name: "Vijay Shankar", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:5,pace:6,spin:1,keep:1} },
  { name: "Nitish Rana", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:8,fin:7,bowl:4,pace:1,spin:6,keep:1} },
  { name: "Harpreet Brar", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:5,fin:5,bowl:7,pace:1,spin:8,keep:1} },
  { name: "R Sai Kishore", nationality: "IN", role: "All-rounder", attrs: {bat:4,pow:4,fin:4,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Ayush Mhatre", nationality: "IN", role: "Opener", attrs: {bat:8,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Sarfaraz Khan", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:7,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Urvil Patel", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Shivam Mavi", nationality: "IN", role: "All-rounder", attrs: {bat:4,pow:5,fin:5,bowl:6,pace:8,spin:1,keep:1} },
  { name: "MS Dhoni", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:9} },
  { name: "Sai Sudharsan", nationality: "IN", role: "Opener", attrs: {bat:9,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Rajat Patidar", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Dhruv Jurel", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Shashank Singh", nationality: "IN", role: "Finisher", attrs: {bat:7,pow:8,fin:9,bowl:4,pace:5,spin:1,keep:1} },
  { name: "Shahrukh Khan", nationality: "IN", role: "Finisher", attrs: {bat:7,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Prabhsimran Singh", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:8,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Bhuvneshwar Kumar", nationality: "IN", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:2,bowl:9,pace:8,spin:1,keep:1} },
  { name: "Deepak Chahar", nationality: "IN", role: "Fast Bowler", attrs: {bat:4,pow:4,fin:4,bowl:8,pace:7,spin:1,keep:1} },
  { name: "Ravi Bishnoi", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:2,fin:1,bowl:9,pace:1,spin:9,keep:1} },
  { name: "Mayank Yadav", nationality: "IN", role: "Fast Bowler", attrs: {bat:1,pow:1,fin:1,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Shardul Thakur", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:6,fin:6,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Anshul Kamboj", nationality: "IN", role: "All-rounder", attrs: {bat:4,pow:5,fin:4,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Gurjapneet Singh", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:1,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Abishek Porel", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:7,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Karun Nair", nationality: "IN", role: "Middle Order", attrs: {bat:7,pow:6,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Mohit Sharma", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:1,bowl:7,pace:7,spin:1,keep:1} },
  { name: "T. Natarajan", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Prasidh Krishna", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:1,bowl:8,pace:9,spin:1,keep:1} },
  { name: "Mahipal Lomror", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:3,pace:1,spin:6,keep:1} },
  { name: "Anuj Rawat", nationality: "IN", role: "Wicketkeeper", attrs: {bat:6,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Naman Dhir", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:4,pace:5,spin:1,keep:1} },
  { name: "Vipraj Nigam", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:6,fin:5,bowl:7,pace:1,spin:8,keep:1} },
  { name: "Anukul Roy", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:5,fin:5,bowl:7,pace:1,spin:8,keep:1} },
  { name: "Swapnil Singh", nationality: "IN", role: "All-rounder", attrs: {bat:5,pow:5,fin:5,bowl:7,pace:1,spin:8,keep:1} },
  { name: "Rasikh Dar Salam", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:1,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Ayush Mhatre", nationality: "IN", role: "Opener", attrs: {bat:8,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Sarfaraz Khan", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:7,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Urvil Patel", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Vaibhav Sooryavanshi", nationality: "IN", role: "Opener", attrs: {bat:9,pow:10,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Priyansh Arya", nationality: "IN", role: "Opener", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Angkrish Raghuvanshi", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:7,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Ashutosh Sharma", nationality: "IN", role: "Finisher", attrs: {bat:7,pow:9,fin:9,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Harshit Rana", nationality: "IN", role: "Fast Bowler", attrs: {bat:3,pow:3,fin:2,bowl:8,pace:9,spin:1,keep:1} },
  { name: "Suyash Sharma", nationality: "IN", role: "Spinner", attrs: {bat:1,pow:1,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Prince Yadav", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:1,bowl:8,pace:8,spin:1,keep:1} },



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
  { name: "Adam Zampa", nationality: "AU", role: "Spinner", attrs: {bat:2,pow:2,fin:1,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Jake Fraser-McGurk", nationality: "AU", role: "Opener", attrs: {bat:7,pow:10,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Cameron Green", nationality: "AU", role: "All-rounder", attrs: {bat:8,pow:8,fin:7,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Cooper Connolly", nationality: "AU", role: "All-rounder", attrs: {bat:7,pow:7,fin:6,bowl:6,pace:1,spin:7,keep:1} },
  { name: "Matt Henry", nationality: "NZ", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:1,bowl:8,pace:9,spin:1,keep:1} },

  // England
  { name: "Jos Buttler", nationality: "OV", role: "Wicketkeeper", attrs: {bat:9,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:9} },
  { name: "Phil Salt", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:10,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Harry Brook", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Liam Livingstone", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:10,fin:9,bowl:7,pace:6,spin:8,keep:1} },
  { name: "Jofra Archer", nationality: "OV", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:2,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Sam Curran", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:8,bowl:7,pace:7,spin:1,keep:1} },
  { name: "Jacob Bethell", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:6,pace:1,spin:7,keep:1} },
  { name: "Jordan Cox", nationality: "ENG", role: "Wicketkeeper", attrs: {bat:7,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Will Jacks", nationality: "ENG", role: "All-rounder", attrs: {bat:8,pow:9,fin:8,bowl:6,pace:1,spin:7,keep:1} },


  // West Indies
  { name: "Andre Russell", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:10,fin:10,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Nicholas Pooran", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Shimron Hetmyer", nationality: "OV", role: "Middle Order", attrs: {bat:7,pow:9,fin:9,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Rovman Powell", nationality: "OV", role: "Finisher", attrs: {bat:7,pow:9,fin:9,bowl:3,pace:1,spin:2,keep:1} },
  { name: "Sunil Narine", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:8,fin:8,bowl:9,pace:1,spin:10,keep:1} },
  { name: "Jason Holder", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Shai Hope", nationality: "WI", role: "Wicketkeeper", attrs: {bat:8,pow:7,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Sherfane Rutherford", nationality: "WI", role: "Finisher", attrs: {bat:7,pow:9,fin:9,bowl:2,pace:1,spin:2,keep:1} },
  { name: "Akeal Hosein", nationality: "WI", role: "Spinner", attrs: {bat:3,pow:3,fin:2,bowl:8,pace:1,spin:9,keep:1} },
  { name: "Romario Shepherd", nationality: "WI", role: "All-rounder", attrs: {bat:6,pow:9,fin:8,bowl:7,pace:8,spin:1,keep:1} },


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
  { name: "Lungi Ngidi", nationality: "ZA", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Tristan Stubbs", nationality: "ZA", role: "Wicketkeeper", attrs: {bat:8,pow:9,fin:9,bowl:1,pace:1,spin:1,keep:7} },


  // New Zealand
  { name: "Kane Williamson", nationality: "OV", role: "Middle Order", attrs: {bat:9,pow:6,fin:6,bowl:1,pace:1,spin:2,keep:1} },
  { name: "Devon Conway", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Trent Boult", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:9,pace:9,spin:1,keep:1} },
  { name: "Mitchell Santner", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:5,fin:5,bowl:8,pace:2,spin:9,keep:1} },
  { name: "Rachin Ravindra", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:8,fin:8,bowl:6,pace:1,spin:8,keep:1} },
  { name: "Glenn Phillips", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:9,fin:9,bowl:5,pace:1,spin:7,keep:6} },
  { name: "Lockie Ferguson", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:2,bowl:8,pace:10,spin:1,keep:1} },
  { name: "Kyle Jamieson", nationality: "NZ", role: "Fast Bowler", attrs: {bat:4,pow:5,fin:4,bowl:8,pace:9,spin:1,keep:1} },
  { name: "Finn Allen", nationality: "NZ", role: "Opener", attrs: {bat:8,pow:10,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Jacob Duffy", nationality: "NZ", role: "Fast Bowler", attrs: {bat:2,pow:2,fin:1,bowl:8,pace:8,spin:1,keep:1} },



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


  // Pakistan / Bangladesh
  { name: "Shakib Al Hasan", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:6,fin:6,bowl:8,pace:2,spin:9,keep:1} },
  { name: "Mustafizur Rahman", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:7,spin:1,keep:1} }
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

function generatePlayerPool(count, basePrice, nationalityRule, overseasNames = []) {
  const unique = [...new Map(REAL_PLAYERS.map(p => [p.name.toLowerCase(), p])).values()];
  const manualOverseas = new Set((overseasNames || []).map(n => String(n).trim().toLowerCase()).filter(Boolean));
  let eligible = unique.map(p => manualOverseas.has(p.name.toLowerCase()) ? { ...p, nationality: "OV" } : p);
  if (nationalityRule === "indian-only") eligible = eligible.filter(p => p.nationality === "IN");
  if (nationalityRule === "overseas-only") eligible = eligible.filter(p => p.nationality === "OV");
  if (count > eligible.length) throw new Error(`Only ${eligible.length} unique players are available for this nationality setting. Reduce the auction player count or choose a mixed pool.`);

  // Random selection with role-balanced quotas, then shuffle the final auction order.
  const roles = [...new Set(eligible.map(p => p.role))];
  const forced = eligible.filter(p => manualOverseas.has(p.name.toLowerCase()));
  if (forced.length > count) throw new Error(`You marked ${forced.length} players as overseas, but the auction size is only ${count}. Increase the auction player count or remove some names.`);
  const forcedNames = new Set(forced.map(p => p.name.toLowerCase()));
  const buckets = new Map(roles.map(role => [role, shuffle(eligible.filter(p => p.role === role && !forcedNames.has(p.name.toLowerCase())))]));
  const selectedTemplates = forced.slice();
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
      icon: ROLES.find(r => r.key === template.role)?.icon || "🏏",
      nationality: template.nationality, basePrice: basePrice * priceMultiplier,
      attrs, sold: false, soldTo: null, soldFor: null, unsold: false,
    };
  });
  return selected;
}

module.exports = { generatePlayerPool, ROLES };
