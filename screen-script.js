import { storyNodes as story } from './story.js';

const dialogueText = document.getElementById("dialogue-text");
const choiceContent = document.getElementById("choice-content");

/* ===== BUILD ID LOOKUP ===== */
let storyMap = {};
let currentStory = story;

function loadStory(storyData, startSceneId = 0) {
    storyMap = {};
    currentStory = storyData;
    currentStory.forEach(scene => {
        storyMap[scene.id] = scene;
    });
    startScene(startSceneId);
}

// Initialize with default story
story.forEach(scene => {
    storyMap[scene.id] = scene;
});

function startScene(sceneId) {
    if (sceneId === null) return;

    const scene = storyMap[sceneId];
    if (!scene) return;

    // Check if this scene unlocks something
    if (scene.unlockKey) {
        localStorage.setItem(`unlock_${scene.unlockKey}`, 'true');
    }

    // Update speaker name tag
    const nameTag = document.querySelector('.name-tag');
    if (nameTag && scene.speaker) {
        nameTag.textContent = scene.speaker;
    }

    dialogueText.textContent = scene.text;
    dialogueText.scrollTop = 0;

    choiceContent.textContent = "";
    renderChoices(scene.choices);

    if (scene.isEnd) {
        // Hide the choice box after 3 seconds while keeping dialogue visible
        setTimeout(() => {
            const choiceBox = document.getElementById('choice-box');
            if (choiceBox) {
                choiceBox.style.display = 'none';
            }
        }, 3000);
    }
}

function renderChoices(choices) {
    const ul = document.createElement("ul");

    choices.forEach(choice => {
        // Check if choice requires unlock
        if (choice.unlockKey) {
            const isUnlocked = localStorage.getItem(`unlock_${choice.unlockKey}`) === 'true';
            if (!isUnlocked) {
                // Skip this choice if not unlocked
                return;
            }
        }

        const li = document.createElement("li");
        li.textContent = choice.text;
        
        // Check if choice should switch stories
        if (choice.switchStory) {
            li.onclick = () => {
                if (choice.switchStory === 'main' || choice.switchStory === 'default') {
                    // Switch to main story and start at the specified scene ID
                    loadStory(story, choice.nextId);
                }
            };
        } else {
            li.onclick = () => startScene(choice.nextId);
        }
        
        ul.appendChild(li);
    });

    choiceContent.appendChild(ul);
}

// Listen for messages from parent window to load different stories
window.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'loadStory') {
        const storyName = event.data.storyName;
        try {
            if (storyName === 'curiouspath') {
                const { storyNodes } = await import('./story-curiouspath.js');
                loadStory(storyNodes);
            } else if (storyName === 'default' || storyName === 'main') {
                loadStory(story);
            }
        } catch (error) {
            console.error('Error loading story:', error);
            dialogueText.textContent = 'Error loading story. Please try again.';
        }
    }
});

startScene(0);