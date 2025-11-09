// For Sample Data Insertion

const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.log(err);
});

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/ChattingApp');
// }

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeChattingApp');
}


    let allChats = [
        { from: 'Alice', to: 'Bob', msg: 'Hello, Bob!', created_at: new Date('2025-10-21T09:15:00') },
        { from: 'Bob', to: 'Alice', msg: 'Hi, Alice!', created_at: new Date('2025-10-21T09:16:00') },
        { from: 'Alice', to: 'Bob', msg: 'How are you?', created_at: new Date('2025-10-21T09:17:00') },

        { from: 'Rahul', to: 'Sneha', msg: 'Hey Sneha, did you finish the assignment?', created_at: new Date('2025-10-21T10:05:00') },
        { from: 'Sneha', to: 'Rahul', msg: 'Almost done! Just checking a few details.', created_at: new Date('2025-10-21T10:07:00') },
        { from: 'Rahul', to: 'Sneha', msg: 'Nice, send it to me once done.', created_at: new Date('2025-10-21T10:09:00') },

        { from: 'John', to: 'Emma', msg: 'Good morning ☀️', created_at: new Date('2025-10-21T08:45:00') },
        { from: 'Emma', to: 'John', msg: 'Morning! Ready for the meeting?', created_at: new Date('2025-10-21T08:46:00') },
        { from: 'John', to: 'Emma', msg: 'Almost! Grabbing a coffee first 😅', created_at: new Date('2025-10-21T08:47:00') },

        { from: 'David', to: 'Sophia', msg: 'Did you watch the new episode?', created_at: new Date('2025-10-21T11:20:00') },
        { from: 'Sophia', to: 'David', msg: 'Yess! It was insane 🔥', created_at: new Date('2025-10-21T11:22:00') },
        { from: 'David', to: 'Sophia', msg: 'Can’t believe that twist tho 😭', created_at: new Date('2025-10-21T11:24:00') },

        { from: 'Priya', to: 'Arjun', msg: 'Are we still going to the gym today?', created_at: new Date('2025-10-21T17:30:00') },
        { from: 'Arjun', to: 'Priya', msg: 'Yep! 7 PM sharp 💪', created_at: new Date('2025-10-21T17:31:00') },
        { from: 'Priya', to: 'Arjun', msg: 'Cool, see you then!', created_at: new Date('2025-10-21T17:32:00') },

        { from: 'Liam', to: 'Olivia', msg: 'Hey, can you share the notes?', created_at: new Date('2025-10-21T12:15:00') },
        { from: 'Olivia', to: 'Liam', msg: 'Sure, I’ll mail them to you in 5 mins.', created_at: new Date('2025-10-21T12:16:00') },
        { from: 'Liam', to: 'Olivia', msg: 'Thanks a lot, you’re a lifesaver!', created_at: new Date('2025-10-21T12:17:00') },

        { from: 'Riya', to: 'Karan', msg: 'Lunch break?', created_at: new Date('2025-10-21T13:00:00') },
        { from: 'Karan', to: 'Riya', msg: 'Let’s go! I’m starving 😂', created_at: new Date('2025-10-21T13:01:00') },
        { from: 'Riya', to: 'Karan', msg: 'Meet you at the cafeteria.', created_at: new Date('2025-10-21T13:02:00') },
    ];

Chat.insertMany(allChats);