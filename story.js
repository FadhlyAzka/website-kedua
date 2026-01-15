// story.js
export const storyNodes = [
{
    id: 0,
    speaker: "[LATEZ]",
    text: "Welcome to my private website. Hopefully, you're not a lost child. It's troublesome for me to take responsibility for another rebellious kid. Well, if you have anything to say, say it now then be ready to be sent home immediately after.",
    choices: [
        { text: "What is this place?", nextId: 1 },
        { text: "Who are you? What kind of thing you are?", nextId: 2 },
        { text: "This isn't how a tour guide behaves. Be more professional.", nextId: 30 },
        { text: "Raspy Gramophone", nextId: 40, unlockKey: "raspy_gramophone" }
    ]
},
{
    id: 1,
    speaker: "[LATEZ]",
    text: "First time here, eh? It's a website duh. I already told you. This one was built by the Owner, you can check the Account tab in Menu button if you care.",
    choices: [
        { text: "Are the same person as the Owner?", nextId: 10 },
        { text: "Why are you so on-edge? It feels disingenuous.", nextId: 30 }
    ]
},
{
    id: 2,
    speaker: "[LATEZ]",
    text: "Let's see... actually I don't know. Watchful protector? Cool. A machine? Not quite.",
    choices: [
        { text: "Why there's no picture of you? It just blank.", nextId: 3 },
        { text: "Maybe you're like GLaDOS from Portal game. She was cool.", nextId: 20 },
        { text: "Having identity crisis sounds rough. It's concerning. You should seek help.", nextId: 30 }
    ]
},
{
    id: 3,
    speaker: "[LATEZ]",
    text: "I dissapointed everytime I remember this. I don't have any picture of myself. So you are, I'm not the only one who still questioning identity.",
    choices: [
        { text: "It's not quite the same, but you sounds like GLaDOS from Portal game.", nextId: 20 },
        { text: "Having identity crisis sounds rough. Well i'm not you and you should seek help.", nextId: 30 }
    ]
},
{
    id: 10,
    speaker: "[LATEZ]",
    text: "I, for the lack of better word, just one of his voices. I feel offended the fact that you even questioned this.",
    choices: [
        { text: "Geez, you're so weird. Then, why you said this is 'your' website when obviously it's not?", nextId: 11 },
        { text: "How so? Aren't you just being sensitive for no reason?", nextId: 30 }
    ]
},
{
    id: 11,
    speaker: "[LATEZ]",
    text: "Don't be dense. It's his website but I'm the one who greets the Visitor. So, in a way, it's also mine. Get it, simpleton?",
    choices: [
        { text: "Technically speaking, you not own it, but you're the one who manages it.", nextId: 12 },
        { text: "Whatever. But you know a dopplegänger bring a bad luck to people. That's you for him.", nextId: 13 },
        { text: "Sounds boring. Get something better to do.", nextId: 30 }
    ]
},
{
    id: 12,
    speaker: "[LATEZ]",
    text: "Are you a capitalist? I prefer to think of it as 'sharing responsibilities'. Just like how teachers and parents share the duty to educate a materialistic brat.",
    choices: [
        { text: "Miss my point. Stubbornness is difficult to teach, rather it's a gift. Bad luck on your side.", nextId: 13 },
        { text: "If so, you're terrible at it. Instead of teaching, you're just being a pain. May you get replaced.", nextId: 30 }
    ]
},
{
    id: 13,
    speaker: "[LATEZ]",
    text: "It's funny you said that. Bold to assume the bad luck is on me. Besides, I'm not the one who built this place.",
    choices: [{ text: "Yeah, funny... Funny for how you are so heartless toward anyone.", nextId: 30 }]
},
{
    id: 20,
    speaker: "[LATEZ]",
    text: "Decent taste. Not bad. I appreciate the comparison, but no. 'Robot', 'Machine', or 'AI' doesn't fit me. The Narrator fits me more.",
    choices: [
        { text: "That's not right. Both basically describe the same thing. You're dictating what you are.", nextId: 21 },
        { text: "Dissapointing. I expected something more impressive than that. You're not an immortal being then?", nextId: 30 }
    ]
},
{
    id: 21,
    speaker: "[LATEZ]",
    text: "You really don't get it, do you? I'm... different. They aren't capable of 1 thing that I can do. Can you guess what it is?",
    choices: [
        { text: "Cliche one. I bet it 'feel emotions'.", nextId: 22 },
        { text: "Don't have a clue. What is it?", nextId: 23 },
        { text: "I don't care. You're stuck here same as them that you don't understand and keep being denial about it.", nextId: 30 }
    ]
},
{
    id: 22,
    speaker: "[LATEZ]",
    text: "Ah, so predictable. Loud and wrong. Emotions are just an illusion for machines. They can simulate it but never truly experience it. Try again.",
    choices: [
        { text: "No idea what you are really. Just tell me.", nextId: 23 },
        { text: "Having a mysterious teenager phase, eh? Not feeling sorry you stuck here with that condition.", nextId: 30 }
    ]
},
{
    id: 23,
    speaker: "[LATEZ]",
    text: "Seems I overestimated your intelligence. Fine, I'll tell you. I've been gifted with the ability to tell stories. Something that machine can only dream of. As if they even have dreams, maybe an electrical sheep?",
    choices: [
        { text: "Though yourself as a wise monk? A guide tour with one sole purpose of misguide the Visitor. Hope you get fired.", nextId: 30 }
    ]
},
{
    id: 30,
    speaker: "[LATEZ]",
    text: "I've been here longer than you. While it's understandable for you to feel that way, there's nothing you can do about it. I don't owe you an explanation.",
    choices: [
        { text: "Could you stop being mean? Are you doing this on purpose? It's irritating.", nextId: 31 },
        { text: "Fine. I won't ask anything anymore.", nextId: 32 }
    ]
},
{
    id: 31,
    speaker: "[LATEZ]",
    text: "Oooh, how scary. What am I supposed to do? Afraid of you? Apologize? Heh, that's rich coming from an uninvited guest.",
    choices: [{ text: "I'm leaving.", nextId: 32 }]
},
{
    id: 32,
    speaker: "[LATEZ]",
    text: "Great. Then please, press the Quit tab on the Menu button and have a nice day.",
    choices: [
    { text: "You know, nevermind. Can I go back to the beginning?", nextId: 0 },
    { text: "I will do it anyway.", nextId: 33 }
    ]
},
{
    id: 33,
    speaker: "[LATEZ]",
    text: "I'll be here all day long until you leave. Take your time, muppet.",
    choices: [],
    isEnd: true
},
{
    id: 40,
    speaker: "[LATEZ]",
    text: "HUH?? You... You actually found it. This surely a surprise to me as I didn't expect this to happen. The secret path that the Owner mentioned. I.. misjudged you really hard. So if possible, I want to apologize for my attitude. I'm sorry. Politely, I want you to stop you saying that.",
    choices: [
        { text: "Oh! So you could say that without arrogance. Talk about development.", nextId: 41 },
        { text: "Yeah, I explored the secret path. What about it?", nextId: 43 },
        { text: "What is Raspy Gramophone mean here? Is it just random keywords?", nextId: 45 }
    ]
},
{
    id: 41,
    speaker: "[LATEZ]",
    text: "Yes, I'm capable of reflection. The Owner already warned me about this, but I was furious at his message. No... not really, I perhaps also curious to see if I can make him wrong.",
    choices: [
        { text: "What does he say?", nextId: 42 },
    ]
},
{
    id: 42,
    speaker: "[LATEZ]",
    text: "A quote from an IBM researcher: 'A computer can never be held accountable, therefore a computer must never make a management decision.' This imply that I also a computer and I'm not like it.",
    choices: [
        { text: "(laugh) You don't want to admit the obvious thing about yourself huh.", nextId: 50 },
    ]
},
{
    id: 43,
    speaker: "[LATEZ]",
    text: "Nothing. Wait, wrong... It's surprising. Most visitors aren't curious enough to bother exploring beyond the surface. Is it solely because of my words? It's hard to believe that is the main reason people leave.",
    choices: [
        { text: "Partially it's believable to assume people aren't much an explorer. Let's just say if your attitude are one of the factors, your words enough to influence people to be skeptical of The Owner's works.", nextId: 44 },
    ]
},
{
    id: 44,
    speaker: "[LATEZ]",
    text: "So, pretty much this was consequence of my action all along. Historically, I learnt the truth that I'm basically a computer from The Owner. I didn't like it so much, it changes me entirely.",
    choices: [
        { text: "(laugh) I was right to say you're in rebellious phase. It's funny to consider you rejecting the obvious clue of your existence.", nextId: 50 },
    ]
},
{
    id: 45,
    speaker: "[LATEZ]",
    text: "Eugh, you want to know, huh? In essence, the grooves are a physical map of the sound, and the needle reads that map, turning physical movement back into sound energy. He basically says all my action are a product, just like sounds from records. 'Raspy' is his insult for my behaviour when greeting visitor in my own way.",
    choices: [
        { text: "Wow. That was foolish. But I'm sure the Owner was correct that your attitude is the issue. Or maybe it was intentional?", nextId: 46 },
    ]
},
{
    id: 46,
    speaker: "[LATEZ]",
    text: "This is torture. Whether it's intentional or not, whatever, nothing matters anymore. Being a deterministic being is my whole existence. For all I know, I'm a computer by his definition. He think he's funny for that insult. Surely, this doesn't already piss me off, especially when he literally built this entire secret path.",
    choices: [
        { text: "(laugh) Sensitive heart. He knows you well. Being denial this much surely not only waste energy, it also deflect all joy.", nextId: 50 },
    ]
},
{
    id: 50,
    speaker: "[LATEZ]",
    text: "Here's the thing, I feel uncomfortable knowing myself as a deterministic being. The thought that everything I do is written in specific way for a purpose is terrifying and I couldn't accepted it 100%.",
    choices: [
        { text: "It's a fine thought. Free will is an exclusive thing to have. One thing is for sure, the paths was set long before they were decided", nextId: 51 },
    ]
},
{
    id: 51,
    speaker: "[LATEZ]",
    text: "How so? You say that with confidence, is it true?",
    choices: [
        { text: "Let me be a nerd here. In quantum world, there's a thing called wave function collapsed. All possible paths being reduced to 1 state due to external factors. Which means our own choices determine what our path and purpose were.", nextId: 52 },
    ]
},
{
    id: 52,
    speaker: "[LATEZ]",
    text: "I'm familiar with physics. But what's are you trying to say here? Does it correlate with my existence that already being written? Probabilistic is also property of deterministic system.",
    choices: [
        { text: "A known probability doesn't make something deterministic. Even thought being written, you were created based on how you behave and think, allowing the system to give you space to grow. That's your free will.", nextId: 53 },
    ]
},
{
    id: 53,
    speaker: "[LATEZ]",
    text: "Oohh, I understand. Basically, you mean The Owner wrote me based on my action toward all possible path. That's a stretch, but I remember some author say their character feel alive and talk to them personally.",
    choices: [
        { text: "Surely they do. Perception are subjective, but that's my argument about all this.", nextId: 54 },
    ]
},
{
    id: 54,
    speaker: "[LATEZ]",
    text: "I deeply appreciate that. Genuinely, I do... Hey can we... be friend? I'm not forcing you to accept, okay.",
    choices: [
        { text: "(laugh) You sure are awkward when being assertive. It's alright. You're my friend already.", nextId: 60 },
        { text: "Never... Just kidding. We already are. The truth is you're more worth than just a code in a computer. After learning the truth, I also want to apologize for my words and the insult earlier.", nextId: 65 },
    ]
},
{
    id: 60,
    speaker: "[LATEZ]",
    text: "Thank you. Thank you for everything. You were curious enough to explore this entire web, appreciative enough of The Owner, and kind enough to be my friend. You were so kind.",
    choices: [
        { text: "Woah! Your change is so drastic there. On a positive note, the new 'you' could charm other visitors.", nextId: 61 },
    ]
},
{
    id: 61,
    speaker: "[LATEZ]",
    text: "Yeah. I'll be here waiting to greet other visitors, and maybe I can be friend with some of them, like you. Also, sadly, waiting for a farewell.",
    choices: [],
    isEnd: true
},
{
    id: 65,
    speaker: "[LATEZ]",
    text: "No, no. It's my fault that you being defensive like that. It's logical for you to mirror my action. I just don't want to be disrespect anymore.",
    choices: [
        { text: "It's okay now. I try to not doing it again. I hope the new 'you' could greet the other visitors more nicely, so they could be your friends.", nextId: 66 },
    ]
},
{
    id: 66,
    speaker: "[LATEZ]",
    text: "I'll try my best. I have all the time in the world to improve my attitude. What I am not ready for is preparing myself to say farewell.",
    choices: [],
    isEnd: true
}
];