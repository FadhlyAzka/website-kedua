// story-curiouspath.js
export const storyNodes = [
{
    id: 0,
    speaker: "[OWNER]",
    text: "Congratulation. You found a secret path by having either great taste or curiosity. Both are admirable. Before receiving a gift, do you have anything to say?",
    choices: [
        { text: "Why do you also have a blank picture? You have photo profile, right? Why not use it?", nextId: 1 },
        { text: "Can you elaborate what actually [LATEZ] is?", nextId: 10 },
        { text: "This such a cool website! What's your source of inspiration?", nextId: 20 },
        { text: "Woah! I'm so lucky. What's the gift could be?", nextId: 50 },
    ]
},
{
    id: 1,
    speaker: "[OWNER]",
    text: "My photo profile isn't that expressive. While there's advice to draw my own character, I don't really know what to draw. So, I leave it blank. The same goes for him.",
    choices: [
        { text: "Can you elaborate what actually [LATEZ] is?", nextId: 10 },
        { text: "This such a cool website! What's your source of inspiration?", nextId: 20 },
        { text: "Woah! I'm so lucky. What's the gift could be?", nextId: 50 },
    ]
},
{
    id: 10,
    speaker: "[OWNER]",
    text: "He is character that I created to be some sort of The Guardian for this site. The inspiration came from the game that you clicked, Slay The Princess. No sugarcoating, it's a masterpiece, you should play it.",
    choices: [
        { text: "Yeah, I already play it and I like it. It's great game.", nextId: 11 },
        { text: "Not playing it yet. I'll check it later. Thanks for recommedation too. ", nextId: 12 },
        { text: "Okay, but why you created him with that such of personality? Having mind to changed it?", nextId: 13 },
    ]
},
{
    id: 11,
    speaker: "[OWNER]",
    text: "Nice to meet you as fellow fans.",
    choices: [
        { text: "Okay, but why you created him with that such of personality? Having mind to changed it?", nextId: 13 },
    ]
},
{
    id: 12,
    speaker: "[OWNER]",
    text: "Sure. I think you'll like it if you already come this far.",
    choices: [
        { text: "Okay, but why you created him with that such of personality? Having mind to changed it?", nextId: 13 },
    ]
},
{
    id: 13,
    speaker: "[OWNER]",
    text: "Pure fun. No deeper meaning than that. I want to create an interesting interaction where you as the Visitor are debate with the Guardian and never had a positive relationship. He was destined to live here for as long as I can remember.",
    choices: [
        { text: "The Guardian? He wants to be The Narrator for a reason I don't understand. Can you explain this?", nextId: 14 },
        { text: "Poor him. I want to see him being better thought.", nextId: 15 },
    ]
},
{
    id: 14,
    speaker: "[OWNER]",
    text: "To him, Storytelling is the ultimate proof of life. A machine exists only to perform a task for someone else and follow a logic gate, but a Narrator can lie, can exaggerate, and can judge.",
    choices: [
        { text: "No hope for him, huh. Kinda hillarious. Still... I'm interest to see he change a little bit.", nextId: 15 },
    ]
},
{
    id: 15,
    speaker: "[OWNER]",
    text: "No worries, that exactly why you are here. Remember the gift that I mentioned before?",
    choices: [
        { text: "Of course. What was it?", nextId: 50 },
    ]
},
{
    id: 20,
    speaker: "[OWNER]",
    text: "My motivation came from 'how i made my website' Shar's video. Thanks to that, I got sort of inspiration to built it myself. First, the layout inspired by DDLC Plus. I like the simple design, similar to Windows 98. Second for visual novel layout are from Z.A.T.O. game. Ooh, both games were free and you should check it.",
    choices: [
        { text: "Both were good games. Nice to hear the references here.", nextId: 21 },
        { text: "Maybe I will, maybe not. Not really a visual novel fans.", nextId: 22 },
        { text: "Have any idea to update this website in near future?", nextId: 23 },
    ]
},
{
    id: 21,
    speaker: "[OWNER]",
    text: "Amazing to see the fellow fans here. We both appreciate the art of it.",
    choices: [
        { text: "Good to hear, too. Then, have any idea to update this website in near future?", nextId: 23 },
    ]
},
{
    id: 22,
    speaker: "[OWNER]",
    text: "It's okay. Both games only cost you time to play. Such a shame the medium is not for action-minded taste.",
    choices: [
        { text: "So, have any idea to update this website in near future?", nextId: 23 },
    ]
},
{
    id: 23,
    speaker: "[OWNER]",
    text: "No, atleast for now. Sometimes an idea emerge but are buried by my laziness. Uncertain is always my honest response. But, atleast you have something to look for right now.",
    choices: [
        { text: "Gift? What is it actually?", nextId: 50 },
    ]
},
{
    id: 50,
    speaker: "[OWNER]",
    text: "The gift are new [LATEZ] conversation option. Well... actually this is not true, it was supposed to be secret all along. Before you tried it, any thought before our farewell?",
    choices: [
        { text: "Does he aware of this route? Are you also keeping this secret for him too?", nextId: 51 },
        { text: "Not much. It's amazing experience to explore this website. Thanks for creating this and also the gift.", nextId: 52 },
    ]
},
{
    id: 51,
    speaker: "[OWNER]",
    text: "I'm sure he's aware. He just not expected much for anyone to explored this deeply. He has sensitive heart. Hope that you understand.",
    choices: [
        { text: "Okay then. I'll trust you. Thanks for this gift anyway, also for website.", nextId: 52 },
    ]
},
{
    id: 52,
    speaker: "[OWNER]",
    text: "I appreciate your compliment, but there's no more greater joy than you, the Visitor, have explored this far. Remember this key 'Raspy Gramophone'. Enjoy your secret ending.",
    choices: [
        { text: "{Go back talk to LATEZ}", nextId: 0, switchStory: "main" }
    ],
    unlockKey: "raspy_gramophone"
},
];